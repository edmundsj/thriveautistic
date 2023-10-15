import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import type { Database } from '@/supabase'
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useUser} from "@/data/users";

import {Insert, Row} from "@/data/generic";
import {Tag} from "@/data/tags";
import {Story, StoryInsert, StoryNoAuthor} from "@/data/stories";

export type StrategyInsert = Insert<'strategies'>
type StrategyTag = Row<'strategy_tags'>
export interface Strategy extends Row<'strategies'> {
  strategy_tags: {tag: number}[];
  stories: Story[];
}
type StrategyNoAuthor = Omit<StrategyInsert, 'author'>

export function createStrategy(strategy:Partial<Strategy>): Strategy {
  return {
    id: 0,
    title: '',
    author: '',
    created_at: '',
    description: '',
    strategy_tags: [],
    stories: [],
    ...strategy,
  }
}

export function strategyKey({strategyId}:{strategyId?: number}) {
  if(strategyId) {
    return ['strategy', strategyId]
  } else {
    return ['strategies']
  }
}
export function useStrategies({onSuccess}:{onSuccess?: any}) {
  async function queryFn() {
    const supabase = createClientComponentClient<Database>()
    const {data: strategies, error} = await supabase
      .from('strategies')
      .select(`*, stories(*), strategy_tags(tag)`);
    return strategies as unknown as Strategy[]
  }
  return useQuery(strategyKey({}), queryFn,{onSuccess})
}

export function useStrategyMutation({formData}:{formData: StrategyNoAuthor}) {
  const supabase = createClientComponentClient<Database>()
  const client = useQueryClient()
  const {data: author} = useUser()

  const mutationFn = async () => {
    if(!author) {
      const error = {error: 'Error: user trying to submit strategy without being not logged in'}
      console.error(error);
      return error;
    }

    const insertData = {author: author.id, ...formData}

    // @ts-ignore
    const { data, error } = await supabase
      .from('strategies')
      .upsert([
          insertData
      ])
      .select()
    await client.invalidateQueries(['strategy', formData.id]);
    await client.invalidateQueries(strategyKey({}));
    return data;
  }
  return useMutation(['strategy', formData.id], {mutationFn})
}

export function useStrategyTagsMutation({tags}:{tags: Tag[]}) {
  const supabase = createClientComponentClient<Database>()
  const client = useQueryClient()

  const mutationFn = async ({strategyId}:{strategyId: number}) => {
    const tagData = tags.map((tag) => {
      return {
        tag: tag.id,
        strategy: strategyId,
      }
    })
    // @ts-ignore
    const { data, error } = await supabase
      .from('strategy_tags')
      .upsert(
        tagData
      )
      .select()
    await client.invalidateQueries(strategyKey({strategyId}));
    await client.invalidateQueries(strategyKey({}));
    return data;
  }
  return useMutation(['strategy_tags', tags], {mutationFn: mutationFn})
}

export function strategyMutationPolicy({strategy, authorId}:{strategy: any, authorId: string}) {
  return strategy.author == authorId
}

export function sortStrategyByTagId({strategies}:{strategies: Strategy[]}):Record<number, Set<Strategy>> {
  const tagMap: Record<number, Set<Strategy>> = {};

  strategies.forEach(strategy=> {
    strategy.strategy_tags.forEach(tag => {
      if (!tagMap[tag.tag]) {
        tagMap[tag.tag] = new Set();
      }
      tagMap[tag.tag].add(strategy);
    });
  });

  return tagMap
}

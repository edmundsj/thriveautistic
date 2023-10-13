import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import type { Database } from '@/supabase'
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useUser} from "@/data/users";

import {Insert, Row} from "@/data/generic";
import {Tag} from "postcss-selector-parser";

type StrategyInsert = Insert<'strategies'>
type StrategyTag = Row<'strategy_tags'>
type Strategy = Row<'strategies'> & {strategy_tags: StrategyTag['id'][]}
type StrategyNoAuthor = Omit<StrategyInsert, 'author'>

export function createStrategy(strategy:Partial<Strategy>): Strategy {
  return {
    id: 0,
    title: '',
    author: '',
    created_at: '',
    description: '',
    strategy_tags: [],
    ...strategy,
  }
}

export const strategiesKey = ['strategies']
export function useStrategies({onSuccess}:{onSuccess?: any}) {
  async function queryFn() {
    const supabase = createClientComponentClient<Database>()
    const {data: strategies, error} = await supabase
      .from('strategies')
      .select(`*, stories(*), strategy_tags(id)`);
    return strategies
  }
  return useQuery(strategiesKey, queryFn,{onSuccess})
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
    await client.invalidateQueries(strategiesKey);
    return data;
  }
  return useMutation(['strategy', formData.id], {mutationFn: mutationFn})
}

export function strategyMutationPolicy({strategy, authorId}:{strategy: any, authorId: string}) {
  return strategy.author == authorId
}

export function sortStrategyByTagText({strategies}:{strategies: Strategy[]}):Record<number, Set<Strategy>> {
  const tagMap: Record<number, Set<Strategy>> = {};

  strategies.forEach(strategy=> {
    strategy.strategy_tags.forEach(tag => {
      if (!tagMap[tag]) {
        tagMap[tag] = new Set();
      }
      tagMap[tag].add(strategy);
    });
  });

  return tagMap
}

import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import type { Database } from '@/supabase'
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useUser} from "@/hooks/users";

export const strategiesKey = ['strategies']
export function useStrategies() {
  return useQuery(strategiesKey, async () => {
      const supabase = createClientComponentClient<Database>()
      const {data: strategies, error} = await supabase
        .from('strategies')
        .select(`*, stories(*)`);
      return strategies
    }
  )
}

export function useStrategyMutation({formData, strategyId}:{formData: any, strategyId?: number}) {
  const supabase = createClientComponentClient<Database>()
  const client = useQueryClient()
  const {data: author} = useUser()

  const mutationFn = async () => {
    if(!author) {
      const error = {error: 'Error: user trying to submit strategy without being not logged in'}
      console.error(error);
      return error;
    }

    if(strategyId) {
      formData.id = strategyId;
    }
    formData.author = author.id

    const { data, error } = await supabase
      .from('strategies')
      .upsert([
        formData
      ])
      .select()
    await client.invalidateQueries(['strategy', strategyId]);
    await client.invalidateQueries(strategiesKey);
    return data;
  }
  return useMutation(['strategy', strategyId], {mutationFn: mutationFn})
}

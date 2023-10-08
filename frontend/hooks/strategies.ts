import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import type { Database } from '@/supabase'
import {useQuery} from "react-query";

const strategiesKey = ['strategies']
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

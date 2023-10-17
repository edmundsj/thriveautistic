import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import type { Database } from '@/supabase'
import {useQuery} from "@tanstack/react-query";

const userKey = ['user']
export function useUser() {
  const queryFn = async () => {
    const supabase = createClientComponentClient<Database>()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  }
  return useQuery({queryKey: userKey, queryFn})
}
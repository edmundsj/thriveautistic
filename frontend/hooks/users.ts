import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import type { Database } from '@/supabase'
import {useQuery} from "react-query";

const userKey = ['user']
export function useUser() {
  return useQuery(userKey, async () => {
    const supabase = createClientComponentClient<Database>()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  })
}
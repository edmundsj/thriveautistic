import {Insert, Row} from "@/data/generic";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/supabase";
import {useQuery} from "react-query";

export type Tag = Row<'tags'>
type TagInsert = Insert<'tags'>
export function createTag(tag:Partial<Tag>): Tag {
  return {
    id: 0,
    created_at: '',
    title: '',
    ...tag
  }
}
export function useTags() {
  async function queryFn() {
    const supabase = createClientComponentClient<Database>()
    const {data: tags, error} = await supabase
      .from('tags')
      .select(`*`);
    return tags as unknown as Tag[]
  }
  return useQuery('tags', queryFn,{})
}

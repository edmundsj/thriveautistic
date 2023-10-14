import {useMutation, useQuery, useQueryClient} from "react-query";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/supabase";
import {useUser} from "@/data/users";

import {strategiesKey} from "@/data/strategies";
import {Insert, Row} from "@/data/generic";

export type Story = Row<'stories'>
export function storyKey({story}:{story?: number}) {
  if (story) {
    return ['story', story]
  }
  return ['stories']
}
type StoryInsert = Insert<'stories'>
type StoryNoAuthor = Omit<StoryInsert, 'author'>

export function useStory({story, onSuccess}:{story: number, onSuccess: () => void}) {

  async function queryFn() {
    const supabase = createClientComponentClient<Database>()
    const {data: stories, error} = await supabase
      .from('stories')
      .select(`*`)
      .eq('id', story)
    return stories ? (stories[0]) : null
  }
  return useQuery(storyKey({story}), queryFn, {enabled: !!story, onSuccess})
}
export function useStoryMutation({formData}:{formData: StoryNoAuthor, storyId?: number}) {
  const supabase = createClientComponentClient<Database>()
  const client = useQueryClient()
  const {data: author} = useUser()

  const mutationFn = async () => {
    if(!author) {
      const error = {error: 'Error: user trying to submit story without being not logged in'}
      console.error(error);
      return error;
    }
    const story:StoryInsert = {author: author.id, ...formData}
    // @ts-ignore
    const { data, error } = await supabase
      .from('stories')
      .upsert(
          [story]
      )
      .select()
    await client.invalidateQueries(['stories', formData.strategy]);
    await client.invalidateQueries(strategiesKey);
    return data;
  }
  return useMutation(['story', formData.id], {mutationFn: mutationFn})
}

export function storyMutationPolicy({story, authorId}:{story: any, authorId: string}) {
  return story.author == authorId
}
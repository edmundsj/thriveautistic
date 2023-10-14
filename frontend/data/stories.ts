import {useMutation, useQueryClient} from "react-query";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/supabase";
import {useUser} from "@/data/users";

import {strategiesKey} from "@/data/strategies";
import {Insert, Row} from "@/data/generic";

export type Story = Row<'stories'>
type StoryInsert = Insert<'stories'>
type StoryNoAuthor = Omit<StoryInsert, 'author'>

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
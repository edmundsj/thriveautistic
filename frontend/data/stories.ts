import {useMutation, useQueryClient} from "react-query";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/supabase";
import {useUser} from "@/data/users";

import {strategiesKey} from "@/data/strategies";

export function useStoryMutation({formData, storyId}:{formData: any, storyId?: number}) {
  const supabase = createClientComponentClient<Database>()
  const client = useQueryClient()
  const {data: author} = useUser()

  const mutationFn = async () => {
    if(storyId) {
      formData.id = storyId;
    }
    if(!author) {
      const error = {error: 'Error: user trying to submit story without being not logged in'}
      console.error(error);
      return error;
    }
    formData.author = author.id
    const { data, error } = await supabase
      .from('stories')
      .upsert([
        formData
      ])
      .select()
    await client.invalidateQueries(['stories', formData.strategyId]);
    await client.invalidateQueries(strategiesKey);
    return data;
  }
  return useMutation(['story', storyId], {mutationFn: mutationFn})
}

export function storyMutationPolicy({story, authorId}:{story: any, authorId: string}) {
  return story.author == authorId
}
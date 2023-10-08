import {useMutation} from "react-query";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/supabase";

async function submitStory({story}: {story: any}) {
  const supabase = createClientComponentClient<Database>()

  const { data, error } = await supabase
    .from('stories')
    .insert([
      story
    ])
    .select()
  return data
}
const useStoryMutation= useMutation(submitStory, {
    onSuccess: (data) => {
      // Handle success. For example, show a success message or invalidate/refetch something in the cache
      console.log("Story created:", data);
    },
    onError: (error) => {
      // Handle the error. For example, show an error message to the user
      console.error("Error creating story:", error);
    }
  });
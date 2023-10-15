import {useMutation, useQuery, useQueryClient} from "react-query";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/supabase";
import {useUser} from "@/data/users";
import {strategyKey} from "@/data/strategies";
import {Insert} from "@/data/generic";

type Vote = Insert<'votes'>
type VoteNoAuthor = Omit<Vote, 'author'>

export function useVotes({strategy}:{strategy: number}) {
  async function queryFn(): Promise<Vote[]> {
    const supabase = createClientComponentClient<Database>()
    const {data: votes, error} = await supabase
        .from('votes')
        .select(`*`)
        .eq('strategy', strategy);
    return votes as Vote[]
  }
  return useQuery(['votes', strategy], queryFn)
}

export function useUserVote({strategy}:{strategy: number}) {
  const {data: author} = useUser()
  const authorString = author?.id ?? ''

  return useQuery(['vote', strategy, author?.id], async () => {
    const supabase = createClientComponentClient<Database>()
    const {data: votes, error} = await supabase
      .from('votes')
      .select(`*`)
      .eq('strategy', strategy)
      .eq('author', authorString);
    return votes ? (votes[0] as Vote) : null
  }
  )
}

export function useVoteMutation({voteId, strategy}:{voteId?: number, strategy: number}) {
  const supabase = createClientComponentClient<Database>()
  const client = useQueryClient()
  const {data: author} = useUser()

  const mutationFn = async ({formData}:{formData: any}) => {
    if(!author) {
      const error = {error: 'Error: user trying to submit strategy without being not logged in'}
      console.error(error);
      return error;
    }

    if(voteId) {
      formData.id = voteId;
    }
    formData.author = author.id

    const { data, error } = await supabase
      .from('votes')
      .upsert([
        formData
      ])
      .select()
    await client.invalidateQueries(['votes', formData.strategy]);
    await client.invalidateQueries(['vote', formData.strategy, formData.author]);
    await client.invalidateQueries(['strategy', formData.strategy]);
    await client.invalidateQueries(strategyKey({}));
    return data;
  }
  return useMutation(['vote', strategy], {mutationFn: mutationFn})
}

export function voteMutationPolicy({vote, authorId}:{vote: any, authorId: string}) {
  return vote.author == authorId
}

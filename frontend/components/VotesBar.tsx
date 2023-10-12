import {useState} from "react";
import {useUserVote, useVoteMutation, useVotes} from "@/data/votes";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import * as React from "react";

type PossibleValues = 0 | 1 | -1
const positiveValue = 1;
const negativeValue = -1;
const neutralValue = 0;
const commonSmileyClasses = 'cursor-pointer'
const iconFontSize = 75;

export function VotesBar({strategyId}:{strategyId: number}) {

  const [formData, setFormData] = useState({
    strategy: strategyId,
    value: 0
  })

  const {data: votes} = useVotes({strategy: strategyId})
  const {data: userVote} = useUserVote({strategy: strategyId})
  const {mutate} = useVoteMutation({strategy: strategyId, voteId: userVote?.id})

  function handleVoteSubmit(value: PossibleValues) {
    const formData = {strategy: strategyId, value: value}
    mutate({formData: formData})
  }

  const positiveVoteCount = (votes as any[])?.filter((vote, index) => {
    return vote.value == positiveValue
  }).length;
  const negativeVoteCount = (votes as any[])?.filter((vote, index) => {
    return vote.value == negativeValue
  }).length;
  const neutralVoteCount = (votes as any[])?.filter((vote, index) => {
    return vote.value == neutralValue
  }).length;
  return (
    <>
      <div className={'flex justify-center gap-x-5'}>
        <SentimentVeryDissatisfiedIcon
          className={'hover:text-red-300 active:text-red-400 ' + commonSmileyClasses}
          style={{fontSize: iconFontSize}}
          onClick={() => {handleVoteSubmit(negativeValue)}}
        />
        <SentimentSatisfiedIcon
          className={'hover:text-yellow-200 active:text-yellow-300 ' + commonSmileyClasses}
          style={{fontSize: iconFontSize}}
          onClick={() => {handleVoteSubmit(neutralValue)}}
        />
        <InsertEmoticonIcon
          className={'hover:text-green-400 active:text-green-500 ' + commonSmileyClasses}
          style={{fontSize: iconFontSize}}
          onClick={() => {handleVoteSubmit(positiveValue)}}
        />
      </div>
      <div className={'flex justify-center gap-x-5'}>
        <div
          className={'hover:text-red-300 active:text-red-400 text-center'}
          style={{width: iconFontSize}} >
          {negativeVoteCount}
        </div>
       <div
         className={'hover:text-red-300 active:text-red-400 text-center'}
         style={{width: iconFontSize}} >
         {neutralVoteCount}
       </div>
       <div
         className={'hover:text-red-300 active:text-red-400 text-center'}
         style={{width: iconFontSize}} >
         {positiveVoteCount}
       </div>
     </div>
   </>
 )
}

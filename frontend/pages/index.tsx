import * as React from 'react';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import 'app/globals.css'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useState} from "react";

import {CardContent} from "@mui/material";
import {useStrategies} from "@/hooks/strategies";

const iconFontSize = 75;
import {StoryFormDialog} from "@/components/StoryFormDialog";
import {StrategyFormDialog} from "@/components/StrategyFormDialog";
import {useUserVote, useVoteMutation, useVotes} from "@/hooks/votes";
import {isMouseLikePointerType} from "@floating-ui/utils/react";

export default function StrategyPage() {
  const {data: strategies} = useStrategies()
  const [modalOpen, setModalOpen] = useState(false)
  const strategyCards = strategies?.map(strategy => {
    return <StrategyCard id={strategy.id} title={strategy.title || ''} description={strategy.description || ''} stories={strategy.stories}/>
  })
  return (
    <div className={'grid mx-auto p-5 gap-y-5 max-w-2xl'}>
      {strategyCards}
      <StrategyFormDialog open={modalOpen} setOpen={setModalOpen}/>
    </div>
  );
}

const commonSmileyClasses = 'cursor-pointer'

function StrategyCard({id, title, description, stories}:{id: number, title: string, description: string, stories: any[]}) {
  return (
    <Card sx={{minWidth: 275}}>
      <CardHeader title={title}/>
      <Votes strategyId={id}/>
      <CardContent>
        {description}
      </CardContent>
      <Stories strategyId={id} stories={stories} />
    </Card>
  );
}

type PossibleValues = 0 | 1 | -1
const positiveValue = 1;
const negativeValue = -1;
const neutralValue = 0;

function Votes({strategyId}:{strategyId: number}) {

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

function Stories({strategyId, stories}:{strategyId: number, stories: any[]}) {
  const [modalOpen, setModalOpen] = useState(false)
  const storyCards = stories?.map((story: any) => {
    const innerText = <Typography variant={'h5'} className={'mb-1'}>{story.title}</Typography>
    const title = story.link ? (
      <a href={story.link}>
        {innerText}
      </a>
    ) : innerText
    return <div>
      {title}
      <Typography>{story.text}</Typography>
    </div>
  })
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Stories</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {storyCards}
      </AccordionDetails>
      <StoryFormDialog open={modalOpen} setOpen={setModalOpen} strategyId={strategyId}/>
    </Accordion>
    )
}

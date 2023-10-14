import {useState} from "react";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import {CardContent} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

import {VotesBar} from "@/components/VotesBar";
import {StoryFormDialog} from "@/components/StoryFormDialog";
import {useUser} from "@/data/users";
import {Story} from "@/data/stories";
import {Strategy} from "@/data/strategies";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

interface StrategiesI {
  onEditStoryClick: (story: Story) => void;
  onNewStoryClick: (strategyId: number) => void;
  strategy: Strategy;
}

export function StrategyCard({strategy, onEditStoryClick, onNewStoryClick}:StrategiesI) {
  return (
    <Card sx={{minWidth: 275}}>
      <CardHeader title={strategy.title}/>
      <VotesBar strategyId={strategy.id}/>
      <CardContent>
        {strategy.description}
      </CardContent>
      <StrategyStories strategy={strategy} onEditStoryClick={onEditStoryClick} onNewStoryClick={onNewStoryClick} />
    </Card>
  );
}


function StrategyStories({strategy, onEditStoryClick, onNewStoryClick}:StrategiesI) {
  const {data: user} = useUser();

  const storyCards = strategy.stories?.map((story: Story) => {
    const innerText = <Typography variant={'h5'} className={'mb-1'}>{story.title}</Typography>
    const editButton = user?.id === story.author ?
      <div onClick={() => {onEditStoryClick(story)}} className={'cursor-pointer'}>
        <EditIcon/>
      </div>
      :
      <></>

    const title = story.link ? (
      <div>
        <a href={story.link} key={story.id}>
          {innerText}
        </a>
      </div>
  ) :
      <div>
        {innerText}
      </div>

    return <div key={story.id}>
      <div className={'flex items-center gap-x-2'}>
        {title}
        {editButton}
      </div>
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
      <Button className={'mb-2 ml-2'} variant="outlined" onClick={() => onNewStoryClick(strategy.id)} startIcon={<AddIcon/>} disabled={!user}>
        Add a story
      </Button>
    </Accordion>
    )
}

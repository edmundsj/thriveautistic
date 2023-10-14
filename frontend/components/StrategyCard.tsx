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

import {VotesBar} from "@/components/VotesBar";
import {StoryFormDialog} from "@/components/StoryFormDialog";

export function StrategyCard({id, title, description, stories}:{id: number, title: string, description: string, stories: any[]}) {
  return (
    <Card sx={{minWidth: 275}}>
      <CardHeader title={title}/>
      <VotesBar strategyId={id}/>
      <CardContent>
        {description}
      </CardContent>
      <StrategyStories strategyId={id} stories={stories} />
    </Card>
  );
}


function StrategyStories({strategyId, stories}:{strategyId: number, stories: any[]}) {
  const [modalOpen, setModalOpen] = useState(false)
  const storyCards = stories?.map((story: any) => {
    const innerText = <Typography variant={'h5'} className={'mb-1'}>{story.title}</Typography>
    const title = story.link ? (
      <a href={story.link} key={story.id}>
      {innerText}
      </a>
  ) : innerText
    return <div key={story.id}>
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

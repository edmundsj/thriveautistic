import * as React from 'react';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import '../../app/globals.css'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import TextField from '@mui/material/TextField';
import {useState} from "react";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {CardContent} from "@mui/material";
import {useStrategies} from "@/hooks/strategies";

const iconFontSize = 75;

export default function StrategyPage() {
  const {data: strategies} = useStrategies()
  const strategyCards = strategies?.map(strategy => {
    return <StrategyCard id={strategy.id} title={strategy.title || ''} description={strategy.description || ''} stories={strategy.stories}/>
  })
  return (
    <div className={'grid mx-auto p-5'}>
      {strategyCards}
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

function Votes({strategyId}:{strategyId: number}) {
 return (
   <>
     <div className={'flex justify-center gap-x-5'}>
       <SentimentVeryDissatisfiedIcon
         className={'hover:text-red-300 active:text-red-400 ' + commonSmileyClasses}
         style={{fontSize: iconFontSize}} />
       <SentimentSatisfiedIcon
         className={'hover:text-yellow-200 active:text-yellow-300 ' + commonSmileyClasses}
         style={{fontSize: iconFontSize}}/>
       <InsertEmoticonIcon
         className={'hover:text-green-400 active:text-green-500 ' + commonSmileyClasses}
         style={{fontSize: iconFontSize}}/>
     </div>
     <div className={'flex justify-center gap-x-5'}>
       <div
         className={'hover:text-red-300 active:text-red-400 text-center'}
         style={{width: iconFontSize}} >
         3
       </div>
       <div
         className={'hover:text-red-300 active:text-red-400 text-center'}
         style={{width: iconFontSize}} >
         10
       </div>
       <div
         className={'hover:text-red-300 active:text-red-400 text-center'}
         style={{width: iconFontSize}} >
         55
       </div>
     </div>
   </>
 )
}

function Stories({strategyId, stories}:{strategyId: number, stories: any[]}) {
  const [modalOpen, setModalOpen] = useState(true)
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
export function StoryFormDialog({open, setOpen, strategyId}:{open: boolean, setOpen: Function, strategyId: number}) {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    link: '',
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(formData);
    // Handle form submission logic here
    handleClose();
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} startIcon={<AddIcon/>}>
        Add a story
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add A Story</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tell us about your experience, or someone else's experience that resonated with you.
            If you have a link to a full story or article, we'd love you to put that here too.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Title"
            fullWidth
            variant="outlined"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="text"
            name="text"
            label="Story"
            fullWidth
            variant="outlined"
            multiline
            minRows={5}
            value={formData.text}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="link"
            name="link"
            label="Link (optional)"
            fullWidth
            variant="outlined"
            value={formData.link}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


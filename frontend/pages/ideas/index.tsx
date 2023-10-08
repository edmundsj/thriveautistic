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
import {ButtonProps} from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';

import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import {useState} from "react";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {CardContent} from "@mui/material";





const iconFontSize = 75;

export default function IdeaPage() {
    return (
      <div className={'grid mx-auto p-5'}>
        <IdeaCard
          title={'Wear noise-cancelling headphones'}
          description={'Wearing noise-cancelling headphones can help'}/>
      </div>
  );
}
const commonSmileyClasses = 'cursor-pointer'

function IdeaCard({title, description}:{title: string, description: string}) {
  return (
    <Card sx={{minWidth: 275}}>
      <CardHeader title={title}/>
      <Votes/>
      <CardContent>
        {description}
      </CardContent>
      <Stories/>
    </Card>
  );
}

function Votes() {
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

function Stories() {
  const [modalOpen, setModalOpen] = useState(true)
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
        <Typography>
          This is a story about something interesting.
        </Typography>
      </AccordionDetails>
      <FormDialog open={modalOpen} setOpen={setModalOpen}/>
    </Accordion>
    )
}
export function FormDialog({open, setOpen}:{open: boolean, setOpen: Function}) {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    link: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Handle form submission logic here
    handleClose();
  };

  const handleChange = (event) => {
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


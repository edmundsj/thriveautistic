import {useEffect, useState} from "react";
import {Story, useStory, useStoryMutation} from "@/data/stories";
import {useUser} from "@/data/users";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import * as React from "react";

interface StoryForm {
  open: boolean;
  strategyId: number;
  setOpen: (val: boolean) => void;
  story: Story | null;
  setStory: (story: Story | null) => void;
}
export function StoryFormDialog({open, setOpen, story, setStory, strategyId}: StoryForm) {

  const emptyData = {
    title: '',
    text: '',
    link: '',
  }
  const [formData, setFormData] = useState({...emptyData});

  const storyData = {...formData, strategy: strategyId}

  const {data: user} = useUser()
  const {mutate: upsert} = useStoryMutation({formData: storyData})

  useEffect(() => {
    if(story) {
      setFormData({
        title: story.title ?? '',
        text: story.text ?? '',
        link: story.link ?? '',
      })
    }
  }, [story]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    upsert();
    setFormData({...emptyData});
    setStory(null);
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Share your story</DialogTitle>
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


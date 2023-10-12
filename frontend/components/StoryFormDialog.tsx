import {useState} from "react";
import {useStoryMutation} from "@/data/stories";
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

export function StoryFormDialog({open, setOpen, strategyId, storyId}:{open: boolean, setOpen: Function, strategyId: number, storyId?: number}) {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    link: '',
  });

  const storyData = {...formData, strategy: strategyId}

  const {data: user} = useUser()
  const {mutate: upsert} = useStoryMutation({formData: storyData})

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(storyData);
    upsert()
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
      <Button variant="outlined" onClick={handleClickOpen} startIcon={<AddIcon/>} disabled={!user}>
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


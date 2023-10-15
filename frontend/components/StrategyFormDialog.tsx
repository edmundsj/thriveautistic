import {useEffect, useState} from "react";
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
import {Strategy, StrategyInsert, useStrategies, useStrategyMutation, useStrategyTagsMutation} from "@/data/strategies";
import {Tag, useTags} from "@/data/tags";
import {TagBar} from "@/components/TagBar";

interface StrategyForm {
  open: boolean;
  setOpen: (open: boolean) => void;
  strategy: Strategy | null;
  setStrategy: (strategy: Strategy|null) => void;
}
export function StrategyFormDialog({open, setOpen, strategy, setStrategy}:StrategyForm) {
  const emptyFormData: StrategyInsert = {
    title: '',
    description: '',
  }
  const [formData, setFormData] = useState({...emptyFormData});
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [strategyId, setStrategyId] = useState(0)
  const strategyData = {...formData}
  const {mutateAsync: upsert} = useStrategyMutation({formData: {...strategyData}})
  const {mutateAsync: upsertStrategyTags} = useStrategyTagsMutation({tags: selectedTags})
  const {data: user} = useUser()
  const {data: tags} = useTags();

  useEffect(() => {
    if(strategy) {
      setFormData({
        id: strategy.id ?? undefined,
        title: strategy.title ?? '',
        description: strategy.description ?? '',
      })
      setStrategyId(strategy.id)
    }

  }, [strategy]);

  function resetState() {
    setFormData({...emptyFormData});
    setStrategy(null);
    setSelectedTags([]);
    setStrategyId(0)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    upsert().then((data: any) => {
      if(data && !('error' in data) && data.length > 0) {
        console.log(data)
        upsertStrategyTags({strategyId: data[0].id}).then(() => {
          resetState();
          handleClose();
        })
      }
    });
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
        Share your Strategy
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add A Strategy</DialogTitle>
        <DialogContent>
          <DialogContentText>
            What have you found in your life as an autistic person that has helped you thrive?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Title (example: Self-acceptance)"
            fullWidth
            variant="outlined"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            name="description"
            label="Give a brief description of your strategy:"
            fullWidth
            variant="outlined"
            multiline
            minRows={5}
            value={formData.description}
            onChange={handleChange}
          />
          <TagBar fullList={tags ?? []} label={'Add tags or categories'} selectedItems={selectedTags} setSelectedItems={setSelectedTags}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


import React, {HTMLProps, useState} from 'react';
import {Autocomplete, Chip, TextField} from "@mui/material";
import {Item} from "@/data/generic";

interface SearchBarProps<T extends Item> extends HTMLProps<HTMLDivElement> {
  fullList: T[];
  label: string;
  selectedItems: T[];
  setSelectedItems: (items: T[]) => void;
  newTags?: T[];
  setNewTags?: (items: T[]) => void;
}

export const TagBar = <T extends Item,>({ fullList, label, selectedItems, setSelectedItems, newTags, setNewTags, ...props }: SearchBarProps<T>) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [tagsToCreate, setTagsToCreate] = useState<T[]>([])

  const filteredItems = findRemainingList(selectedItems).filter((item) =>
    item.title.toLowerCase().includes(inputValue.toLowerCase())
  ).slice(0, 5);

  function findRemainingList(newItems: T[]): T[] {
    return fullList.filter((item) => {
      return !newItems.includes(item);
    })
  }

  const handleSelect = (item: T | string) => {
    if (typeof item === 'string') {
      // Logic to create a new Item (Replace with your actual logic)
      const newItem: T = { id: Math.random().toString(), title: item } as T;
      setTagsToCreate([...tagsToCreate, newItem])
      setSelectedItems([...selectedItems, newItem]);
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleRemove = (item: Item) => {
    const newSelectedItems = selectedItems.filter((oldItem) => oldItem.id !== item.id);
    setSelectedItems(newSelectedItems);
    if (newTags && setNewTags) {
      const newTagsToCreate = tagsToCreate.filter((oldItem) => oldItem.title !== item.title);
      setNewTags(newTagsToCreate);
    }
  };

  return (
    <div {...props}>
      <div className={'grid gap-y-1'}>
        <Autocomplete
          freeSolo={!!newTags}
          options={filteredItems}
          getOptionLabel={(option) => typeof option === 'string' ? option : option.title}
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
          renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
          onChange={(_, value) => value && handleSelect(value)}
        />
        <TagList tags={selectedItems} onClick={handleRemove} />
      </div>
    </div>
  );
};

export const TagList = ({ tags, onClick }: { tags: Item[], onClick: (item: Item) => void }) => {
  return (
    <div>
      {tags.map((tag) => (
        <Chip
          key={tag.id}
          label={tag.title}
          onDelete={() => onClick(tag)}
        />
      ))}
    </div>
  )
}

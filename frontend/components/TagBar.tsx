import React, {HTMLProps, useEffect, useState} from 'react';
import {Autocomplete, Chip, TextField} from "@mui/material";
import {Item} from "@/data/generic";
import {Tag} from "@/data/tags";

interface SearchBarProps<T extends Item> extends HTMLProps<HTMLDivElement> {
  fullList: T[];
  label: string;
  selectedItems: T[];
  setSelectedItems: (items: T[]) => void;
}

export const TagBar = <T extends Item,>({ fullList, label, selectedItems, setSelectedItems, ...props}:SearchBarProps<T>) => {
  const [remainingList, setRemainingList] = useState<T[]>(fullList)
  const [inputValue, setInputValue] = useState<string>('');

  const filteredItems = findRemainingList(selectedItems).filter((item) =>
    item.title.toLowerCase().includes(inputValue.toLowerCase())
  ).slice(0, 5);

  function findRemainingList(newItems: T[]):T[] {
    return fullList.filter((item) => {
      return !newItems.includes(item);
    })
  }

  const handleSelect = (item: T) => {
    const newSelectedItems = [...selectedItems, item]
    const newRemainingList:T[] = findRemainingList(newSelectedItems)
    setRemainingList(newRemainingList);
    setSelectedItems(newSelectedItems);
  };

  const handleRemove = (item: Item) => {
    const newSelectedItems = selectedItems.filter((oldItem) => {
      return oldItem.id !== item.id
    })
    const newRemainingList = findRemainingList(newSelectedItems)
    setSelectedItems(newSelectedItems);
    setRemainingList(newRemainingList);
  };


  return (
    <div {...props}>
      <div className={'grid gap-y-1'}>
        <Autocomplete
          options={filteredItems}
          getOptionLabel={(option) => option.title}
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
          renderInput={(params) => (
            <TextField {...params} label={label} variant="outlined" />
          )}
          onChange={(_, value) => value && handleSelect(value)}
        />
        <TagList tags={selectedItems} onClick={handleRemove}/>
      </div>
    </div>
  );
};

export const TagList = ({tags, onClick}:{tags: Item[], onClick: (item: Item) => void}) => {
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

import React, {HTMLProps, useEffect, useState} from 'react';
import {Autocomplete, Chip, TextField} from "@mui/material";
import {Item} from "@/data/generic";
import {Tag} from "@/data/tags";

interface SearchBarProps extends HTMLProps<HTMLDivElement> {
  fullList: Item[];
  label: string;
  selectedItems: Item[];
  setSelectedItems: (items: Item[]) => void;
}

export const TagBar: React.FC<SearchBarProps> = ({ fullList, label, selectedItems, setSelectedItems, ...props}) => {
  const [remainingList, setRemainingList] = useState<Item[]>(fullList)
  const [inputValue, setInputValue] = useState<string>('');

  const filteredItems = findRemainingList(selectedItems).filter((item) =>
    item.title.toLowerCase().includes(inputValue.toLowerCase())
  ).slice(0, 5);

  function findRemainingList(newItems: Item[]):Item[] {
    return fullList.filter((item) => {
      return !newItems.includes(item);
    })
  }

  const handleSelect = (item: Item) => {
    const newSelectedItems = [...selectedItems, item]
    const newRemainingList = findRemainingList(newSelectedItems)
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
        <div>
          {selectedItems.map((item) => (
            <Chip
              key={item.id}
              label={item.title}
              onDelete={() => handleRemove(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

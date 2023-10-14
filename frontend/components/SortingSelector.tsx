import React, {HTMLProps, useState} from 'react';
import {MenuItem, FormControl, Select, InputLabel, SelectChangeEvent} from "@mui/material";
import {StringItem} from "@/data/generic";

interface SortingSelectorProps {
  options: StringItem[];
  label: string;
  onSortChange: (selected: string) => void;
}

const SortingSelector: React.FC<SortingSelectorProps> = ({ options, label, onSortChange}) => {
  const [selectedOption, setSelectedOption] = useState(options[0].id);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const optionId = event.target.value;
    setSelectedOption(optionId);
    onSortChange(optionId);
  };

  return (
    <div>
      <FormControl variant="outlined" className={'w-36'}>
        <InputLabel id="sorting-selector-label">{label}</InputLabel>
        <Select
          labelId="sorting-selector-label"
          value={selectedOption}
          onChange={handleChange}
          label={label}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.id}>
              {option.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>

  );
};

export default SortingSelector;
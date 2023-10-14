import React, {useEffect, useState} from 'react';
import { Button, TextField, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value)
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  return (
    <Box display="flex" justifyContent="center" gap="16px">
      <TextField
        variant="outlined"
        label="Search"
        value={searchTerm}
        onChange={handleInputChange}
        fullWidth
      />
      <Button variant="outlined" color="secondary" onClick={handleSearchClick}>
        <SearchIcon/>
      </Button>
    </Box>
  );
}
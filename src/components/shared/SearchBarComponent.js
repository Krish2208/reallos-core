import React from 'react';
import { OutlinedInput, FormControl, InputAdornment } from '@material-ui/core';
import { SearchIcon } from '@primer/octicons-react';

function SearchBar(props) {
  return (
      <FormControl fullWidth variant="outlined">
        <OutlinedInput
          startAdornment={
            <InputAdornment position="start">
            <SearchIcon />
            </InputAdornment>
          }
          placeholder="search"
        />
      </FormControl>
  );
}

export default SearchBar;

import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Icon, InlineIcon } from '@iconify/react';
import searchIcon from '@iconify/icons-octicon/search';


function SearchBar(props){
return(
    <FormControl fullWidth variant="outlined">
          <OutlinedInput
            startAdornment={<InputAdornment position="start"><Icon icon={searchIcon} /></InputAdornment>}
            placeholder="search"/>
    </FormControl>
);
}

export default SearchBar;
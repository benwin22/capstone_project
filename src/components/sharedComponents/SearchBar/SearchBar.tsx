import * as _React  from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';

export interface SearchBarProps {
  onSearch: (query: string) => void;
}

const searchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <TextField
      label="Search ANIMALS"
      variant="outlined"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
    />
  );
};

export default searchBar;

import React, { useState } from 'react';
import './App.scss';

interface LocationSearchProps {
  setLocation: (location: string) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ setLocation }) => {
  const [input, setInput] = useState<string>('');

  const handleSearch = () => {
    if (input) {
      setLocation(input);
    }
  };
  
  return (
    <div id='location-search-container'>
      <input id='location-input'
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyUp={(e) => {
        if (e.key === 'Enter') {
        handleSearch();
        }
      }}
      placeholder="Enter city"
      />
      <button id='location-button-search' onClick={handleSearch}>Search</button>
    </div>
  );
};

export default LocationSearch;

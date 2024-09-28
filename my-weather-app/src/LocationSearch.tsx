import React, { useState } from 'react';
import './App.scss';

// Interface for the component props
interface LocationSearchProps {
  setLocation: (location: string) => void;
}

// Functional component definition
const LocationSearch: React.FC<LocationSearchProps> = ({ setLocation }) => {
  // State to hold the input value
  const [input, setInput] = useState<string>('');

  // Function to handle the search action
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (input) {
      setLocation(input);
    }
  };

  return (
    <div id='location-search-container'>
      {/* Input field for the location */}
      <input
        id='location-input'
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            handleSearch(e);
          }
        }}
        placeholder="Enter city"
      />
      {/* Button to trigger the search */}
      <button id='location-button-search' onClick={(e) => handleSearch(e)}>
        Search
      </button>
    </div>
  );
};

export default LocationSearch;

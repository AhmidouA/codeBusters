import React, { useState } from 'react';
import Autosuggest, { SuggestionsFetchRequestedParams, SuggestionSelectedEventData } from 'react-autosuggest';
import '../Style/SearchBar.css';

interface Suggestion {
  displayName: string;
  lat: string;
  lon: string;
}

interface SearchBarProps {
  onAddressSelect: (coords: [number, number]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onAddressSelect }) => {
  const [value, setValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  // Fetch suggestions from Nominatim API
  const fetchSuggestions = async (input: string) => {
    if (input.length > 2) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${input}+Montpellier+France&format=json&addressdetails=1&limit=5`
      );
      const data = await response.json();
      setSuggestions(
        data.map((item: any) => ({
          displayName: item.display_name,
          lat: item.lat, 
          lon: item.lon,
        }))
      );
    } else {
      setSuggestions([]);
    }
  };

  const onSuggestionsFetchRequested = ({ value }: SuggestionsFetchRequestedParams) => {
    fetchSuggestions(value);
  };

  const onSuggestionSelected = (
    event: React.FormEvent<any>,
    { suggestion }: SuggestionSelectedEventData<Suggestion>
  ) => {
    setValue(suggestion.displayName);
    onAddressSelect([parseFloat(suggestion.lat), parseFloat(suggestion.lon)]);
  };

  const renderSuggestion = (suggestion: Suggestion) => (
    <div>{suggestion.displayName}</div>
  );

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={() => setSuggestions([])}
      getSuggestionValue={(suggestion) => suggestion.displayName}
      renderSuggestion={renderSuggestion}
      inputProps={{
        placeholder: 'Search for an address...',
        value: value,
        onChange: (_, { newValue }) => setValue(newValue),
      }}
      onSuggestionSelected={onSuggestionSelected}
    />
  );
};

export default SearchBar;

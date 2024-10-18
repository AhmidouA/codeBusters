import React, { useState, useEffect } from 'react';
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
  const [selectedCoords, setSelectedCoords] = useState<[number, number] | null>(null); // Pour stocker les coordonnées sélectionnées

  // Fetch suggestions from Nominatim API
  const fetchSuggestions = async (input: string) => {
    if (input.length > 2) {
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${input}+Montpellier+France&limit=8`
      );
      const data = await response.json();
      // console.log(data) // for display gouv api data
      setSuggestions(
        data.features.map((item: any) => ({
          displayName: item.properties.label,
          lat: item.geometry.coordinates[1], 
          lon: item.geometry.coordinates[0],
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
    setValue(suggestion.displayName); // Met à jour l'input avec le nom sélectionné
    setSelectedCoords([parseFloat(suggestion.lat), parseFloat(suggestion.lon)]); // Stocke les coordonnées sélectionnées
  };

  const renderSuggestion = (suggestion: Suggestion) => (
    <div>{suggestion.displayName}</div>
  );

  useEffect(() => {
    // Une fois que selectedCoords est mis à jour, on appelle la fonction du parent
    if (selectedCoords) {
      onAddressSelect(selectedCoords);
    }
  }, [selectedCoords]);

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={() => setSuggestions([])}
      getSuggestionValue={(suggestion) => suggestion.displayName}
      renderSuggestion={renderSuggestion}
      inputProps={{
        placeholder: 'Entrez votre destination',
        value: value,
        onChange: (_, { newValue }) => setValue(newValue),
      }}
      onSuggestionSelected={onSuggestionSelected}
    />
  );
};

export default SearchBar;

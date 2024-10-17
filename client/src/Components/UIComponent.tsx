// LIBRARIES
import React, { useState } from 'react';
import { TextField, Checkbox, FormControlLabel, Slider, Button, Box, Typography } from '@mui/material';

// STYLE
import '../Style/UIComponent.css';

const UIComponent = () => {

  const [address, setAddress] = useState<string>('');
  const [car, setCar] = useState<boolean>(false);
  const [prm, setPrm] = useState<boolean>(false);
  const [bike, setBike] = useState<boolean>(false);
  const [distance, setDistance] = useState<number>(5);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = { address, car, bike, prm, distance };
    console.log(formData);
    // You can handle the form submission logic here (e.g., send data to an API)
  };

  return (
    <Box className='search-menu UI-Element' component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>

    <TextField
      label="Address"
      fullWidth
      margin="normal"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
    />

    <FormControlLabel
      control={<Checkbox checked={car} onChange={(e) => setCar(e.target.checked)} />}
      label="Car"
    />
    <FormControlLabel
      control={<Checkbox checked={bike} onChange={(e) => setBike(e.target.checked)} />}
      label="Bike"
    />
    <FormControlLabel
      control={<Checkbox checked={prm} onChange={(e) => setPrm(e.target.checked)} />}
      label="PRM"
    />
  
    <Typography gutterBottom>Distance: {distance} m</Typography>
      <Slider
        value={distance}
        onChange={(e, newValue) => setDistance(newValue as number)}
        min={10}
        max={500}
        step={10}
        valueLabelDisplay="auto"
      />
    </Box>
  );
};

export default UIComponent;
// LIBRARIES
import React, { useState } from 'react';
import { TextField, Checkbox, FormControlLabel, Slider, Button, Box, Typography } from '@mui/material';
// COMPONENT
import SearchBar from './SearchBar';
// STYLE
import '../Style/UIComponent.css';

const UIComponent = (props:any) => {


  return (
    <div className='search-menu UI-Element' >

    <SearchBar onAddressSelect={props.handleAddressSelect}/>

    <FormControlLabel
      control={<Checkbox checked={props.car} onChange={(e) => props.setCar(e.target.checked)} />}
      label="Car"
    />
    <FormControlLabel
      control={<Checkbox checked={props.bike} onChange={(e) => props.setBike(e.target.checked)} />}
      label="Bike"
    />
    <FormControlLabel
      control={<Checkbox checked={props.prm} onChange={(e) => props.setPrm(e.target.checked)} />}
      label="PRM"
    />
  
    <Typography gutterBottom>Distance: {props.distance} m</Typography>
      <Slider
        value={props.distance}
        onChange={(e, newValue) => props.setDistance(newValue as number)}
        min={10}
        max={500}
        step={10}
        valueLabelDisplay="auto"
      />
    </div>
  );
};

export default UIComponent;
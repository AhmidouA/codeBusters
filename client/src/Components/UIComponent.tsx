// LIBRARIES
import { Checkbox, Slider } from '@mui/material';
import AccessibleIcon from '@mui/icons-material/Accessible';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
// COMPONENT
import SearchBar from './SearchBar';
// STYLE
import '../Style/UIComponent.css';

const UIComponent = (props:any) => {

  return (
    <div className='search-menu UI-Element' >

    <SearchBar onAddressSelect={props.handleAddressSelect}/>

    <div className='filters-row'>
      <div className='checkbox-and-icon'>
        <Checkbox checked={props.bike} onChange={(e) => props.setBike(e.target.checked)} />
        <PedalBikeIcon className='icon' />
      </div>

      <div className='checkbox-and-icon'>
        <Checkbox checked={props.car} onChange={(e) => props.setBike(e.target.checked)} disabled />
        <LocalParkingIcon className='icon' color='disabled' />
      </div>

      <div className='checkbox-and-icon'>
        <Checkbox checked={props.prm} onChange={(e) => props.setPrm(e.target.checked)} disabled />
        <AccessibleIcon className='icon' color='disabled' />
      </div>
    </div>

    <div className='distance-slider'>
      <span className='distance-display'>{props.distance} m</span>
      <Slider
        value={props.distance}
        onChange={(e, newValue) => props.setDistance(newValue as number)}
        min={10}
        max={500}
        step={10}
        valueLabelDisplay="auto"
      />
    </div>
    </div>
  );
};

export default UIComponent;
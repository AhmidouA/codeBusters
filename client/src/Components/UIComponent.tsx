// LIBRARIES
import { Checkbox, Slider, IconButton} from '@mui/material';
import AccessibleIcon from '@mui/icons-material/Accessible';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import MyLocationIcon from '@mui/icons-material/MyLocation';
// COMPONENT
import SearchBar from './SearchBar';
// STYLE
import '../Style/UIComponent.css';

const UIComponent = (props:any) => {

  return (
    <div className='search-menu UI-Element' >

    <div className='searchbar-and-location-button'>
    <SearchBar onAddressSelect={props.handleAddressSelect}/>
      <IconButton 
        sx={{border:'solid 1px gray', color:'black', borderRadius:'5px'}}
        onClick={()=>{props.handleAddressSelect(props.userLocation)}}
      >
        <MyLocationIcon/>
      </IconButton>
    </div>
    

    <div className='filters-row'>
      <div className='checkbox-and-icon'>
        <Checkbox checked={props.bike} onChange={(e) => props.setBike(e.target.checked)} />
        <PedalBikeIcon className='icon' />
      </div>

      <div className='checkbox-and-icon'>
        <Checkbox checked={props.car} onChange={(e) => props.setCar(e.target.checked)} />
        <LocalParkingIcon className='icon' />
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
        max={2000}
        step={10}
        valueLabelDisplay="auto"
      />
    </div>
    </div>
  );
};

export default UIComponent;
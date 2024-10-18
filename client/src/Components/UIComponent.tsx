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

interface UIComponentProps {
  car: boolean;
  setCar: (value: boolean) => void;
  prm: boolean;
  setPrm: (value: boolean) => void;
  bike: boolean;
  setBike: (value: boolean) => void;
  distance: number;
  setDistance: (value: number) => void;
  handleAddressSelect: (coords: [number, number]) => void;
  userLocation: [number, number] | undefined;
}


const UIComponent: React.FC<UIComponentProps> = ({
  car,
  setCar,
  prm,
  setPrm,
  bike,
  setBike,
  distance,
  setDistance,
  handleAddressSelect,
  userLocation,
}) => {

  return (
    <div className='search-menu UI-Element' >

    <div className='searchbar-and-location-button'>
    <SearchBar onAddressSelect={handleAddressSelect}/>
      <IconButton 
        sx={{border:'solid 1px gray', color:'black', borderRadius:'5px'}}
        onClick={() => {
          if (userLocation) {
            handleAddressSelect(userLocation);
          }
        }}
      >
        <MyLocationIcon/>
      </IconButton>
    </div>
    

    <div className='filters-row'>
      <div className='checkbox-and-icon'>
        <Checkbox checked={bike} onChange={(e) => setBike(e.target.checked)} />
        <PedalBikeIcon className='icon' />
      </div>

      <div className='checkbox-and-icon'>
        <Checkbox checked={car} onChange={(e) => setCar(e.target.checked)} />
        <LocalParkingIcon className='icon' />
      </div>

      <div className='checkbox-and-icon' title='prochainement'>
        <Checkbox checked={prm} onChange={(e) => setPrm(e.target.checked)} disabled />
        <AccessibleIcon className='icon' color='disabled' />
      </div>
    </div>

    <div className='distance-slider'>
      <span className='distance-display'>{distance} m</span>
      <Slider
        value={distance}
        onChange={(e, newValue) => setDistance(newValue as number)}
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
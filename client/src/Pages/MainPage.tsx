// LIBRARIES
import react, {useEffect, useState} from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
// COMPONENTS
import RecenterMap from '../Components/RecenterMap';
import SearchBar from '../Components/SearchBar';
import icon from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
// STYLE
import '../Style/Main_Page.css';
import 'leaflet/dist/leaflet.css';


const MainPage = () => {
  
  const [mapCenter, setMapCenter] = useState<[number, number]>([43.62505, 3.862038]);
  const [userLocation, setUserLocation]= useState<[number, number]>();
  const [destinationLocation, setDestinationLocation] = useState<[number,number]>();
  const [parkingsList, setParkingList]= useState<[{}]>([{}]);
  const [radius, setRadius]= useState(500);

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  const success = (position:  GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setUserLocation([latitude, longitude]);
  }
  
  const error = () => {
    console.log("Unable to retrieve your location");
  }

  useEffect(() => {
    if (navigator.geolocation) {
      const updateLocation = () => {
        navigator.geolocation.getCurrentPosition(success, error);
      };

      // update location when mount
      updateLocation();
      if(userLocation){
        setMapCenter(userLocation);
      }
      
      // update userLocation every seconds
      const intervalId = setInterval(updateLocation, 5000);

      return () => clearInterval(intervalId);
    } else {
      console.log("Geolocation not supported");
    }
  }, []);

  const handleAddressSelect = (coords: [number, number]) => {
    setDestinationLocation(coords);
    if(destinationLocation){
      setMapCenter(destinationLocation);
      fetch(`http:localhost:3006/api/station?latitude=${coords[0]}&longitude=${coords[1]}&radius=${radius}`)
         .then(res => res.json)
         .then(res => console.log(res)) 
    }
    
  };
  
  return (
    <>
    <MapContainer 
      center={mapCenter} 
      style={{ 
        position: "fixed", 
        top: 0, 
        left: 0, 
        height: '100vh', 
        width: '100vw', 
        zIndex: 1 
      }}
      zoom={15} 
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={mapCenter}>
        <Popup>
          C'est vous.
        </Popup>
      </Marker>

      <RecenterMap location={mapCenter} />

    </MapContainer>

    <section>
      <div className='UI-Element'>
      <SearchBar onAddressSelect={handleAddressSelect} />
      </div>
    </section>

    </>
    
  );
};

export default MainPage;
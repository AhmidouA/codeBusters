// LIBRARIES
import react, {useState} from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
// STYLE
import '../Style/Main_Page.css';

const Main_Page = () => {
  const [location, setLocation] = useState<[number, number]>([43.62505, 3.862038]);
  if (navigator.geolocation) {
    setInterval(() => {navigator.geolocation.getCurrentPosition(success, error);}, 5000);
    
  } else {
    console.log("Geolocation not supported");
  }
  
  function success(position:  GeolocationPosition) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log('latitude :', latitude, 'longitude :', longitude)
    setLocation(coord => [latitude, longitude]);
    console.log("location", location)
  }
  
  function error() {
    console.log("Unable to retrieve your location");
  }

  return (
    <>
    <MapContainer 
      center={location} 
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
      <Marker position={location}>
        <Popup>
          C'est vous.
        </Popup>
      </Marker>
    </MapContainer>

    <div className="Main-UI-Container">
      <p>Content Here</p>
    </div>

    </>
    
  );
};

export default Main_Page;
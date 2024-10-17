// LIBRARIES
import react, {useEffect, useState} from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import Recenter_Map from '../Components/Recenter_Map';
// STYLE
import '../Style/Main_Page.css';





const Main_Page = () => {
  const [location, setLocation] = useState<[number, number]>([10, 2]);
  
  function success(position:  GeolocationPosition) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log('latitude :', latitude, 'longitude :', longitude)
    setLocation([latitude, longitude]);
  }
  
  function error() {
    console.log("Unable to retrieve your location");
  }

  useEffect(() => {
    if (navigator.geolocation) {
      const updateLocation = () => {
        navigator.geolocation.getCurrentPosition(success, error);
      };

      // Appelle la mise à jour immédiatement puis toutes les 5 secondes
      updateLocation();
      const intervalId = setInterval(updateLocation, 5000);

      // Nettoyage de l'intervalle quand le composant est démonté
      return () => clearInterval(intervalId);
    } else {
      console.log("Geolocation not supported");
    }
  }, []);

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
      <Recenter_Map location={location} />
    </MapContainer>

    <div className="Main-UI-Container">
      <p>Content Here</p>
    </div>

    </>
    
  );
};

export default Main_Page;
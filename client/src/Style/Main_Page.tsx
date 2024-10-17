// LIBRARIES
import react, {useState} from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
// STYLE


const Main_Page = () => {
  const [MAP_CENTER, setMAP_CENTER] = useState<[number, number]>([43.62505, 3.862038]);

  return (
    <MapContainer 
      center={MAP_CENTER} 
      style={{ height: '100vh', width: '100vw' }} 
      zoom={15} 
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default Main_Page;
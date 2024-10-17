// LIBRARIES
import react, {useState} from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
// STYLE
import '../Style/Main_Page.css';


const Main_Page = () => {
  const [MAP_CENTER, setMAP_CENTER] = useState<[number, number]>([43.62505, 3.862038]);

  return (
    <>
    <MapContainer 
      center={MAP_CENTER} 
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
    </MapContainer>

    <div className="Main-UI-Container">
      <p>Content Here</p>
    </div>

    </>
    
  );
};

export default Main_Page;
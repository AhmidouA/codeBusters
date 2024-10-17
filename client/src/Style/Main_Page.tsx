// LIBRARIES
import react from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
// STYLE


const Main_Page = () => {

  return(
    <MapContainer 
        center={[43.62505, 3.862038]} 
        style={{height: '100vh', width:'100vw'}} 
        zoom={15} 
        scrollWheelZoom={true}
      >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>

  )

}

export default Main_Page;
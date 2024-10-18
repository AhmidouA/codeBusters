// LIBRARIES
import {useEffect, useState} from 'react';
import { MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import icon from "leaflet/dist/images/marker-icon.png";
import L, { Icon } from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
// COMPONENTS
import UIComponent from '../Components/UIComponent';
import RecenterMap from '../Components/RecenterMap';
import Snackbar, {SnackbarOrigin} from '@mui/material/Snackbar';
// STYLE
import '../Style/Main_Page.css';
import 'leaflet/dist/leaflet.css';


interface IParking {
  address?: string;
  city: string;
  created_at: string;
  id : number;
  id_api: string;
  indoor? : boolean;
  latitude: number;
  longitude: number;
  name?: string;
  station_type: string;
  total_spot: number;
  updatat_at: string;
}

interface StateToaster extends SnackbarOrigin {
  open: boolean;
}

const MainPage = () => {
  
  const [mapCenter, setMapCenter] = useState<[number, number]>([43.62505, 3.862038]);
  const [userLocation, setUserLocation]= useState<[number, number]>();
  const [destinationLocation, setDestinationLocation] = useState<[number,number]>();
  const [stateToaster, setStateToaster] = useState<StateToaster>({
    open: false,
    vertical: 'top',
    horizontal: 'center',

  });
  const { vertical, horizontal, open } = stateToaster;
  const [toastMessage, setToastMessage] = useState<string>("Une erreur est survenue");
  const [freeSlots, setFreeSlots] = useState<number>(0)
  const [typeStation, setTypeStation]= useState<boolean[]>([true, false]); //['CAR','BIKE']
  

  /***** Variables pour les filtres *******/
  const [car, setCar] = useState<boolean>(true);
  const [pmr, setPmr] = useState<boolean>(false);
  const [bike, setBike] = useState<boolean>(false);
  const [distance, setDistance] = useState<number>(500);


  const [parkingsList, setParkingList]= useState<IParking[]>([]);
  
  /*************** Configuration LeaFlet  ****************/ 
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  const bikeIcon = new Icon ({
    iconUrl : '/bike.svg',
    iconSize : [40,40],
    iconAnchor : [20,20], // point de l'icône qui correspondra à l'emplacement du marqueur
    popupAnchor : [0, -20] // point à partir duquel la fenêtre popup doit s'ouvrir par rapport à l'iconAnchor

  })

  const finishIcon = new Icon ({
    iconUrl : '/goal.svg',
    iconSize : [40,40],
    iconAnchor : [20,20],
    popupAnchor : [0, -20]

  })

  const userIcon = new Icon ({
    iconUrl : '/user.svg',
    iconSize : [40,40],
    iconAnchor : [20,20],
    popupAnchor : [0, -20]

  })

  const parkingIcon = new Icon ({
    iconUrl : '/parking.svg',
    iconSize : [40,40],
    iconAnchor : [20,20],
    popupAnchor : [0, -20]

  })
    /*****************************/

  const handleClickToast = (newState: SnackbarOrigin) => () => {
    setStateToaster({ ...newState, open: true });
  };

  const handleCloseToast = () => {
    setStateToaster({ ...stateToaster, open: false });
  };
  

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

  useEffect(()=>{
    setTypeStation([car, bike])
  }, [car, bike])

  const handleAddressSelect = (coords: [number, number]) => {
    setDestinationLocation(coords === userLocation ? destinationLocation : coords)
    if(coords != undefined){
      setMapCenter(coords);
      
      fetch(`http://localhost:3001/api/station?latitude=${coords[0]}&longitude=${coords[1]}&radius=${distance}`)
         .then(res => res.json())
         .then(res => {
          setParkingList(res.stations);
        })
        .catch((error) => {
          console.error('Erreur lors de la requête:', error);
          setToastMessage(error.message);
          handleClickToast({ vertical: 'top', horizontal: 'center' })

        });
    }
    
  };

  useEffect(()=>{
    handleAddressSelect(mapCenter);
  }, [distance])

  const handleClickMarker = (id: string) => {
    fetch(`http://localhost:3001/api/station/${id}`)
    .then(res => res.json())
    .then(res => setFreeSlots(res.availableSlots))
  }
  
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
      { userLocation &&
        <Marker position={userLocation} icon={userIcon}>
          <Popup>C'est vous</Popup>
        </Marker>
      }
      { destinationLocation &&
        <Marker position={destinationLocation} icon={finishIcon}>
          <Popup>
            Votre arrivée
          </Popup>
        </Marker>
      }
      
      {
        parkingsList.length > 0 && parkingsList.map((item, index)=>{
          if(typeStation[0] && typeStation[1]){ // si les deux cases (bike et car ) son cocher, tout afficher
            return <Marker 
                position={[item.latitude, item.longitude]}
                key={index}
                eventHandlers={{ click: ()=>{handleClickMarker(item.id_api)}}}
                icon={item.station_type === 'CAR' ? parkingIcon : bikeIcon}>
                <Popup>{item.station_type === 'CAR' ? item.name : item.address}<br />
                {`${freeSlots}/${item.total_spot} places libres`}</Popup>
              </Marker>
          }else{         
            let station  = "";
            if(typeStation[0]) {station = 'CAR'}
            if(typeStation[1]) {station = 'BIKE'}
            if(station === item.station_type){ // sinon afficher que quand le type correspond
              return <Marker 
                position={[item.latitude, item.longitude]}
                key={index}
                eventHandlers={{ click: ()=>{handleClickMarker(item.id_api)}}}
                icon={station === 'CAR' ? parkingIcon : bikeIcon}>
                <Popup>{station === 'CAR' ? item.name : item.address}<br />
                {`${freeSlots}/${item.total_spot} places libres`}</Popup>
              </Marker>
            }
           
          }      
        })
      }
      <RecenterMap location={mapCenter} />

    </MapContainer>

    <UIComponent 
      car={car}
      setCar={setCar}
      prm={pmr}
      setPrm={setPmr}
      bike={bike}
      setBike={setBike}
      distance={distance}
      setDistance={setDistance} 
      handleAddressSelect={handleAddressSelect}
      userLocation={userLocation}
    />
    <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleCloseToast}
        message={toastMessage}
        key={vertical + horizontal}
        autoHideDuration={5000}
      />
  </>);
};

export default MainPage;
// LIBRARIES
import {useEffect, useState} from 'react';
import { MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
// COMPONENTS
import UIComponent from '../Components/UIComponent';
import RecenterMap from '../Components/RecenterMap';
import Snackbar, {SnackbarOrigin} from '@mui/material/Snackbar';

// STYLE
import '../Style/Main_Page.css';
import 'leaflet/dist/leaflet.css';
import { userIcon, finishIcon, parkingIcon, bikeIcon } from '../leaflet/customConfig';


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
 
  const [freeSlots, setFreeSlots] = useState<number>(0)
  const [typeStation, setTypeStation]= useState<boolean[]>([true, false]); //['CAR','BIKE']
  const [parkingsList, setParkingList]= useState<IParking[]>([]);

  /***** Variables pour les filtres *******/
  const [car, setCar] = useState<boolean>(true);
  const [pmr, setPmr] = useState<boolean>(false);
  const [bike, setBike] = useState<boolean>(false);
  const [distance, setDistance] = useState<number>(500);


  
  
  /******* Gestion du toaster ***********/
  const [stateToaster, setStateToaster] = useState<StateToaster>({
    open: false,
    vertical: 'top',
    horizontal: 'center',

  });
  const { vertical, horizontal, open } = stateToaster;
  const [toastMessage, setToastMessage] = useState<string>("Une erreur est survenue");


  const handleClickToast = (newState: SnackbarOrigin) => () => {
    setStateToaster({ ...newState, open: true });
  };

  const handleCloseToast = () => {
    setStateToaster({ ...stateToaster, open: false });
  };
  
  /************ principal ************/
  const successGeoLocation = (position:  GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setUserLocation([latitude, longitude]);
  }
  
  const errorGeoLocation = () => {
    console.log("Unable to retrieve your location");
  }

  // gestion de la localisation au lancement de la page
  useEffect(() => {
    if (navigator.geolocation) {
      const updateLocation = () => {
        navigator.geolocation.getCurrentPosition(successGeoLocation, errorGeoLocation);
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

  // mise a jour du type de station en fonction des useStates car et bike
  useEffect(()=>{
    setTypeStation([car, bike])
  }, [car, bike])

  /**
   * Fonction qui permet de récupérer la liste des parkings (velo ou voiture) dans le rayon des coordonnées fournies en paramètres
   * Elle met a jour la destination et le centrage de la carte.
   * @param coords latitude et longitude de l'adresse sélectionnée
   */
  const handleAddressSelect = (coords: [number, number]) => {
    if (coords != mapCenter) {
      setDestinationLocation(coords === userLocation ? destinationLocation : coords)
    }
    
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

  // re-rendre le composant quand la distance (radius) change
  useEffect(()=>{
    handleAddressSelect(mapCenter);
  }, [distance])

  /**
   * fonction qui se déclenche quand on clique sur un marqueur
   * Elle effectue une requete vers l'api back pour récupérer les places libres en temps réel
   * @param id 
   */
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
        parkingsList?.length > 0 && parkingsList.map((item, index) => {
          const isCarStation = item.station_type === 'CAR';
          const icon = isCarStation ? parkingIcon : bikeIcon;
          const displayText = isCarStation ? item.name : item.address;
          // Si les deux cases (bike et car) sont cochées, tout afficher
          if (typeStation[0] && typeStation[1]) {
            return (
              <Marker
                position={[item.latitude, item.longitude]}
                key={index}
                eventHandlers={{ click: () => handleClickMarker(item.id_api) }}
                icon={icon}
              >
                <Popup>
                  <b>{displayText}</b><br />
                  {`${freeSlots || "?"}/${item.total_spot} places libres`}
                </Popup>
              </Marker>
            );
          }

          // Sinon, afficher uniquement quand le type correspond
          const stationTypeToShow = typeStation[0] ? 'CAR' : (typeStation[1] ? 'BIKE' : '');
          if (stationTypeToShow === item.station_type) {
            return (
              <Marker
                position={[item.latitude, item.longitude]}
                key={index}
                eventHandlers={{ click: () => handleClickMarker(item.id_api) }}
                icon={icon}
              >
                <Popup>
                  <b>{displayText}</b><br />
                  {`${freeSlots || "?"}/${item.total_spot} places libres`}
                </Popup>
              </Marker>
            );
          }
          return null; // Ne rien rendre si aucune condition n'est remplie
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
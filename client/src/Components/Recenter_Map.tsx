import { useEffect } from "react";
import { useMap } from "react-leaflet";

/**
 * Composant sans rendu qui permet de mettre à jour le centre de la map (ne marche pas sans)
 * @param param0 localisation
 * @returns 
 */
const Recenter_Map = ({ location }: { location: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(location, map.getZoom());
    }, [location, map]);
    return null;
  };


  export default Recenter_Map
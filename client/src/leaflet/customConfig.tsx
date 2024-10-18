
import L, {Icon } from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import icon from "leaflet/dist/images/marker-icon.png";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

L.Marker.prototype.options.icon = DefaultIcon;

// confiuration des icones
export const bikeIcon = new Icon ({
    iconUrl : '/bike.svg',
    iconSize : [40,40],
    iconAnchor : [20,20], // point de l'icône qui correspondra à l'emplacement du marqueur
    popupAnchor : [0, -20] // point à partir duquel la fenêtre popup doit s'ouvrir par rapport à l'iconAnchor
  })

export const finishIcon = new Icon ({
iconUrl : '/goal.svg',
iconSize : [40,40],
iconAnchor : [20,20],
popupAnchor : [0, -20]

})

export const userIcon = new Icon ({
iconUrl : '/user.svg',
iconSize : [40,40],
iconAnchor : [20,20],
popupAnchor : [0, -20]

})

export const parkingIcon = new Icon ({
iconUrl : '/parking.svg',
iconSize : [40,40],
iconAnchor : [20,20],
popupAnchor : [0, -20]

})


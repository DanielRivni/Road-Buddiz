import React, { useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import ChangeMapView from './ChangeMapView.jsx';
import liveLocationIcon from '../assets/live-location-icon.webp'
import L from 'leaflet';

const customIcon = L.icon({
    iconUrl: liveLocationIcon,
    iconSize: [40,40]
});

const formatLocation = (location) => {
    const ret =  location.split(',').map(val => parseFloat(val));
    return ret
}

const MapComponent = ({ location }) => {
    const [position, setPosition] = useState([]);
  
    useEffect(() => {
      if (!location) return;
      const newPosition = formatLocation(location);
      setPosition(newPosition);
    }, [location]);
  
    if (position.length) {
      return (
        <MapContainer center={position} zoom={17} scrollWheelZoom={true} style={{ height: '80vh', width: '60vw' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ChangeMapView position={position} /> {/* Include the custom component here */}
          <Marker position={position} icon={customIcon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      );
    } else {
      return (<div>אנא המתן...</div>);
    }
  };
  
export default MapComponent
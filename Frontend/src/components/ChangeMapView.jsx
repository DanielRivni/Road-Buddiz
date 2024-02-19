import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const ChangeMapView = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position.length > 0) {
      map.flyTo(position, 17);
    }
  }, [position, map]);

  return null;
};

export default ChangeMapView;
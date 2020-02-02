import React, { useState, useEffect } from 'react'
import ReactMapGL from 'react-map-gl';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_KEY;

const Map = () => {
    const [viewport, setViewport] = useState({
        latitude: 30.25844534968869,
        longitude: -97.80411406405295,
        zoom: 11,
        bearing: 0,
        pitch: 0
      });


    
    return (
        <ReactMapGL 
            {...viewport}
            width="67%"
            height="50vh"
            mapStyle='mapbox://styles/mapbox/outdoors-v9'
            onViewportChange={setViewport}
            mapboxApiAccessToken={MAPBOX_TOKEN}
        />
    )
}

export default Map;

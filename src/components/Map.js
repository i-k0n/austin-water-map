import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker, FlyToInterpolator, Popup } from 'react-map-gl';
import * as siteList from '../data/barton-creek-hotspots.json'

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_KEY;
const sitesArray = siteList.default.locations;

const Map = () => {
    const [viewport, updateViewport] = useState({
        latitude: 30.25844534968869,
        longitude: -97.80411406405295,
        zoom: 11,
        bearing: 0,
        pitch: 0
      });

    const svg = "../swimming.svg"

    

    return (
        <ReactMapGL 
            {...viewport}
            width="67%"
            height="50vh"
            mapStyle='mapbox://styles/mapbox/outdoors-v9'
            onViewportChange={updateViewport}
            mapboxApiAccessToken={MAPBOX_TOKEN}
        >
            {// loop through locations to produce location list
            sitesArray.map((site, i) => {
                const { siteNum } = site.properties;
                const coords = site.geometry.coordinates;
                // console.log("coords: ", coords[0], coords[1])
                // console.log("name: ", name);
                // console.log("description: ", description);
                return (
                    <Marker key={siteNum} latitude={coords[1]} longitude={coords[0]} offsetLeft={-9} offsetTop={-9}>
                        <button className="marker-btn">
                            <img src={svg} alt="icon" />
                        </button>
                    </Marker>
                )
            })}
            
            
        </ReactMapGL>

        
    )
}

export default Map;

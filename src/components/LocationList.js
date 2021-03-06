import React, { useState, useEffect } from 'react';
import axios from 'axios'
import moment from 'moment'
import { FlyToInterpolator } from 'react-map-gl'
import * as siteList from '../data/barton-creek-hotspots.json'

const LocationList = () => {

    const [site, setSite] = useState('08155400');
    const [viewport, updateViewport] = useState({
        latitude: 30.25844534968869,
        longitude: -97.80411406405295,
        zoom: 11,
        bearing: 0,
        pitch: 0
    })
    // const [time, setTime] = useState('');
    const sitesArray = siteList.default.locations;
    // console.log(sitesArray)
    

    
    


    function xml2json(srcDOM) {
        let children = [...srcDOM.children];
    
        // base case for recursion. 
        if (!children.length) {
            return srcDOM.innerHTML
        }
    
        // initializing object to be returned. 
        let jsonResult = {};
    
        for (let child of children) {
    
            // checking if child has siblings of same name. 
            let childIsArray = children.filter(eachChild => eachChild.nodeName === child.nodeName).length > 1;
    
            // if child is array, save the values as array, else as strings. 
            if (childIsArray) {
            if (jsonResult[child.nodeName] === undefined) {
                jsonResult[child.nodeName] = [xml2json(child)];
            } else {
                jsonResult[child.nodeName].push(xml2json(child));
            }
            } else {
            jsonResult[child.nodeName] = xml2json(child);
            }
        }
    
        return jsonResult;
    }

    // on component mount, send get request for api data
    useEffect(() => {
        // axios.get('https://waterservices.usgs.gov/nwis/iv/?sites=' + site + '&parameterCd=00060,00065,00095,00010,00300,00400')
        //     .then(res => {
        //         const parser = new DOMParser();
        //         const srcDOM = parser.parseFromString(res.data, "application/xml");
        //         // Converting DOM Tree To JSON. 
        //         const loc = xml2json(srcDOM)
        //         // console.log("loc: ", loc);
        //         const data = loc["ns1:timeSeriesResponse"]["ns1:timeSeries"];
        //         const name = data["0"]["ns1:sourceInfo"]["ns1:siteName"];
        //         // console.log("Name: ", name);
        //         // latitude
        //         const latitude = data["0"]["ns1:sourceInfo"]["ns1:geoLocation"]["ns1:geogLocation"]["ns1:latitude"];
        //         // longitude
        //         const longitude = data["0"]["ns1:sourceInfo"]["ns1:geoLocation"]["ns1:geogLocation"]["ns1:longitude"];
        //         // console.log("Lat:", latitude)
        //         // console.log("Long:", longitude)
        //         if (site === "08155300") {
        //             const flow = data["0"]["ns1:values"]["0"]["ns1:value"];
        //             // console.log("Flow", flow, "ft³/s");
        //             const depth = data["1"]["ns1:values"]["0"]["ns1:value"];
        //             // console.log("Depth", depth, "ft");
        //         } else {
        //             const flow = data["0"]["ns1:values"]["ns1:value"];
        //             // console.log("Flow", flow, "ft³/s");
        //             const depth = data["1"]["ns1:values"]["ns1:value"];
        //             // console.log("Depth", depth, "ft");
        //         }
                
                
        //         const date = loc["ns1:timeSeriesResponse"]["ns1:queryInfo"]["ns2:note"][3];
        //         // console.log("Last checked", moment(date).calendar());

        //         // console.log("data: ", data)

                
        //         // const setTime = loc["ns1:timeSeriesResponse"]["ns1:queryInfo"]["ns2:note"][3]
        //         });
    })

    const handleLocationClick = (id) => {
        const coords = sitesArray[id].geometry.coordinates;
        console.log("handleLocationClick for: ", id)
        // -97.8447296, 30.2740957
        pan(coords);
    }

    const pan = (coords) => {
        console.log("pan to: ", coords[1], coords[0])
        updateViewport(viewport => ({
            ...viewport,
            latitude: coords[1],
            longitude: coords[0],
            zoom: 14,
            transitionInterpolator: new FlyToInterpolator(),
            transitionDuration: "auto"
        }))
    };

    return ( 
        <ul className="location-list">
            {// loop through locations to produce location list
            sitesArray.map((site, i) => {
                site.properties.id = i;
                console.log("site: ", site)
                const { name, description, siteNum, id } = site.properties;
                // console.log("name: ", name);
                // console.log("description: ", description);
                return (
                    <li key={siteNum} className="location-item">
                        <a className="location-name" href="#" onClick={() => handleLocationClick(id)} data-id={id}>{name}</a>
                        <div className="location-type">{description}</div>
                    </li>
                )
                
            })}
        </ul>
    )
}

export default LocationList;

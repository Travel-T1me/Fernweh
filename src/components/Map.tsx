import * as React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import "./renderMap.css"

// const MapCont = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     border-radius: 20px;
//     border: 1px solid black;
//     width: 100%;
//     min-height: 300px;
//     min-width: 300px;
//     transition: transform 0.3s ease-in-out;
// `;

// const StyledGoogleMap = styled(GoogleMap)`
//   width: 100%;
//   height: 100%;
// `;

export default function Map(): React.ReactElement {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAYLtERuyYBKMNDnbw9By4PIfyebbT-Qvw',
    });

    const [center, setCenter] = useState({lat: 18.52043, lng: 73.856743});

    useEffect(() => {
        // Calculate the pixel height based on the viewport height
        const viewportHeight = window.innerHeight;
        document.getElementById("map-container").style.height = `${viewportHeight - 140}px`;
        console.log(`viewport: ${viewportHeight}`);
    }, []);


    return (
        <div id="map-container" className="map-container">
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <GoogleMap
                    mapContainerClassName='map-container'
                    center = {center}
                    zoom={10}
                />
            )}
        </div>
    )
}
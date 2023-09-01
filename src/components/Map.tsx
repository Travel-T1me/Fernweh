import * as React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useState } from 'react';
import "./renderMap.css"



export default function Map(): React.ReactElement {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAYLtERuyYBKMNDnbw9By4PIfyebbT-Qvw',
    });
    const [center, setCenter] = useState({lat: 18.52043, lng: 73.856743});

    return (
        <div className='Map'>
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
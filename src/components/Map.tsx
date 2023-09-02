import * as React from 'react';
// import GoogleMap from 'google-maps-react-markers'
import { GoogleMap, Marker, MarkerF, useLoadScript } from '@react-google-maps/api';
import { useState } from 'react';
import "./renderMap.css"
import  useStore from '../store';


interface LatLng {
    lat: number,
    lng: number,
}

interface props {
    center: LatLng,
    markers: any[]
}

export default function Map({center, markers}: props): React.ReactElement {
    // const { isLoaded } = useLoadScript({
    //     googleMapsApiKey: 'AIzaSyAYLtERuyYBKMNDnbw9By4PIfyebbT-Qvw',
    // });
    return (
        <div className='Map'> (
                <GoogleMap
                    mapContainerClassName='map-container'
                    center = {center}
                    zoom={10}
                >
                    {markers}
                </GoogleMap>
            )
        </div>
    )
}
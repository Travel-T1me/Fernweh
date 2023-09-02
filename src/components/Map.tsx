import * as React from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import "./renderMap.css"
import useStore from '../store';

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
    type PartialStore = {
        latLong: string,
        restaurants: any[],
    };
    
    const { latLong, restaurants }: PartialStore = useStore();
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAYLtERuyYBKMNDnbw9By4PIfyebbT-Qvw',
    });

    const latLongArray = latLong.split(',');
    const latitude = parseFloat(latLongArray[0]);
    const longitude = parseFloat(latLongArray[1]);
    const [center, setCenter] = useState({ lat: latitude, lng: longitude });
    const [zoom, setZoom] = useState(10);
    const [selectedRestaurant, setSelectedRestaurant] = useState<any | null>(null);

    useEffect(() => {
        const viewportHeight = window.innerHeight;
        document.getElementById("map-container")!.style.height = `${viewportHeight - 140}px`;
        console.log(`viewport: ${viewportHeight}`);
    }, []);

    const handleMarkerClick = (restaurant: any) => {
        setSelectedRestaurant(restaurant);
        setCenter({ lat: restaurant.latitude, lng: restaurant.longitude });
        setZoom(15); // Zoom closer to the selected restaurant
    };

    return (
        <div id="map-container" className="map-container">
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <GoogleMap
                    mapContainerClassName='map-container'
                    center={center}
                    zoom={zoom}
                    options={{
                        zoomControl: true,
                        streetViewControl: true
                    }}
                >
                    {/* User's current location marker */}
                    <Marker
                        key="unique-marker"
                        position={{ lat: latitude, lng: longitude }}
                        icon={{
                            url: '/path/to/user-icon.png',
                            scaledSize: new window.google.maps.Size(30, 30)
                        }}
                    />

                    {/* Restaurant markers */}
                    {restaurants.map((restaurant) => (
                        <Marker
                            key={restaurant.id}
                            position={{ lat: restaurant.latitude, lng: restaurant.longitude }}
                            onClick={() => handleMarkerClick(restaurant)}
                        />
                    ))}

                    {/* InfoWindow to display selected restaurant details */}
                    {selectedRestaurant && (
                        <InfoWindow
                            position={{ lat: selectedRestaurant.latitude, lng: selectedRestaurant.longitude }}
                            onCloseClick={() => {
                                setSelectedRestaurant(null);
                                setZoom(10); // Reset zoom when InfoWindow is closed
                            }}
                        >
                            <div>
                                <h2>{selectedRestaurant.name}</h2>
                                <p>{selectedRestaurant.address}</p>
                                <p>Rating: {selectedRestaurant.rating}</p>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            )}
        </div>
    );
}
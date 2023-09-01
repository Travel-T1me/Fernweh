import React from 'react'
import styled from 'styled-components';
import Map from '../components/Map'


const MapCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 1px solid black;
  height: calc(50vh - 150px);
  width: 100%;
  background-color: lightpink;
  min-height: 300px;
  min-width: 300px;
  overflow: hidden;

  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;


const MapContainer = () => {

  return (
    <MapCont>

      <Map/>
      
    </MapCont>
  )
};

export default MapContainer;
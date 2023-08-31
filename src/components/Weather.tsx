import React from 'react'
import styled from 'styled-components';

const WeatherContainer = styled.div`
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

  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const ScrollEffect = styled.div`
    width:10%;
    overflow-x: scroll;
    overfly-y: hidden;
    white-space: nowrap;
`

const Weather = () => {

  return (
    <WeatherContainer>
      <h1>Hello Weather Container</h1>
      <ScrollEffect>
        <div>
            <span>Div1</span>
            <span>Div2</span>
            <span>Div3</span>
            <span>Div3</span>
            <span>Div3</span>
            <span>Div3</span>
            <span>Div3</span>
            <span>Div3</span>
        </div>
      </ScrollEffect>
    </WeatherContainer>
  )
};

export default Weather;
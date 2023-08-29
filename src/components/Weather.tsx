import React from 'react'
import styled from 'styled-components';

const WeatherContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    border: 1px solid black;
    height: calc(50vh - 22.5px);
    width: 50vw;
    background-color: lightpink;
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
      <h1>What do you call a snowman with a six-pack? /nAn abdominal snowman.</h1>
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
import React from 'react'
import styled from 'styled-components'

const FeaturesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  background-color: papayawhip;
`;


const Features = () => {

  return (
    <FeaturesContainer>
      <h1>Hello from inside Features!</h1>
    </FeaturesContainer>
  )
};


export default Features;
import React from 'react'
import { css, styled } from 'styled-components';

// title component to render h1 tag
const Title = styled.h1`
font-size: 1.5em;
text-align: center;
color: #BF4F74;
`;

// wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
padding: 4em;
background: papayawhip;
`;

const Homepage = () => {

  return (
    <>
      <h1 className="testing">Welcome to your next adventure</h1>
      <Wrapper>
        <Title>
          Chegg it out, my first styled component!
        </Title>
      </Wrapper>
    </>
  )
}


export default Homepage;
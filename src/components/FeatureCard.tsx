import React, { useState } from 'react';
import styled from 'styled-components';
import { FeatureCardProps } from '../../types';

const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 15rem;
  width: 25rem;
  border: 1px solid black;
  border-radius: 10px;
  overflow: hidden;
  margin: 2rem;
  background-color: ivory;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px) scale(1.02);
  }
`;

const CardShadow = styled.div`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(
      to right,
      rgb(102, 255, 255),
      rgb(0, 153, 153)
    );
    transform: translateY(15px) scale(0.80);
    filter: blur(16px);
  }
`;

const IconSrc = styled.img`
  max-width: 75px;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const FeatureCard = ({ iconSrc, title, description }: FeatureCardProps) => {

  return (
    <CardShadow>
      <CardContainer>
        <IconSrc src={iconSrc} alt='Feature Icon' />
        <CardContent>
          <h2>{title}</h2>
          <br/>
          <p>{description}</p>
        </CardContent>
      </CardContainer>
    </CardShadow>
    
  )
};

export default FeatureCard;
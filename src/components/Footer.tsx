import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ivory;
  padding: 20px 0;
  text-align: center;
`;

const CopyrightText = styled.p`
  margin: 1rem;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <CopyrightText>
        &copy; {currentYear} Travel Time. All rights reserved.
      </CopyrightText>
    </FooterContainer>
  );
};

export default Footer;
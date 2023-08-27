import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { BaseButtonStyle } from '../GlobalStyles';
import { NavbarContainerProps } from '../types';

const Button = styled.button`${BaseButtonStyle}`;

const NavbarContainer = styled.div<NavbarContainerProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 4rem;
  background-color: #FFFFFF;
  color: black;
  border-bottom: 1px solid #ccc;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

const LoginButton = styled(Button)`
  background-color: white;
  border-color: hsl(240, 100%, 50%);
  color: blue;
  &:hover {
    background-color: hsl(240, 50%, 85%);
  }
`;

const SignUpButton = styled(Button)`
  background-color: hsl(240, 100%, 60%);;
  border-style: none;
  color: white;
  &:hover {
    background-color: hsl(240, 75%, 25%);
  }
`;


const Navbar: React.FC<NavbarContainerProps> = ({ visible }) => {
  // hook to handle navbar visibility
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 75) {
        setIsNavbarVisible(true);
      } else {
        setIsNavbarVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <NavbarContainer visible={isNavbarVisible}>
      <p>Hello inside Navbar</p>
      <div>
        <LoginButton>Login</LoginButton>
        <SignUpButton>Sign Up</SignUpButton>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
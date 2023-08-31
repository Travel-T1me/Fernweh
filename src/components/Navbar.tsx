import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { BaseButtonStyle } from '../GlobalStyles';
import { NavbarContainerProps } from '../../types';
import axios from 'axios';

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

// save for later
// const LogOutButton = styled(Button)`
//   background-color: white;
//   border-color: darkcyan;
//   color: darkcyan;
//   &:hover {
//     background-color: hsl(180, 50%, 85%);
//   }
// `;

const LoginButton = styled(Button)`
  background-color: hsl(180, 100%, 27.3%);;
  border-style: none;
  color: white;
  &:hover {
    background-color: hsl(180, 75%, 40%);
  }
`;

const Navbar: React.FC<NavbarContainerProps> = ({ visible }) => {
  // hook to handle navbar visibility
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetchUserData();
    // console.log("Current user data: ", userData);

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

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/isAuthenticated", {withCredentials: true});
      // console.log("Fetched user data:", response.data);
      if (response.data) setUserData(response.data);
    } catch (err) {
      console.log("Error fetching user data: ", err);
    }
  }

  return (
    <NavbarContainer visible={isNavbarVisible}>
      <h2>Travel Time</h2>
      <div>
        {Object.keys(userData).length > 0 ? (
          <a href="http://localhost:4000/logout">
            <LoginButton>Logout</LoginButton>
          </a>
        ) : (
          <a href="http://localhost:4000/auth/google">
            <LoginButton>Login</LoginButton>
          </a>
        )}
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
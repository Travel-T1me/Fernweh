import React from 'react';
import styled from 'styled-components';

type NavButtonProps = {
  onClick: () => void;
  children: string;
};

const NavButtonContainer = styled.button`
  border: none;
  background-color: transparent;
  font-size: 24px;
  cursor: pointer;
  padding: 1px;
  margin: 10px;
`;

const NavButton: React.FC<NavButtonProps> = ({ onClick, children }) => {

  return (
    <NavButtonContainer>
      <button onClick={onClick}>{children}</button>
    </NavButtonContainer>
  )
};

export default NavButton;
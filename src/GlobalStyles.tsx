import { createGlobalStyle, css } from "styled-components";


// Define common styling for base button
export const BaseButtonStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-style: solid;
  display: inline-flex;
  min-height: 32px;
  min-width: 32px;
  height: 32px;
  border-radius: 20px;
  background-color: #FFFFFF;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #CCCCCC;
  }
  cursor: pointer;
  margin-right: 0.50rem;
`;


const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    font-family: 'Poppins', sans-serif;
  }
`;

export default GlobalStyles;
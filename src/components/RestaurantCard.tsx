import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NavButton from './NavButton';

const RestaurantCardContainer = styled.div`
  border-radius: 20px;
  background-color: skyblue;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 300px;
  min-width: 400px;
`;
// border: 1px solid black;  Even out edges on cards

const InnerCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease-in-out;
`;

interface Restaurant {
  id: string;
  alias: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  business_page_link: string;
  rating: number;
  review_count: number;
  price_range: string;
  photo: string;
  photos_page_link: string;
  phone: string;
  country: string;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}


const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  

  return (
    <>
      
        <RestaurantCardContainer>
          <InnerCardContainer>
            
            <h3>{restaurant.name}</h3>
            <p>Address: {restaurant.address}</p>
            <p>Rating: {restaurant.rating}</p>
            
          </InnerCardContainer>
        </RestaurantCardContainer>
      
    </>
  )
};

export default RestaurantCard;



// const [scrollOffset, setScrollOffset] = useState(0);
//   const handleScroll: (scrollWidth: ScrollWidth) => void = (scrollWidth) => {
//     setScrollOffset((prevOffset) => Math.min(scrollWidth, prevOffset + 400));
//   };
{/* <NavButton onClick={() => handleScroll(-300)}>{"<"}</NavButton> */}
{/* <NavButton onClick={() => handleScroll(300)}>{">"}</NavButton> */}
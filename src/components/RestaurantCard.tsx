import React from 'react';
import styled from 'styled-components';

const RestaurantCardContainer = styled.div`
  border: 1px solid black;
  background-color: papayawhip;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 300px;
  min-width: 300px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
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

//height: calc(50vh - 150px);
//{ restaurant }

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <RestaurantCardContainer>
      <CardContainer>
        <h3>Single Restaurant Info Here</h3>
        <h3>{restaurant.name}</h3>
        <p>Address: {restaurant.address}</p>
        <p>Rating: {restaurant.rating}</p>
      </CardContainer>
      
    </RestaurantCardContainer>
  )
};

export default RestaurantCard;
import React from 'react'
import axios from 'axios';
import axiosInstance from '../axiosInstance'

const Homepage = () => {
  const sendBudget = {
    high: 400,
    low: 100,
  }
  const sendWeather = {
    startYear: 2023,
    startMonth: 8,
    startDay: 27,
    startHour: 0,
    endYear: 2023,
    endMonth: 8,
    endDay: 30,
    endHour: 0,
    location: '42.2968, 71.2924'
  }
  let mongoId;
  React.useEffect(() =>
  {
    console.log('hi')
    // axiosInstance.post('/budget', sendBudget).then(response => {
    //   console.log(response.data);
    //   mongoId = response.data;
    // })
    axiosInstance.post('/weather/64eb395580d09f959954c47a', sendWeather).then(response => {
      console.log(response.data);
    })
  }
  )
  return (
    <>
      <h1>Welcome to your next adventure</h1>
    </>
  )
}


export default Homepage;
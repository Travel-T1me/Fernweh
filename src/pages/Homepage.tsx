import React from 'react'
import axios from 'axios';
import axiosInstance from '../axiosInstance'

const Homepage = () => {
  const initialSend = {
    budget: `$$`,
    number: 4,
  }

  const sendWeather = { //send destination as lat long + string
    startDate: '8/29/2023',
    endDate: '9/2/2023',
    destination: 'London',
    latLong: '51.5072, 0.1276'
  }

  const notes = {
    additionalNotes: ''
  }

  let mongoId: string;

  React.useEffect(() => {
    const fetch = async () => {
      try {
        console.log('hi');
        const initialRes = await axiosInstance.post('/initial', initialSend);
        const mongoID = initialRes.data;
        const weatherRes = await axiosInstance.post(`/weather/${mongoID}`, sendWeather);
        const restaurantRes = await axiosInstance.post(`/yelp/${mongoID}`)
        const notesRes = await axiosInstance.post(`/notes/${mongoID}`, {
          notes: `We are celebrating the birthday of a friend turning 30 on Sep 3, 2023.`
        })
        const gptRes = await axiosInstance.post(`/llm/${mongoID}`, {docID: mongoID});
        console.log(gptRes.data);

      } catch(err) {
        console.error('Err:', err);
      }
    }

    fetch();
  })

  return (
    <>
      <h1>Welcome to your next adventure</h1>
    </>
  )
}


export default Homepage;
import React from 'react'
import axios from 'axios';
import axiosInstance from '../axiosInstance'
import Navbar from '../components/Navbar';
import Features from '../components/Features';
import HeroSection from '../components/HeroSection';
import GetStartedSection from '../components/GetStartedSection';
import Footer from '../components/Footer';

import AutoComplete from '../components/AutoComplete';
import { useState } from 'react';

const Homepage = () => {
  // const initialSend = {
  //   budget: `$$`,
  //   number: 4,
  // }

  // const sendWeather = { //send destination as lat long + string
  //   startDate: '8/31/2023',
  //   endDate: '9/2/2023',
  //   destination: 'London',
  //   latLong: '51.5072, 0.1276'
  // }

  // const notes = {
  //   additionalNotes: ''
  // }

  const [mongoID, setMongoId] = useState('');

  const resend = async () => {
    console.log('mongoId?', mongoID)
    const gptRes = await axiosInstance.post(`/llm/${mongoID}`, {docID: mongoID}); // final submit
    console.log('refetched response:', gptRes.data)
  }

  // React.useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       console.log('hi');
  //       const initialRes = await axiosInstance.post('/initial', initialSend); //after user inputs num travellers
  //       console.log('DATA?', initialRes.data)
  //       setMongoId(initialRes.data);
  //       const newId = initialRes.data
  //       console.log('mongoId', mongoID)
  //       const weatherRes = await axiosInstance.post(`/weather/${newId}`, sendWeather); //after user inputs destination
  //       const restaurantRes = await axiosInstance.post(`/yelp/${newId}`) // probably be sent at the same time
  //       const notesRes = await axiosInstance.post(`/notes/${newId}`, {
  //         notes: `We are celebrating the birthday of a friend turning 30 on Sep 3, 2023.`
  //       }) //after notes
  //       const gptRes = await axiosInstance.post(`/llm/${newId}`, {docID: newId}); // final submit
  //       console.log(gptRes.data);

  //     } catch(err) {
  //       console.error('Err:', err);
  //     }
  //   }

  //   fetch();
  // }, [])


  const isNavbarVisible = false;

  return (
    <>
      <Navbar visible={isNavbarVisible}/>

      <HeroSection />

      <Features />

      <GetStartedSection />

      <Footer />
      <AutoComplete/>
      <button onClick={resend}>RE-SEND</button>
    </>
  )
}


export default Homepage;
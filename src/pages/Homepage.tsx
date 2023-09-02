import React, { useEffect } from 'react'
import axios from 'axios';
import axiosInstance from '../axiosInstance'
import Navbar from '../components/Navbar';
import Features from '../components/Features';
import HeroSection from '../components/HeroSection';
import GetStartedSection from '../components/GetStartedSection';
import Footer from '../components/Footer';



import { useState } from 'react';

const Homepage = () => {

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
  //       const mongoID = initialRes.data;
  //       const weatherRes = await axiosInstance.post(`/weather/${mongoID}`, sendWeather); //after user inputs destination
  //       const restaurantRes = await axiosInstance.post(`/yelp/${mongoID}`) // probably be sent at the same time
  //       const notesRes = await axiosInstance.post(`/notes/${mongoID}`, {
  //         notes: `We are celebrating the birthday of a friend turning 30 on Sep 3, 2023.`
  //       }) //after notes
  //       const gptRes = await axiosInstance.post(`/llm/${mongoID}`, {docID: mongoID}); // final submit
  //       console.log(gptRes.data);

  //     } catch(err) {
  //       console.error('Err:', err);
  //     }
  //   }

  //   fetch();
  // }, [])


  const isNavbarVisible = false;

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <Navbar visible={isNavbarVisible}/>
      
      <HeroSection />

      <Features />

      <GetStartedSection />

      <Footer />
      {/* <AutoComplete/> */}
      {/* <button onClick={resend}>RE-SEND</button> */}
    </>
  )
}

//{console.log("DATADAtA", data)}
export default Homepage;
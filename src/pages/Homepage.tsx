import React from 'react'
import axios from 'axios';
import axiosInstance from '../axiosInstance'
import Navbar from '../components/Navbar';
import Features from '../components/Features';
import HeroSection from '../components/HeroSection';
import GetStartedSection from '../components/GetStartedSection';
import Footer from '../components/Footer';


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
  // })

  
  const isNavbarVisible = false;

  return (
    <>
      <Navbar visible={isNavbarVisible.toString()}/>
      
      <HeroSection />
      
      <Features />
      
      <GetStartedSection />
      
      <Footer />
    </>
  )
}


export default Homepage;
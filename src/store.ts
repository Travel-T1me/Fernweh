import { create } from "zustand";
import { devtools } from 'zustand/middleware'
import { 
  SetNumberOfTravellers, 
  InfoForWeather,
  SetInfoForWeather,
  SetYelpBudget,
  SetLocationAsString,
  SetAdditionalNotes,
  SetArrivalDate,
  SetEndDate,
  SetLatLong,
  SetRestaurants,
  SetPexelPics
} from "../types";

interface StoreState {
  numOfTravellers: string,
  setNumberOfTravellers: SetNumberOfTravellers,

  arrivalDate: string,
  setArrivalDate: SetArrivalDate,

  endDate: string,
  setEndDate: SetEndDate,

  infoForWeather: InfoForWeather,
  setInfoForWeather: SetInfoForWeather,

  yelpBudget: string,
  setYelpBudget: SetYelpBudget,

  location: string,
  setLocationAsString: SetLocationAsString,

  latLong: string,
  setLatLong: SetLatLong,

  additionalNotes: string,
  setAdditionalNotes: SetAdditionalNotes,

  restaurants: any[],
  setRestaurants: SetRestaurants,

  pexelPics: any[],
  setPexelPics: SetPexelPics,

  initialData: {
    budget:string,
    number:number
  },
  setInitialData: (budget:string, number:number) => void,

  mongoID: string,
  setMongoID: (id: string) => void,

  gptResponse: any,
  setGptResponse: (res: any) => void

  responseId: string,
  setResponseId: (id: string) => void
}


const useStore = create<StoreState>((set) => ({
  // number of travellers
  numOfTravellers: '',
  setNumberOfTravellers: (numOfTravellers: string) : void => set((state) => ({
    ...state, numOfTravellers,
  })),

  // modularized state for weather
  arrivalDate: '',
  setArrivalDate: (arrivalDate: string): void => set((state) => ({
    arrivalDate,
  })),

  endDate: '',
  setEndDate: (endDate: string): void => set((state) => ({
    endDate,
  })),


  // weather state, information for weather (location and dates)
  infoForWeather: {
    startDate: '',
    endDate: '',
    destination: '',
    latLong: ''
  },
  setInfoForWeather: (startDate:string, endDate:string, destination:string, latLong:string) : void => set((state) => ({
    infoForWeather: {
      startDate,
      endDate,
      destination,
      latLong,
    }
  })),

  // information for yelp budget
  yelpBudget: '',
  setYelpBudget: (yelpBudget: string) : void => set((state) => ({
    ...state, yelpBudget,
  })),

  // location as a string
  location: '',
  setLocationAsString: (location: string) : void => set((state) => ({
    ...state, location,
  })),

  restaurants: [],
  setRestaurants: (restaurants: any[]): void => set((state) => ({
    ...state,
    restaurants,
  })),

  additionalNotes: '',
  setAdditionalNotes: (additionalNotes:string) : void => set((state) => ({
    additionalNotes
  })),

  initialData: {
    budget:'',
    number: 0
  },
  setInitialData: (budget: string, number:number) : void => set((state) => ({
    initialData: {
      budget,
      number
    }
  })),
  mongoID: '',
  setMongoID: (id: string): void => set((state) => ({
    mongoID: id
  })),

  gptResponse: '',
  setGptResponse: (res: any): void => set((state) => ({
    gptResponse: res
  })),

  responseId: '',
  setResponseId: (id: string): void => set((state) => ({
    ...state, responseId: id
  })),

  latLong: '',
  setLatLong: (latLong: string): void => set ((state)  => ({
    latLong
  })),

  // pexel pics
  pexelPics: [],
  setPexelPics: (pexelPics: any[]): void => set((state) => ({
    ...state,
    pexelPics,
  })),

}));

export default useStore;

  // feed of trips from all users
    // how do we grab all of the trips from the database?
    // use axios to fetch from the database

  // feed of saved trips from logged in user
    // how do we grab all of the trips from logged in user?
    // use axios to fetch form the database

  // itinerary generated?
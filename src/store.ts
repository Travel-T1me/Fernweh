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
  SetLeavingDate
} from "../types";

interface StoreState {
  numOfTravellers: string,
  setNumberOfTravellers: SetNumberOfTravellers,

  arrivalDate: string,
  setArrivalDate: SetArrivalDate,

  leavingDate: string,
  setLeavingDate: SetLeavingDate,

  infoForWeather: InfoForWeather,
  setInfoForWeather: SetInfoForWeather,

  yelpBudget: string,
  setYelpBudget: SetYelpBudget,

  location: string,
  setLocationAsString: SetLocationAsString,

  additionalNotes: string,
  setAdditionalNotes: SetAdditionalNotes,

  initialData: {
    budget:string,
    number:number
  },
  setInitialData: (budget:string, number:number) => void,

  mongoID: string,
  setMongoID: (id: string) => void,

  gptResponse: any,
  setGptResponse: (res: any) => void
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

  leavingDate: '',
  setLeavingDate: (leavingDate: string): void => set((state) => ({
    leavingDate,
  })),


  // weather state, information for weather (location and dates)
  infoForWeather: {
    startDate: '',
    leavingDate: '',
    destination: '',
    latLong: ''
  },
  setInfoForWeather: (startDate:string, leavingDate:string, destination:string, latLong:string) : void => set((state) => ({
    infoForWeather: {
      startDate,
      leavingDate,
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

  additionalNotes: '',
  setAdditionalNotes: (notes:string) : void => set((state) => ({
    ...state, notes,
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
  }))

}));

export default useStore;

  // feed of trips from all users
    // how do we grab all of the trips from the database?
    // use axios to fetch from the database

  // feed of saved trips from logged in user
    // how do we grab all of the trips from logged in user?
    // use axios to fetch form the database

  // itinerary generated?
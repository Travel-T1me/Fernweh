import { create } from "zustand";
import { 
  SetNumberOfTravellers, 
  InfoForWeather,
  SetInfoForWeather,
  SetYelpBudget,
  SetLocationAsString,
  SetAdditionalNotes
} from "../types";

interface StoreState {
  numOfTravellers: string,
  setNumberOfTravellers: SetNumberOfTravellers,

  infoForWeather: InfoForWeather,
  setInfoForWeather: SetInfoForWeather,

  yelpBudget: string,
  setYelpBudget: SetYelpBudget,

  location: string,
  setLocationAsString: SetLocationAsString,

  additionalNotes: string,
  setAdditionalNotes: SetAdditionalNotes,
}


const useStore = create<StoreState>((set) => ({
  // number of travellers
  numOfTravellers: '',
  setNumberOfTravellers: (numOfTravellers: string) : void => set((state) => ({
    ...state, numOfTravellers,
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

  additionalNotes: '',
  setAdditionalNotes: (notes:string) : void => set((state) => ({
    ...state, notes,
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
import { create } from "zustand";
import { 
  setNumberOfTravellers, 
  infoForWeather,

} from "../types";


interface StoreState {
  numOfTravellers: string,
  setNumberOfTravellers: setNumberOfTravellers,
  infoForWeather: infoForWeather,
  setInfoForWeather: (arrival:string, depart:string, destination:string, latLong:string) => void,
  yelpBudget: string,
  setYelpBudget: (budget: string) => void,
  locationAsString: string,
  setLocationAsString: (location:string) => void
}


const questionaireStore = create<StoreState>((set) => ({

  // number of travellers
    numOfTravellers: '',
    setNumberOfTravellers: (num:string) => set(() => ({
        numOfTravellers: num
    })),

  // weather state
  // information for weather (location and dates)
    infoForWeather: {
        startDate: '',
        endDate: '',
        destination: '',
        latLong: ''
    },
    setInfoForWeather: (arrival:string, depart:string, destination:string, latLong:string) => set(() => ({
        infoForWeather: {
            startDate: arrival,
            endDate: depart,
            destination: destination,
            latLong: latLong
        }
    })),
  // information for yelp
  // location as a string

    yelpBudget: '',
    setYelpBudget: (budget: string) => (() => {
        yelpBudget: budget
    }),

    // destination needs
    // location as lat / long (coordinates)
    locationAsString: '',
    setLocationAsString: (location: string) => (() => {
        locationAsString: location
    })
  
  
  // departure date "string"

  // feed of trips from all users
    // how do we grab all of the trips from the database?
    // use axios to fetch from the database

  // feed of saved trips from logged in user
    // how do we grab all of the trips from logged in user?
    // use axios to fetch form the database

  // itinerary generated?
}))

export default questionaireStore
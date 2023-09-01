
export interface PartialStore {
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
  
    additionalNotes: string,
    setAdditionalNotes: SetAdditionalNotes,

    restaurants: any[],
    setRestaurants: SetRestaurants,

    initialData: {
        budget: string,
        number: number
    },

    setInitialData: (budget:string, number:number) => void,
    mongoID: string,
    setMongoID: (id: string) => void,
    gptResponse: any,
    setGptResponse: (res: any) => void,

    responseId: string,
    setResponseId: (id: string) => void

};


export type QuestionCardType = {
    el: number,
    question: string,
    type: string,
    setQuestionStates: React.Dispatch<React.SetStateAction<boolean[]>>,
    questionStates: boolean[],
    // ref: any
};

export interface NavbarContainerProps {
    visible: boolean;
}

export interface ButtonProps {
    onClick: () => void;
    label: string;
}

export interface FeatureCardProps {
    iconSrc: string;
    title: string;
    description: string;
}

export interface InfoForWeather {
    startDate: string,
    endDate: string,
    destination: string,
    latLong: string
};

export type SetNumberOfTravellers = (numOfTravellers: string) => void;

export type SetInfoForWeather = (startDate: string, endDate: string, destination: string, latLong: string) => void;

export type SetYelpBudget = (yelpBudget: string) => void;

export type SetLocationAsString = (location: string) => void;

export type SetAdditionalNotes = (notes: string) => void;

export type SetArrivalDate = (date: string) => void;

export type SetEndDate = (date: string) => void;

export type SetLatLong = (latLong: string) => void;

export type SetRestaurants = (restaurants: any[]) => void; 
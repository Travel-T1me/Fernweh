export type QuestionCardType = {
    el: number,
    question: string,
    type: string,
    setQuestionStates: React.Dispatch<React.SetStateAction<boolean[]>>,
    questionStates: boolean[],
    min: string,
    max: string,
    ref: any
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
  
  export type setNumberOfTravellers = (num: string) => void;
  
  export type infoForWeather = {
    startDate: string,
    endDate: string,
    destination: string,
    latLong: string
  };
  
  
  export interface StoreTypes {
    numOfTravellers: number,
    setNumberOfTravellers: setNumberOfTravellers,
    infoForWeather: infoForWeather,
    setInfoForWeather: (arrival:string, depart:string, destination:string, latLong:string) => void,
    yelpBudget: string,
    setYelpBudget: (budget: string) => void,
    locationAsString: string,
    setLocationAsString: (location:string) => void
  }
  
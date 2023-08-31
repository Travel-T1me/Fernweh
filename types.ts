
export interface PartialStore {
    numOfTravellers?: string;
    setNumberOfTravellers?: SetNumberOfTravellers;

    infoForWeather?: InfoForWeather;
    setInfoForWeather?: SetInfoForWeather;

    yelpBudget?: string;
    setYelpBudget?: SetYelpBudget;

    location?: string;
    setLocationAsString?: SetLocationAsString;

    additionalNotes?: string;
    setAdditionalNotes?: SetAdditionalNotes;
};


export type QuestionCardType = {
    el: number,
    question: string,
    type: string,
    setQuestionStates: React.Dispatch<React.SetStateAction<boolean[]>>,
    questionStates: boolean[],
    min: string | undefined,
    max: string | undefined,
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


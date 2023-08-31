import React, { ChangeEvent, useEffect } from "react";
import { styled } from 'styled-components'
import { useState } from "react";
import { QuestionCardType } from "../../types";
import { Link } from "react-router-dom";
import { BaseButtonStyle } from "../GlobalStyles";
import useStore from '../store';
import {
    PartialStore
} from '../../types';
import axiosInstance from '../axiosInstance'


const Button = styled.button`${BaseButtonStyle}`;

const Wrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height: 100vh;
`

const CardContainer = styled.div`
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
`

const Card = styled.div`
    border:solid;
    border-color: darkcyan;
    border-radius:25px;
    background-color: ivory;
    width:450px;
    height:auto;
    padding:100px;
    margin:100px;
    text-align: center;
    justify-content: center;
`

const Buttons = styled.section`
    margin: 0px;
    display: flex;
    justify-content: space-evenly;
`

const SubmitButton = styled(Button)`
  background-color: white;
  border-color: darkcyan;
  color: darkcyan;
  &:hover {
    background-color: hsl(180, 50%, 85%);
  }
  padding: 24px 24px;
  font-size: 18px;
  font-weight: bold;
`;

const BackButton = styled(Button)`
  background-color: hsl(180, 100%, 27.3%);;
  border-style: none;
  color: white;
  &:hover {
    background-color: hsl(180, 75%, 40%);
  }
  padding: 24px 24px;
  font-size: 18px;
  font-weight: bold;
`;


const Question = styled.h1`
    font-size: 36px;
    margin: -50px 0 0px 0;
`

const InputField = styled.section`
    margin: 50px 0;
    border: black;
`

const QuestionCard = ({question, type, el, setQuestionStates, questionStates, min, max}: QuestionCardType) => {
    // const weatherRes = axiosInstance.post(`/weather/${mongoID}`, sendWeather); //after user inputs destination
    // const restaurantRes = axiosInstance.post(`/yelp/${mongoID}`) // probably be sent at the same time
    // const notesRes =  axiosInstance.post(`/notes/${mongoID}`, {
    //     notes: `We are celebrating the birthday of a friend turning 30 on Sep 3, 2023.`
    //     }) //after notes
    // const gptRes = axiosInstance.post(`/llm/${mongoID}`, {docID: mongoID}); // final submit

    // store and reducers
    const {
        numOfTravellers,
        setNumberOfTravellers,
        arrivalDate,
        setArrivalDate,
        leavingDate,
        setLeavingDate,
        infoForWeather,
        setInfoForWeather,
        yelpBudget,
        setYelpBudget,
        location,
        setLocationAsString,
        additionalNotes,
        setAdditionalNotes,
        initialData,
        setInitialData,
        mongoID,
        setMongoId,
        gptResponse,
        setGptResponse
    } : PartialStore = useStore();
    
    // state for user inputs
    const [answer, setAnswer] = useState("");

    // handleChange to update answer
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value);
    }

    // reducers array to dynamically set state
    const reducersArr = [setNumberOfTravellers, setYelpBudget, setInitialData, setLocationAsString, setArrivalDate, setLeavingDate, setInfoForWeather, setAdditionalNotes]

    const handleClick = (async (boo: boolean, index: number) => {
        // copying state to manipulate for fading effects
        const newState = [...questionStates]

        // case if user hits back button
        if (!boo && el !== 0){
            newState[el] = false;
            setQuestionStates(newState);
        } 
        // case if user hits submit button
        else if (boo){
            switch (index) {
                case 0:
                    setNumberOfTravellers(answer);
                    break;
                case 1:
                    setYelpBudget(answer);
                    setInitialData(yelpBudget, Number(numOfTravellers));
                    const initialRes = await axiosInstance.post('/initial', initialData);
                    setMongoID(initialRes.data)
                    break;
                case 2:
                    setLocationAsString(answer);
                    break;
                case 3:
                    setArrivalDate(answer);
                case 4:
                    setLeavingDate(answer);
                    setInfoForWeather(arrivalDate, leavingDate, location, '40.7128, 74.0060');
                    const weatherRes = await axiosInstance.post(`weather/${mongoID}`, infoForWeather);
                    const restaurantRes = await axiosInstance.post(`/yelp/${mongoID}`);
                case 5:
                    setAdditionalNotes(answer);
                    const notesRes = await axiosInstance.post(`/notes/${mongoID}`, { notes: additionalNotes })
            }
            // call the reducers to set the state
            setArrivalDate(answer);

            // reveal the next card by changing the state
            newState[el + 1] = true;
            setQuestionStates(newState);

            // scroll to the new card (TODO)
                // THIS IS WHERE I LEFT OFF
                // ref.current.scrollIntoView({
                //     behavior: 'smooth'
                // })
        }
    })

    const sendToGpt = async () => {
        const gptRes = await axiosInstance.post(`/llm/${mongoID}`, {docID: mongoID});
        setGptResponse(gptRes);
    }

    let inputField;

    if (type === 'number' && min){
        // need to add edge case for when user manually inputs a value higher than 4
        inputField = <input style={{width: '75%', height: '40px', border: 'solid', borderRadius: '20px', margin:'50px 0', fontSize: '20px', textAlign: 'center', padding: '0px 10px 0 0'}} type={type} min={min} max={max} onChange={handleChange} />
    } else {
        inputField = <input style={{width: '75%', height: '40px', border: 'solid', borderRadius: '20px', margin:'50px 0', fontSize: '20px', textAlign: 'center', padding: '0 10px 0 0' }} type={type} onChange={handleChange}/>
    }

    return (
        <Wrapper>
            <CardContainer>
                <Card>
                    <Question>
                        {question}
                    </Question>
                    <InputField>
                        {inputField}
                    </InputField>
                    <br />
                    <Buttons>
                        {
                        el === questionStates.length - 1 && <Link to={`/results`}><SubmitButton onClick={() => sendToGpt()}>
                            Get your itinerary
                        </SubmitButton></Link>
                        } 
                        {       
                        !questionStates[el+1] && el < questionStates.length - 1 && <SubmitButton onClick={() => handleClick(true, el)}>
                            Submit
                        </SubmitButton>
                        }
                        {
                        el !== 0 && !questionStates[el + 1] && <BackButton onClick={() => handleClick(false, el)}>
                            Go Back
                        </BackButton>
                        }
 
                    </Buttons>
                </Card>
            </CardContainer>
        </Wrapper>
    )
}

export default QuestionCard
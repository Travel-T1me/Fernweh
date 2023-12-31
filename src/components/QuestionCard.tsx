import React, { ChangeEvent, useEffect } from "react";
import { styled } from 'styled-components'
import { useState } from "react";
import { QuestionCardType } from "../../types";
import { Link } from "react-router-dom";
import { BaseButtonStyle } from "../GlobalStyles";
import useStore from '../store';
import { PartialStore } from '../../types';
import axiosInstance from '../axiosInstance';
import AutoComplete from "./AutoComplete";

interface CardProps {
    $show?: boolean;
}


const Button = styled.button`${BaseButtonStyle}`;


const Card = styled.div<CardProps>`
    border: 2px solid;
    border-color: darkcyan;
    border-radius:25px;
    background-color: ivory;
    width:650px;
    height:600px;
    padding:100px;
    margin:100px;
    text-align: center;
    justify-content: center;
    // These transitions are currently not working
    opacity: ${props => (props.$show ? 1 : 0)};
    transition: opacity 0.5s ease;
    // transform: scaleY(${props => (props.$show ? 1 : 0)});
    // transform-origin: top;
    // transition: transform 1s ease-in-out;
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

const QuestionCard = ({question, type, el, setQuestionStates, questionStates, setCurrentQuestionIndex, currentQuestionIndex}: QuestionCardType) => {

    // store and reducers
    const {
        setNumberOfTravellers,
        setArrivalDate,
        setEndDate,
        setYelpBudget,
        setAdditionalNotes,
        setGptResponse,
        setResponseId,
        setRestaurants,
        setPexelPics,
    } : PartialStore = useStore();
    
    // state for user inputs
    const [answer, setAnswer] = useState("");
    
    // handleChange to update answer
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setAnswer(e.target.value);
    }

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        setAnswer(event.target.value);
      };
      

    const handleClick = (async (boo: boolean, index: number) => {
        // copying state to manipulate for fading effects
        const newState = [...questionStates]

        // case if user hits back button
        if (!boo && el !== 0){
            newState[el] = false;
            setQuestionStates(newState);

            // Set the previous card to true to show previous card
            newState[el - 1] = true;
            setQuestionStates(newState);

            // transition to the previous card
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            console.log(`Checking currentQuestionIndex, back button: ${currentQuestionIndex}`);
        } 
        else if (boo){
            // Transition the current card to false if it's not the last one
            if (el < questionStates.length - 1) {
                newState[el] = false;
                setQuestionStates(newState);
            }

            switch (index) {
                case 0:
                    setNumberOfTravellers(answer);
                    break;
                case 1:
                    setYelpBudget(answer);
                    //const usersYelpBudget = useStore.getState().yelpBudget
                    //const travellers = Number(useStore.getState().numOfTravellers)
                    
                    break;
                case 2:
                    //console.log(`Inside case 2 of QuestionCard`,useStore.getState())
                    break;
                case 3:
                    setArrivalDate(answer);
                    //console.log(`Inside of case 3 of QuestionCard`,useStore.getState())
                    break;
                case 4:
                    setEndDate(answer);

                    try {
                        // RESTURANT DATA - commented out to save calls
                        const restaurantResponse = await axiosInstance.get(`/yelp/${useStore.getState().location}`) as any
                        setRestaurants(restaurantResponse.data.data);

                        // Pexel Image Data 
                        const pexelsResponse = await axiosInstance.get(`/pexels?query=${useStore.getState().location}`);
                        setPexelPics(pexelsResponse.data.photos);

                        //console.log(`Inside of case 4 of QuestionCard`, useStore.getState())
                    } catch(error) {
                        console.error(`An error occurred during Axios requests in case 4, QuestionCard component.`, error);
                    }
                    break;
            }
            // reveal the next card by changing the state
            //console.log(`Check questionStates of question: ${question}`)
            //console.log(`Updated state for QuestionCard, newState: ${newState}`);
            //console.log(`Transitioning to next card.`);

            if (el < questionStates.length - 1) {
                // transition to next card
                newState[el + 1] = true;
                setQuestionStates(newState);
                //console.log(`State after setQuestionStates: ${newState}`);
            }
            

            // Update to the next question index
            if (currentQuestionIndex < questionStates.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
            console.log(`Checking currentQuestionIndex, forward button: ${currentQuestionIndex}`);
            
        }
    })

    const sendToGpt = async (): Promise<void> => {
        setAdditionalNotes(answer)

        //console.log(`Checking if restaurants is an array within sendToGpt: ${useStore.getState()}`);

        const restaurants = useStore.getState().restaurants.map(restaurant => {
            return {
                address: restaurant.address,
                name: restaurant.name,
                rating: restaurant.rating,
                review_count: restaurant.review_count
            }
        })

        const composedRequest = {
            latLong: useStore.getState().latLong,
            start: useStore.getState().arrivalDate,
            end: useStore.getState().endDate,
            Travellers: useStore.getState().numOfTravellers,
            Budget: useStore.getState().yelpBudget,
            AdditionalNotes: useStore.getState().additionalNotes,
            Restaurants: restaurants,
        }

        //console.log('COMPOSEDREQUEST', composedRequest)


        const gptRes = async () => {
            try{
                const data = await axiosInstance.post(`/llm/`, composedRequest);
                return data;
            } catch (err){
                console.error('Err:', err)
            }};
        const gptResponse = await gptRes()

        //console.log(`gptResponse`, gptResponse.data.response)
        setGptResponse(gptResponse.data.response);
        setResponseId(gptResponse.data.id)
        //console.log('final state', useStore.getState())
    }

    let inputField;

    if (type === 'select'){
        inputField = 
            <select name='budget' 
                style={{    
                    width: '75%', 
                    height: '40px', 
                    border: 'solid',
                    borderColor: 'darkcyan', 
                    borderRadius: '20px', 
                    margin:'50px 0', 
                    fontSize: '20px', 
                    textAlign: 'center', 
                    padding: '0 10px 0 0',
                    backgroundColor: 'rgb(242, 242, 242)',
                    }} 
            onChange={handleSelectChange}>
            <option value='none' selected disabled hidden>Select a budget</option>
            <option value='$'>1</option>
            <option value='$$'>2</option>
            <option value='$$$'>3</option>
            <option value='$$$$'>4</option>
        </select>
    } else if (type === 'location'){
        inputField = <AutoComplete />
    } else {
        inputField = 
            <input 
                style={{
                    width: '75%', 
                    height: '40px', 
                    border: 'solid',
                    borderColor: 'darkcyan', 
                    borderRadius: '20px', 
                    margin:'50px 0', 
                    fontSize: '20px', 
                    textAlign: 'center', 
                    padding: '0 10px 0 0', 
                    backgroundColor: 'rgb(242, 242, 242)', 
                }} type={type} 
            onChange={handleChange}/>
    }

    console.log(`Check check....need to check questionState of QuestionCard: ${questionStates}`)
    //console.log(`Checking currentQuestionIndex, back button, above return statement: ${currentQuestionIndex}`);
    //console.log(`Checking currentQuestionIndex, forward button, above return statement: ${currentQuestionIndex}`);

    return (
        <>
            <Card $show={questionStates[currentQuestionIndex]}>
                <Question>{question}</Question>
                <InputField>{inputField}</InputField>
                <br />
                <Buttons>
                    {
                    (el !== 0 || el === questionStates.length - 1) && !questionStates[el + 1] && <BackButton onClick={() => handleClick(false, el)}>
                        Go Back
                    </BackButton>
                    }
                    {       
                    !questionStates[el+1] && el < questionStates.length - 1 && <SubmitButton onClick={() => handleClick(true, el)}>
                        Submit
                    </SubmitButton>
                    }
                    {
                    el === questionStates.length - 1 && <Link to={`/results`}><SubmitButton onClick={() => sendToGpt()}>
                        Get your itinerary
                    </SubmitButton></Link>
                    } 
                </Buttons>
            </Card>
        </>
        
    )
}

export default QuestionCard;


// This wrapper component commented out has no change in the display. Commenting out for now, ready for deletion.
// const Wrapper = styled.div`
//     display:flex;
//     justify-content:center;
//     align-items:center;
//     height: 100vh;
// `

// const CardContainer = styled.div`
//     display: flex;
//     height: 100vh;
//     align-items: center;
//     justify-content: center;
// `



// took out of the handleClick function right before the sendToGpt function:
// scroll to the new card (TODO)
                // THIS IS WHERE I LEFT OFF
                // ref.current.scrollIntoView({
                //     behavior: 'smooth'
                // })
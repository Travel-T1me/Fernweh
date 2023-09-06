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
    width:650px;
    height:600px;
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

const QuestionCard = ({question, type, el, setQuestionStates, questionStates}: QuestionCardType) => {

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
        } 
        else if (boo){
            switch (index) {
                case 0:
                    setNumberOfTravellers(answer);
                    break;
                case 1:
                    setYelpBudget(answer);
                    const usersYelpBudget = useStore.getState().yelpBudget
                    const travellers = Number(useStore.getState().numOfTravellers)
                    
                    //don't need to set this or mongoId anymore 
                    // setInitialData(usersYelpBudget, travellers);
                    // const initialRes = async () => {
                    //     try {
                    //         const data = await axiosInstance.post('/initial', initialData);
                    //         return data
                    //     } catch (err) {
                    //         console.error('Err:', err)
                    //     }}
                    // const initialResponse = await initialRes()
                    // setMongoID(initialResponse.data);
                    break;
                case 2:
                    console.log(useStore.getState())
                    break;
                case 3:
                    setArrivalDate(answer);
                    console.log(useStore.getState())
                    break;
                case 4:
                    setEndDate(answer);

                    // RESTURANT DATA - commented out to save calls
                    const restaurantResponse = await axiosInstance.get(`/yelp/${useStore.getState().location}`) as any
                    setRestaurants(restaurantResponse.data.data);
                    console.log(useStore.getState())
                    break;
            }
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

    const sendToGpt = async (): Promise<void> => {
        setAdditionalNotes(answer)

        console.log(`Checking if restaurants is an array within sendToGpt: ${useStore.getState()}`);

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

        console.log('COMPOSEDREQUEST', composedRequest)


        const gptRes = async () => {
            try{
                const data = await axiosInstance.post(`/llm/`, composedRequest);
                return data;
            } catch (err){
                console.error('Err:', err)
            }};
        const gptResponse = await gptRes()

        console.log(`gptResponse`, gptResponse.data.response)
        setGptResponse(gptResponse.data.response);
        setResponseId(gptResponse.data.id)
        console.log('final state', useStore.getState())
    }

    let inputField;

    if (type === 'select'){
        inputField = 
        <select name='budget' style={{width: '75%', height: '40px', border: 'solid', borderRadius: '20px', margin:'50px 0', fontSize: '20px', textAlign: 'center', padding: '0 10px 0 0' }} onChange={handleSelectChange}>
            <option value='none' selected disabled hidden>Select a budget</option>
            <option value='$'>1</option>
            <option value='$$'>2</option>
            <option value='$$$'>3</option>
            <option value='$$$$'>4</option>
        </select>
    } else if (type === 'location'){
        inputField = <AutoComplete />
    } else {
        inputField = <input style={{width: '75%', height: '40px', border: 'solid', borderRadius: '20px', margin:'50px 0', fontSize: '20px', textAlign: 'center', padding: '0 10px 0 0' }} type={type} onChange={handleChange}/>
    }

    return (
        <Wrapper>
            <CardContainer>
                <Card>
                    <Question>{question}</Question>
                    <InputField>{inputField}</InputField>
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
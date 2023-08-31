import React, { ChangeEvent } from "react";
import { styled } from 'styled-components'
import { useState } from "react";
import { QuestionCardType } from "../../types";
import { Link } from "react-router-dom";
import { BaseButtonStyle } from "../GlobalStyles";
import useStore from '../store';
import {
    PartialStore
} from '../../types';


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

const QuestionCard = ({question, type, el, setQuestionStates, questionStates, min, max, ref}: QuestionCardType) => {
    const {
        setNumberOfTravellers,
        setInfoForWeather,
        setYelpBudget,
        setLocationAsString,
        setAdditionalNotes
    } : PartialStore = useStore();
    

    const arrOfReducers = [
        setNumberOfTravellers, 
        setInfoForWeather, 
        setYelpBudget,
        setLocationAsString,
        setAdditionalNotes
    ]
    
    
    const [answer, setAnswer] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log('this is what we get when we answer the question', typeof e.target.value, e.target.value)
        setAnswer(e.target.value);
    
    }

    const handleClick = ((boo: boolean, index: number) => {
        const newState = [...questionStates]
        let reducersToUse:any = [];

        // push the appropriate reducers to use
        if (index === 0) reducersToUse.push(setLocationAsString, setInfoForWeather)
        if (index === 1) reducersToUse.push(setInfoForWeather)
        if (index === 2) reducersToUse.push(setInfoForWeather)
        if (index === 3) reducersToUse.push(setNumberOfTravellers)
        if (index === 4) reducersToUse.push(setYelpBudget)
        if (index === 5) reducersToUse.push(setAdditionalNotes)

        if (!boo && el !== 0){
            newState[el] = false;
            setQuestionStates(newState);
        } else if (boo){
            // call the reducers to set the state, we have access to users inputs in answer

            

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
                        el === questionStates.length - 1 && <Link to={`/results`}><SubmitButton>
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
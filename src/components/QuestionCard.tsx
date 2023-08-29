import React, { ChangeEvent } from "react";
import { styled } from 'styled-components'
import { useState } from "react";
import { QuestionCardType } from "../../types";
import { Link } from "react-router-dom";
import { BaseButtonStyle } from "../GlobalStyles";

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
    border-radius:25px;
    background-color: ivory;
    width:auto;
    height:auto;
    padding:100px;
    margin:100px;
    text-align: center;
    justify-content: center;
`

const Buttons = styled.section`
    margin: 20px;
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
    const [answer, setAnswer] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value);
    }

    const handleClick = ((boo: boolean) => {
        const newState = [...questionStates]
        if (!boo && el !== 0){
            newState[el] = false;
            setQuestionStates(newState);
        } else if (boo){
            newState[el + 1] = true;
            setQuestionStates(newState);
            // THIS IS WHERE I LEFT OFF
            ref.current.scrollIntoView({
                behavior: 'smooth'
            })
        }

    })

    let inputField;

    if (type === 'number' && min){
        inputField = <input style={{width: '75%', height: '40px', border: 'solid', borderRadius: '20px', margin:'50px 0', fontSize: '20px', textAlign: 'center' }} type={type} min={min} max={max} onChange={handleChange} />
    } else {
        inputField = <input style={{width: '75%', height: '40px', border: 'solid', borderRadius: '20px', margin:'50px 0', fontSize: '20px', textAlign: 'center' }} type={type} onChange={handleChange}/>
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
                        !questionStates[el+1] && el < questionStates.length - 1 && <SubmitButton onClick={() => handleClick(true)}>
                            Submit
                        </SubmitButton>
                        }
                        {
                        el !== 0 && !questionStates[el + 1] && <BackButton onClick={() => handleClick(false)}>
                            Go Back
                        </BackButton>
                        }
                        {
                        el === questionStates.length - 1 && <Link to={`/results`}><SubmitButton>
                            Get your itinerary
                        </SubmitButton></Link>
                        } 
                    </Buttons>
                </Card>
            </CardContainer>
        </Wrapper>
    )
}

export default QuestionCard
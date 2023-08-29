import React, { ChangeEvent } from "react";
import { styled } from 'styled-components'
import { useState } from "react";
import { QuestionCardType } from "../../types";
import { Link } from "react-router-dom";



const Wrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    margin:20px;
`

const Card = styled.div`
    border:solid;
    border-radius:25px;
    background-color: red;
    width:50%;
    height:100%;
    padding:20px;
    text-align:center;
`

const Buttons = styled.section`
    background-color: blue;
    margin: 20px;
    display: flex;
    space-between: 10px;
    justify-content: center;
`

const IndividualButton = styled.section`
    margin: 10px;
`


const QuestionCard = ({question, type, el, setQuestionStates, questionStates, min, max}: QuestionCardType) => {
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
            setQuestionStates(newState)
        }

    })

    let inputField;

    if (type === 'number' && min){
        inputField = <input type={type} min={min} max={max} onChange={handleChange} />
    } else {
        inputField = <input type={type} onChange={handleChange}/>
    }

    return (
        <Wrapper>
            <Card>
                <div>
                    <h1>{question}</h1>
                        {inputField}
                    <br />
                    <Buttons>
                        <IndividualButton>
                            {!questionStates[el+1] && el < questionStates.length - 1 && <button onClick={() => handleClick(true)}>Submit</button>}
                        </IndividualButton>
                        <IndividualButton>
                            {el !== 0 && !questionStates[el + 1] && <button onClick={() => handleClick(false)}>Go Back</button>}
                        </IndividualButton>
                        <IndividualButton>
                            {el === questionStates.length - 1 && <Link to={`/results`}> <button>Get your itinerary</button></Link>}
                        </IndividualButton> 
                    </Buttons>
                </div>
            </Card>
        </Wrapper>
    )
}

export default QuestionCard
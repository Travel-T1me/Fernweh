import React, { useState } from 'react';
import QuestionCard from '../components/QuestionCard';
import { QuestionCardType } from '../../types'
import { styled } from 'styled-components'
// import useStore from '../store'

interface WrapperProps {
  $show?: boolean;
  $focus?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  background-color: transparent;
  opacity: ${props => (props.$show ? 1 : 0)};
  transition: color 1s, opacity 1s;
  color: ${props => (props.$focus ? "black": "transparent")};
  text-shadow: ${props => (props.$focus ? "0 0 0px" : "0 0 5px rgba(0,0,0,0.5)")};
`;


const Questionaire = () => {

  const [questionStates, setQuestionStates] = useState([true, false, false, false, false, false])

  const questionList = [
    {
      question: "What is your next destination?",
      type: 'text'
    },
    {
      question: "When do you want to arrive there?",
      type: 'date' 
    },
    {
      question: "When do you have to leave?",
      type: 'date'
    },
    {
      question: "How many people are going?",
      type:'number'
    },
    {
      question: "On a scale of 1 to 4, with 1 being frugal and 4 being lavish, what is your travel budget?",
      type:'number',
      min: "1",
      max: "4"
    },
    {
      question: "Anything else we should know? (example: It's my spouse's birthday during this trip.)",
      type:'text'
    }
  ]


  const questionComponents = questionList.map((obj, index) => (

      <Wrapper $show={questionStates[index]} $focus={!questionStates[index+1] || index === questionStates.length - 1}>
        <QuestionCard
        key={index} 
        el={index} 
        question={obj.question} 
        type={obj.type} 
        setQuestionStates={setQuestionStates}
        questionStates={questionStates}
        max={obj.max}
        min={obj.min} />
      </Wrapper>


  ))


  return (
    <>
      {questionComponents}
    </>
  )
}


export default Questionaire;

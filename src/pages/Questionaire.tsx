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

  const [questionStates, setQuestionStates] = useState([true, false, false, false])

  const questionList = [
    {
      question: "Departing City",
      type: 'text'
    },
    {
      question: "Where do you want to go?",
      type: 'text' 
    },
    {
      question: "How many adults are going?",
      type: 'number'
    },
    {
      question: "How many children are going?",
      type:'number'
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
        questionStates={questionStates} />
      </Wrapper>


  ))


  return (
    <>
      {questionComponents}
    </>
  )
}


export default Questionaire;

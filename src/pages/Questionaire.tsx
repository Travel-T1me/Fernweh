import React, { useState } from 'react';
import QuestionCard from '../components/QuestionCard';
import { QuestionCardType } from '../../types'
import { styled } from 'styled-components'

interface WrapperProps {
  $show?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  opacity: ${props => (props.$show ? 1 : 0)};
  transition: opacity 1s;
`;

const Questionaire = () => {

  const [currentQuestion, setCurrentQuestion] = useState(0);
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

      <Wrapper $show={questionStates[index]}>
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

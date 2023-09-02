import React, { useRef, useState, useEffect } from 'react';
import QuestionCard from '../components/QuestionCard';
import { QuestionCardType } from '../../types'
import { styled } from 'styled-components'
import NavBar from '../components/Navbar'
import axiosInstance from '../axiosInstance'

interface WrapperProps {
  $show?: boolean;
  $focus?: boolean;
}

const CardShadow = styled.div`
  display: inline-block;
  position: relative;
  height: 80%;

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(
      to right,
      rgb(102, 255, 255),
      rgb(0, 153, 153)
    );
    transform: translateY(120px) scale(0.75);
    filter: blur(16px);
  }
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: translateY(-5px) scale(1.02);
  }
`;

const Wrapper = styled.div<WrapperProps>`
  background-color: transparent;
  opacity: ${props => (props.$show ? 1 : 0)};
  transition: color 1s, opacity 1s;
  color: ${props => (props.$focus ? "black": "transparent")};
  text-shadow: ${props => (props.$focus ? "0 0 0px" : "0 0 5px rgba(0,0,0,0.5)")};
`;


const Questionnaire = () => {

  const questionList = [
    {
      question: "How many people are going on this trip?",
      type:'number'
    },    
    {
      question: "On a scale of 1 to 4, with 1 being frugal and 4 being lavish, what is your travel budget?",
      type:'select',
    },
    {
      question: "Where would you like to go?",
      type: 'location',
    },
    {
      question: "When do you want to arrive there?",
      type: 'date',
    },
    {
      question: "When do you have to leave?",
      type: 'date',
    },
    {
      question: "Anything else we should know? (example: It's my spouse's birthday during this trip.)",
      type:'text',
    }
  ];

  // Initialize questionStates so that only the first QuestionCard is initially displayed
  const initialQuestionStates = questionList.map((_, index) => index === 0);

  // dates come back as string in yyyy-mm-dd format
  const [questionStates, setQuestionStates] = useState([true, false, false, false, false, false])


  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  // const refsArray = questionList.map(() => useRef(0));

  const questionComponents = questionList.map((obj, index) => (
    <>
      <NavBar key={`${index}` + 'NavBar'} visible={true}/>

      <div style={{ display: 'flex', justifyContent: 'center' }}>

        <Wrapper key={`${index}` + 'Wrapper'} $show={questionStates[index]} $focus={!questionStates[index+1] || index === questionStates.length - 1}>
          <CardShadow>
            <QuestionCard
            // ref={refsArray[index]}
            key={index} 
            el={index} 
            question={obj.question} 
            type={obj.type} 
            setQuestionStates={setQuestionStates}
            questionStates={questionStates}
            />
          </CardShadow>
        </Wrapper>

      </div>
    </>



  ))


  return (
    <>
      {questionComponents}
    </>
  )
}


export default Questionnaire;

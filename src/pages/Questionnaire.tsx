import React, { useRef, useState, useEffect } from 'react';
import QuestionCard from '../components/QuestionCard';
import { QuestionCardType } from '../../types'
import { styled } from 'styled-components'
import Navbar from '../components/Navbar'
import axiosInstance from '../axiosInstance'


const QuestionnairePage = styled.div`
  display: flex;
  justify-content: center;
  background-color: hsl(180, 47%, 80%);
  height: 100vh;
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


  // Hook to verify when question cards have been answered
  const [questionStates, setQuestionStates] = useState([true, false, false, false, false, false])

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 

  const currentQuestion = questionList[currentQuestionIndex];

  
 
  
  // console.log(`Testing in Questionnaire component. questionStates: ${questionStates}`);
  // console.log(`Testing currentQuestionIndex: ${currentQuestionIndex}`);
  // console.log(`ALSO Testing currentQuestion: ${JSON.stringify(currentQuestion.question)}`);
  return (
    <>
      <QuestionnairePage>
        {/* This block of code will currently render two cards a time...Need to sync el prop with "currentQuestionIndex" or merge with key somehow. */}
        {/* {questionList.map((currentQuestion, index) => (
          <QuestionCard
          key={index} 
          el={index} 
          question={currentQuestion.question} 
          type={currentQuestion.type} 
          setQuestionStates={setQuestionStates}
          questionStates={questionStates}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          currentQuestionIndex={currentQuestionIndex}
        />
        ))} */}

        <QuestionCard
          key={currentQuestionIndex} 
          el={currentQuestionIndex} 
          question={currentQuestion.question} 
          type={currentQuestion.type} 
          setQuestionStates={setQuestionStates}
          questionStates={questionStates}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          currentQuestionIndex={currentQuestionIndex}
        />
        
      </QuestionnairePage>
    </>
  );
}


export default Questionnaire;

//opacity: ${props => (props.$show ? 1 : 0)};
    //transition: color 1s, opacity 1s ease-in-out;


// const isNavbarVisible = false;
 // Check why this property was needed within NavBar component: key={`${index}` + 'NavBar'}
  {/* <NavBar key={`${currentQuestionIndex}` + 'NavBar'} visible={true}/> */}
  {/* <Navbar visible={isNavbarVisible}/> */}

// interface WrapperProps {
//   $show?: boolean;
//   $focus?: boolean;
// }

// This component controls the visibility of the question card:
// const Wrapper = styled.div<WrapperProps>`
//   //opacity: ${props => (props.$show ? 1 : 0)};
//   //transition: color 1s, opacity 1s;
//   //color: ${props => (props.$focus ? "black": "transparent")};
//   //text-shadow: ${props => (props.$focus ? "0 0 0px" : "0 0 5px rgba(0,0,0,0.5)")};
// `;


// Commenting out card shadow for now since we won't need it. Needing to test other functionality first
// const CardShadow = styled.div`
//   display: inline-block;
//   position: relative;
//   height: 80%;

//   &::before {
//     content: "";
//     position: absolute;
//     z-index: -1;
//     top: 0;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     background: linear-gradient(
//       to right,
//       rgb(102, 255, 255),
//       rgb(0, 153, 153)
//     );
//     transform: translateY(120px) scale(0.75);
//     filter: blur(16px);
//   }
//   transition: transform 0.2s ease-in-out;
//   &:hover {
//     transform: translateY(-5px) scale(1.02);
//   }
// `;
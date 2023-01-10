import { useState } from "react";
import QuizBank from "./QuizBank";
import _ from "lodash";
import parse from "html-react-parser";
import AddID from "../helpers/AddId";
// import Modal from "react-modal";

const QuizHome = () => {

  // for modal to show result.
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // function openModal() {
  //   setModalIsOpen(true);
  // }
  // function closeModal() {
  //   setModalIsOpen(false);
  // }

  // for quiz

  const quizzes = AddID(QuizBank).results;
  const [index, setIndex] = useState(0);
  // const [score, setScore] = useState(0);



  // const handleAnswer = (answer) => {
  //   if (answer === quizzes[index].correct_answer) {
  //     setScore(score + 1);
  //   }
  // };


  
  const currentQuiz = quizzes[index];
  
  const answers = [
    currentQuiz.correct_answer,
    ...currentQuiz.incorrect_answers,
  ];
  const shuffledAnswers = _.shuffle(answers);


  function handleNextQuestion() {
    setIndex(index + 1);
  }
  

  function submitQuiz() {
    console.log("Quiz Submitted");
    // openModal();
  }
  return (
    <div>
      <div></div>
      <h1>Quiz Home</h1>
      {/* <p>
        {score}
      </p> */}
      <div>
        <p>
          Question {currentQuiz.id} of {quizzes.length}
        </p>
        <h2>{parse(currentQuiz.question)}</h2>
        {currentQuiz.id === quizzes.length ? (
          <button onClick={submitQuiz}>Finish</button>
        ) : (
          <button
            onClick={() => {
              handleNextQuestion();
            }}
          >
            Next Question
          </button>
        )}

{/* Show options */}
        <div>
          {shuffledAnswers.map((answer, index) => {
            return (
              <button
                key={index}
             
              >
                {parse(answer)}
              </button>
            );
          })}
        </div>

        {/* Modal to show results */}
        {/* <Modal isOpen={modalIsOpen}>
          <h2>
            Your score is {score} out of {quizzes.length}
          </h2>
          <button onClick={closeModal}>Close</button>
        </Modal> */}

        
      </div>
    </div>
  );
};

export default QuizHome;

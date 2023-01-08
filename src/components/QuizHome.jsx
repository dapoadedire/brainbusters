import { useState } from "react";
import QuizBank from "./QuizBank";
import _ from "lodash";
import parse from "html-react-parser";
import AddID from "../helpers/AddId";


const QuizHome = () => {

  const quizzes = AddID(QuizBank).results;
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (answer) => {
    if (answer === quizzes[index].correct_answer) {
      setScore(score + 1);
    }
  };
  
  
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
   alert(`Your score is ${score} out of ${quizzes.length}`);
  }
  return (
    <div>
      <div>
      
     
      </div>
      <h1>Quiz Home</h1>
      <div>
        <p>
          Question {currentQuiz.id} of {quizzes.length}
        </p>
        <h2>{
          parse(currentQuiz.question)
          }</h2>
        {
          currentQuiz.id === quizzes.length ? (
            <button onClick={submitQuiz}>Finish</button>
          ) : (
            <button onClick={handleNextQuestion}>Next Question</button>
          )
        }

        <div>
          {shuffledAnswers.map((answer, index) => {
            return <button key={index}
            onClick={() => handleAnswer(answer)}
            >{answer}</button>;
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizHome;

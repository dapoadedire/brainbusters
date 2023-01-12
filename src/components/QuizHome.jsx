import { useState } from "react";
import QuizBank from "./QuizBank";
import _ from "lodash";
import parse from "html-react-parser";
import AddID from "../helpers/AddId";
import OptionButtons from "./OptionButtons";

const QuizHome = () => {
  const quizzes = AddID(QuizBank).results;
  const [index, setIndex] = useState(0);
  const currentQuiz = quizzes[index];

  function handleOptionClick(answer) {
    console.log("Answer selected: ", answer);
  }

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
  }

  return (
    <div>
      <div></div>
      <h1>Quiz Home</h1>

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

        <div>
          <OptionButtons
            shuffledAnswers={shuffledAnswers}
            handleOptionClick={handleOptionClick}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizHome;

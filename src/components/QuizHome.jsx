import { useState } from "react";
import QuizBank from "./QuizBank";
import _ from "lodash";
// import parse from "html-react-parser";

const quizzes = QuizBank.results.map((question, index) => {
  question.id = index + 1;
  question.all_options = _.shuffle([
    question.correct_answer,
    ...question.incorrect_answers,
  ]);
  return question;
});

const QuizHome = () => {
  const [activeQuiz, setActiveQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const currentQuiz = quizzes[activeQuiz];
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false)

  function nextQuiz() {
    setSelected(null);
    if (activeQuiz !== quizzes.length - 1){
      setActiveQuiz((p) => p + 1);
    }
    else{
      setActiveQuiz(0)
      setShowResult(true);
    }
  }

  const {
    category,
    type,
    difficulty,
    question,
    correct_answer,
    id,
    all_options,
  } = currentQuiz;

  console.log(activeQuiz, quizzes.length);
  const gradeAnswer = (answer, index) => {
    setSelected(index);
    if (answer === correct_answer) {
      setScore((x) => x + 1);

      console.log("right");
    } else {
      setScore((x) => x + 0);

      console.log("wrong");
    }
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  return (
 <div className="container">
  {!showResult ? (
        <div>
          <p>Score: {score}</p>
          <p>
            Question {addLeadingZero(id)} of {addLeadingZero(quizzes.length)}
          </p>
          <p>Category: {category}</p>
          <p>Type: {type}</p>
          <p>Difficulty: {difficulty}</p>

          <h2>Question: {question}</h2>

          <div>
            {all_options.map((option, index) => (
              <button key={index} onClick={() => gradeAnswer(option, index)}
                className={`${selected === index ? 'bg-blue-500 text-white' : ''}`}
              >
                {option}
              </button>
            ))}
          </div>
          <button onClick={nextQuiz} disabled={selected === null} className="bg-red-500 p-5 disabled:bg-red-300">
            {activeQuiz === quizzes.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
  ): (
    <div>
            <h3>Result</h3>
            <p>
              Total Question: <span>{quizzes.length}</span>
            </p>
            <p>
              Total Score:<span> {score}</span>
            </p>
    </div>
  )}
 </div>
  );
};

export default QuizHome;

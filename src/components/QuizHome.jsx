import { useState } from "react";
// import QuizBank from "./QuizBank";
// import _ from "lodash";
import ctl from "@netlify/classnames-template-literals";
import parse from "html-react-parser";
//  "html-react-parser": "^3.0.7",

// const quiz = QuizBank.results.map((question, index) => {
//   question.id = index + 1;
//   question.all_options = _.shuffle([
//     question.correct_answer,
//     ...question.incorrect_answers,
//   ]);
//   return question;
// });

const QuizHome = (quizzes) => {
  const quiz = quizzes.quizzes;
  console.log(quiz);
  const [activeQuiz, setActiveQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const currentQuiz = quiz[activeQuiz];
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  function nextQuiz() {
    setSelected(null);
    if (activeQuiz !== quiz.length - 1) {
      setActiveQuiz((p) => p + 1);
    } else {
      setActiveQuiz(0);
      setShowResult(true);
    }
  }

  const { category, difficulty, question, correct_answer, id, all_options } =
    currentQuiz;

  console.log(activeQuiz, quiz.length);
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
    <main className={mainStyles}>
      <div>
        <h2 className={titleStyles}>BrainBusters &#x1F913;</h2>
      </div>

      <div className={containerStyles}>
        {!showResult ? (
          <div className={quizContainerStyles}>
            <div className={topInfoStyles}>
              <p className={quizNoStyles}>
                {addLeadingZero(id)}/
                <span className="font-bold text-blue-900">
                  {addLeadingZero(quiz.length)}
                </span>
              </p>

              <p className={difficultyStyles}>{difficulty}</p>
            </div>
            <p className={categoryStyles}>{category}</p>
            <p className={questionStyles}>{parse(question)}</p>

            <div className={buttonContainerStyles}>
              {all_options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => gradeAnswer(option, index)}
                  className={
                    optionsButtonStyles +
                    " " +
                    (selected === index
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black")
                  }
                >
                  {parse(option)}
                </button>
              ))}
            </div>
            <button
              onClick={nextQuiz}
              disabled={selected === null}
              className={nextButtonStyles}
            >
              {activeQuiz === quiz.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        ) : (
          <div className={resutlContainerStyles}>
            <h3 className={resutlTitleStyles}>Result</h3>
            <p className={resutlTotalQuestionStyles}>
              Total Question: <span>{quiz.length}</span>
            </p>
            <p className={resutlTotalScoreStyles}>
              Total Score:<span> {score}</span>
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

const mainStyles = ctl(`
  flex
  min-h-screen
  flex-col
  items-center
  justify-center
bg-gradient-to-t from-gray-700 via-gray-900 to-black
  px-5
  py-10	
`);

const buttonContainerStyles = ctl(`
  mt-5
  flex
  flex-col
  items-start
  gap-5
`);

const nextButtonStyles = ctl(`
  mt-5
  rounded
  bg-blue-500
  py-2
  px-5
  text-white
  disabled:cursor-not-allowed
  disabled:opacity-50
  
`);

const optionsButtonStyles = ctl(`
  w-full
  rounded-lg
  
  py-3
  
  hover:bg-blue-400
  hover:text-white
  
`);

const questionStyles = ctl(`
  mt-5
  mb-10
  rounded-lg
  bg-gray-200
  p-3
  text-center
  text-4xl
  font-normal
  text-black

`);

const categoryStyles = ctl(`
  mt-5
   mb-10
  rounded-lg
  border
  border-gray-400
  p-2
  text-lg

`);

const difficultyStyles = ctl(`
  mt-5
  rounded-lg
   border
  border-gray-400
  p-2
  text-lg
 
`);

const quizNoStyles = ctl(`
  mt-5
  rounded-lg
     border
  border-gray-400
  
  p-2
  text-lg
`);

const quizContainerStyles = ctl(`
  rounded-lg
  bg-white
  p-5
  shadow-lg
`);

const resutlContainerStyles = ctl(`
  rounded-lg
  bg-white
  p-5
  shadow-lg
`);

const resutlTitleStyles = ctl(`
  text-center
  text-2xl
  font-bold
`);

const resutlTotalQuestionStyles = ctl(`
  mt-5
  text-center
  text-lg
  font-bold
`);

const resutlTotalScoreStyles = ctl(`

  mt-5
  text-center
  text-lg
  font-bold
`);

const containerStyles = ctl(`
  w-full
  md:w-3/4
  lg:w-1/2
  `);

const topInfoStyles = ctl(`
  flex
  items-center
  justify-between
  
`);

const titleStyles = ctl(`
  mb-10
  text-5xl
  font-bold
  text-white
`);

export default QuizHome;

import { useState } from "react";
import ctl from "@netlify/classnames-template-literals";
import parse from "html-react-parser";

const QuizHome = (quizzes) => {
  const quiz = quizzes.quizzes;
  console.log(quiz);
  const [activeQuiz, setActiveQuiz] = useState(0);
  const [score, setScore] = useState(0);

  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const nextQuiz = () => {
    setSelected(null);
    if (activeQuiz !== quiz.length - 1) {
      setActiveQuiz((p) => p + 1);
    } else {
      setActiveQuiz(0);
      setShowResult(true);
    }
  };
  const currentQuiz = quiz[activeQuiz];
  const { category, difficulty, question, correct_answer, id, all_options } =
    currentQuiz;
  const gradeAnswer = (answer, index) => {
    setSelected(index);
    if (answer === correct_answer) {
      setScore((x) => x + 1);
    } else {
      setScore((x) => x + 0);
    }
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  return (
   <>
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
   </>
  );
};



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


const topInfoStyles = ctl(`
  flex
  items-center
  justify-between
  
`);

export default QuizHome;

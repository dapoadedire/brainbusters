import FetchQuiz from "../helpers/FetchQuiz";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import QuizHome from "./QuizBox";
import _ from "lodash";
import ctl from "@netlify/classnames-template-literals";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGithub,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const Quiz = () => {
  const [requestParams, setRequestParams] = useState({
    amount: 10,
    category: 9,
    difficulty: "easy",
  });

  const { isLoading, isSuccess, error, data } = useQuery(
    ["quiz", requestParams],
    FetchQuiz
  );

  if (isSuccess) {
    const quizzes = data.results.map((question, index) => {
      question.id = index + 1;
      question.all_options = _.shuffle([
        question.correct_answer,
        ...question.incorrect_answers,
      ]);
      return question;
    });

    console.log(quizzes);
  }

  return (

    <>
      <header className={headerStyles}>
        <h2 className={titleStyles}>BrainBusters</h2>
      </header>
      <main>
        <section className={formSectionStyles}>


          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const obj = {
                amount: formData.get("amount") ?? "",
                category: formData.get("category") ?? "",
                difficulty: formData.get("difficulty") ?? "",
              };
              setRequestParams(obj);
            }}
            className={formStyles}
          >
            <label htmlFor="amount" 
            className={amountLabelStyles}
            >
              Amount
              <select id="amount" name="amount"
              className={amountInputStyles}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
            </label>

            <label htmlFor="category"
            className={categoryLabelStyles}
            >
              Category
              <select id="category" name="category"
              className={categoryInputStyles}
              >
                <option value="9">General Knowledge</option>
                <option value="10">Entertainment: Books</option>
                <option value="11">Entertainment: Film</option>
                <option value="12">Entertainment: Music</option>
                <option value="13">Entertainment: Musicals & Theatres</option>
                <option value="14">Entertainment: Television</option>
                <option value="15">Entertainment: Video Games</option>
                <option value="16">Entertainment: Board Games</option>
                <option value="17">Science & Nature</option>
                <option value="18">Science: Computers</option>
                <option value="19">Science: Mathematics</option>
                <option value="20">Mythology</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="24">Politics</option>
                <option value="25">Art</option>
                <option value="26">Celebrities</option>
                <option value="27">Animals</option>
                <option value="28">Vehicles</option>
                <option value="29">Entertainment: Comics</option>
                <option value="30">Science: Gadgets</option>
                <option value="31">Entertainment: Japanese Anime & Manga</option>
                <option value="32">Entertainment: Cartoon & Animations</option>
              </select>
            </label>

            <label htmlFor="difficulty"
            className={difficultyLabelStyles}
            >
              Difficulty
              <select id="difficulty" 
              name="difficulty"
              className={difficultyInputStyles}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>

            <button
            type="submit"
            className={submitButtonStyles}
            >Submit</button>
          </form>
        </section>
        <section className={quizSectionStyles}>
          {isSuccess && (
         
              <QuizHome
                quizzes={data.results.map((question, index) => {
                  question.id = index + 1;
                  question.all_options = _.shuffle([
                    question.correct_answer,
                    ...question.incorrect_answers,
                  ]);
                  return question;
                })}
              />

           
          )}
          {isLoading && (
            // <div>Loading...</div>

            <div className="flex">
              <div className="relative">

                <div className="absolute h-12 w-12 rounded-full
                            border-8 border-solid border-gray-200"></div>


                <div className="absolute h-12 w-12 animate-spin rounded-full
                            border-8 border-solid border-purple-500 border-t-transparent"></div>
              </div>
            </div>
             
          )}
      {error && (
        <div>Error</div>
      )
      }
    </section>



      </main >
      <footer>
        <footer className={footerStyles}> 
          <p>
          
            <a href="https://www.google.com/search?q=dapo+adedire&oq=dapo+adedire" target="_blank" rel="noreferrer">
              Built by Dapo Adedire
            </a>
          </p>
          <ul className={socialIconStyles}>
            <li>
              <a href="https://www.linkedin.com/in/dapoadedire/" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </li>
            <li>
              <a href="https://www.github.com/dapoadedire" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com/dapo_adedire" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
          </ul>
        </footer>
      </footer>
    </>
  );
};

const titleStyles = ctl(`
  text-5xl
  font-bold
  text-white
`);

const headerStyles = ctl(`
flex
justify-center
bg-purple-500
p-10
`)

const formSectionStyles = ctl(`
mx-1
my-4
flex
justify-center

`)


const formStyles = ctl(`
my-10
flex w-11/12
max-w-2xl
flex-col
gap-4
rounded-md
border
border-gray-400
p-4

`)


const amountLabelStyles = ctl(`
flex
flex-col
`)

const amountInputStyles = ctl(`
rounded-md
border
border-gray-400
p-2
`)
const categoryLabelStyles = ctl(`
flex
flex-col
`)
const categoryInputStyles = ctl(`
rounded-md
border
border-gray-400
p-2
`)
const difficultyLabelStyles = ctl(`

flex
flex-col
`)
const difficultyInputStyles = ctl(`
rounded-md
border
border-gray-400
p-2
focus:border-purple-500
`)

const submitButtonStyles = ctl(`
rounded-md
bg-purple-500
p-2
text-white
hover:bg-purple-600
hover:text-gray-100
`)

const quizSectionStyles = ctl(`
m-4
flex
justify-center
`)


const footerStyles = ctl(`
flex
flex-col
items-center
justify-center
bg-purple-500
p-4
text-white


`)

const socialIconStyles = ctl(`
flex
gap-4
`)



export default Quiz;

import FetchQuiz from "../helpers/FetchQuiz";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import QuizHome from "./QuizBox";
import _ from "lodash";
import ctl from "@netlify/classnames-template-literals";

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
      <header>
        <h2 className={titleStyles}>BrainBusters &#x1F913;</h2>
      </header>
      <main>
        <section>


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
          >
            <label htmlFor="amount">
              Amount
              <select id="amount" name="amount">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
            </label>

            <label htmlFor="category">
              Category
              <select id="category" name="category">
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

            <label htmlFor="difficulty">
              Difficulty
              <select id="difficulty" name="difficulty">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>

            <button>Submit</button>
          </form>
        </section>
        <section>
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
        <p>Created by Dapo Addedire</p>
      </footer>
    </>
  );
};

const titleStyles = ctl(`
  mb-10
  text-5xl
  font-bold
`);

export default Quiz;

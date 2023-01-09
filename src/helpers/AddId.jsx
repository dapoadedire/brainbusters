import _ from "lodash";

const AddID = (data) => {
  const shuffledQuestions = _.shuffle(data.results);
  shuffledQuestions.forEach((question, index) => {
    question.id = index + 1;
  });
  return {
    results: shuffledQuestions,
  };
};

export default AddID;

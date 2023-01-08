const AddID = (data) => {
  data.results.forEach((question, index) => {
    question.id = index + 1;
  });
  return data;
};

export default AddID;

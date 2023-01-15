const QuizBank = {
  response_code: 0,
  results: [
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "How many kilobytes in one gigabyte (in decimal)?",
      correct_answer: "1000000",
      incorrect_answers: ["1024", "1000", "1048576"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "On Twitter, what was the original character limit for a Tweet?",
      correct_answer: "140",
      incorrect_answers: ["120", "160", "100"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "Which programming language shares its name with an island in Indonesia?",
      correct_answer: "Java",
      incorrect_answers: ["Python", "C", "Jakarta"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "What language does Node.js use?",
      correct_answer: "JavaScript",
      incorrect_answers: ["Java", "Java Source", "Joomla Source Code"],
    },
  ],
};

// add id to each question

export default QuizBank;

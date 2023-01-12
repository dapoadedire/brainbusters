import parse from "html-react-parser";
import React from "react";

const OptionButtons = ({ shuffledAnswers, handleOptionClick }) => {
  return (
    <div>
      {shuffledAnswers.map((answer, index) => {
        return (
          <button key={index} onClick={() => handleOptionClick(answer)}>
            {parse(answer)}
          </button>
        );
      })}
    </div>
  );
};

export default OptionButtons;

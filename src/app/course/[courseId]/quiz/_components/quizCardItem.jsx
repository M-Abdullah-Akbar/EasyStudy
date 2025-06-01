
import React, { useState } from "react";

function QuizCardItem({ quiz, userSelectedOption }) {
  const [selectedOption, setSelectedOption] = useState();
  return (
    quiz && (
      <div className="mt-5 p-3">
        <h2 className="font-medium text-xl text-center">
          {quiz?.questionText}
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-5">
          {quiz?.options.map((option, index) => (
            <h2
              key={index}
              onClick={() => {
                setSelectedOption(option);
                userSelectedOption(option);
              }}
              className={`cursor-pointer border rounded-full w-full p-2 text-center hover:bg-primary hover:text-white ${
                selectedOption == option && "bg-primary text-white"
              }`}
            >
              {option}
            </h2>
          ))}
        </div>
      </div>
    )
  );
}

export default QuizCardItem;

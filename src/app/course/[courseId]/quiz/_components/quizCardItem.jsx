import React, { useState, useEffect } from "react";
function QuizCardItem({ quiz, userSelectedOption, selectedAnswer }) {
  const [selectedOption, setSelectedOption] = useState(selectedAnswer);
  const [isAnswered, setIsAnswered] = useState(false);
  useEffect(() => {
    setSelectedOption(selectedAnswer);
    setIsAnswered(!!selectedAnswer);
  }, [selectedAnswer]);
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
                if (!isAnswered) {
                  setSelectedOption(option);
                  userSelectedOption(option);
                  setIsAnswered(true);
                }
              }}
              className={`cursor-pointer border rounded-full w-full p-2 text-center hover:bg-primary hover:text-white ${
                selectedOption === option && "bg-primary text-white"
              } ${
                isAnswered && option === quiz.correctAnswer && "border-2 border-green-500"
              } ${
                isAnswered && selectedOption === option && option !== quiz.correctAnswer && "border-2 border-red-500"
              }`}
            >
              {option}
            </h2>
          ))}
        </div>
        {isAnswered && (
          <div className={`mt-3 p-3 rounded-lg text-center ${
            selectedOption === quiz.correctAnswer 
              ? 'bg-green-100 text-green-700 border border-green-300' 
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}>
            <p className="font-medium">
              {selectedOption === quiz.correctAnswer 
                ? '✓ Your answer was correct!' 
                : '✗ Your answer was incorrect'}
            </p>
            <p className="text-sm mt-1">
              Correct answer: {quiz.correctAnswer}
            </p>
          </div>
        )}
      </div>
    )
  );
}

export default QuizCardItem;

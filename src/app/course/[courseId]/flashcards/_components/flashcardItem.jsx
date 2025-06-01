import React from "react";
import ReactCardFlip from "react-card-flip";
function FlashcardItem({isFlipped, handleClick, flashcard}) {
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">    
      <div className="p-4 bg-primary text-white flex items-center justify-center h-[250px] w-[200px] cursor-pointer rounded-lg shadow-lg md:h-[350px] md:w-[300px]" onClick={handleClick}>
        <h2>{flashcard.front}</h2>
      </div>

      <div className="p-4 bg-white text-primary flex items-center justify-center h-[250px] w-[200px] cursor-pointer rounded-lg shadow-lg md:h-[350px] md:w-[300px]" onClick={handleClick}>
        <h2 className="">{flashcard.back}</h2>
      </div>
    </ReactCardFlip>
  );
}

export default FlashcardItem;

import React from "react";

function ChapterList({course}) {
    const chaptersList = course?.courseLayout?.Chapters
  return (
    <div className="mt-5">
      <h2 className="text-xl font-medium">Chapters</h2>
      <div className="mt-3">
        {chaptersList?.map((chapter, index) => (
          <div key={index} className="flex gap-5 items-center p-4 border shadow-md mb-2 rounded-lg cursor-pointer">
            <h2 className="text-2xl">{chapter?.Emoji}</h2>
            <div>
                <h2 className="font-medium">{chapter?.ChapterTitle}</h2>
                <p className="text-gray-400 text-sm">{chapter?.Summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterList;
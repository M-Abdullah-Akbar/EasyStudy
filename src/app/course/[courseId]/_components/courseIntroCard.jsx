import Image from "next/image";
import React from "react";

function CourseIntroCard({ course }) {
  return (
    <div className="p-10 border shadow-md rounded-lg flex items-center gap-5">
      <Image
        src={"/Knowledge.png"}
        alt="Course Image"
        width={100}
        height={100}
      />
      <div className="flex-1">
        <h2 className="text-2xl font-bold">
          {course?.courseLayout?.CourseTitle}
        </h2>
        <p className="text-gray-600 mt-2">{course?.courseLayout?.Summary}</p>
        
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">Type:</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium">
              {course?.courseType || 'N/A'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">Topic:</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-sm font-medium">
              {course?.topic || 'N/A'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">Difficulty:</span>
            <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-md text-sm font-medium">
              {course?.difficultyLevel || 'N/A'}
            </span>
          </div>
        </div>
        
        {
          //<Progress className="mt-3"/>
        }
        <h2 className="mt-3 text-lg">
          Total Chapters: {course?.courseLayout?.Chapters?.length || 0}
        </h2>
      </div>
    </div>
  );
}

export default CourseIntroCard;
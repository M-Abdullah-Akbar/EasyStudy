import { Progress } from "@/components/ui/progress";
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
      <div>
        <h2 className="text-2xl font-bold">
          {course?.courseLayout?.CourseTitle}
        </h2>
        <p>{course?.courseLayout?.Summary}</p>
        {
          //<Progress className="mt-3"/>
        }
        <h2 className="mt-3 text-lg">
          Total Chapters: {course?.courseLayout?.Chapters.length}
        </h2>
      </div>
    </div>
  );
}

export default CourseIntroCard;
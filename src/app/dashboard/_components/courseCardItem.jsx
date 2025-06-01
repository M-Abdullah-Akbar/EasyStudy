import React from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import Link from "next/link";
function CourseCardItem({ course }) {
  return (
    <div className="w-full bg-white shadow-md rounded-lg p-5">
      <div>
        <div className="w-full flex items-center justify-between ">
            <Image src={'/Knowledge.png'} alt="Course Image" width={100} height={100} />
            <h2 className="text-sm p-1 px-2 rounded-full bg-black text-amber-50">{course.createdAt}</h2>
        </div>
        <h2 className="text-lg font-medium mt-2">{course.courseLayout.CourseTitle}</h2>
        <p className="text-xs line-clamp-2 text-gray-500 mt-2">{course.courseLayout.Summary}</p>
      </div>
      <div className="mt-4">
        <Progress value={50}/>
      </div>
      <div className="mt-4">
        {course?.status == "Generating" ? 
    <h2 className="flex gap-2 items-center justify-self-center font-bold rounded-xl"><RefreshCw h={5} w={5} className="animate-spin"/>Generating.....</h2>
        :<Link href={"/course/" + course.courseId}>
          <Button variant="outline" className="w-full cursor-pointer">View</Button>
        </Link>
        }
      </div>
    </div>
  );
}

export default CourseCardItem;

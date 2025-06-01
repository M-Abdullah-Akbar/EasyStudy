"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseIntroCard from "./_components/courseIntroCard";
import StudyMaterialSection from "./_components/studyMaterialSection";
import ChapterList from "./_components/chapterList";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  useEffect(() => {
    getCourse();
  }, []);
  const getCourse = async () => {
    const resp = await axios.get("/api/courses?courseId=" + courseId);
    setCourse(resp.data.result);
  };
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex justify-end mt-4 mb-4">
          <Link href="/dashboard">
            <Button variant="outline" className="cursor-pointer">Go to Dashboard</Button>
          </Link>
        </div>
        <CourseIntroCard course={course} />
        <StudyMaterialSection courseId={courseId} course={course} />
        <ChapterList course={course} />
      </div>
    </div>
  );
}

export default Course;

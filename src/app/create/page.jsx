"use client";
import React, { useState, useEffect } from "react";
import SelectionOptions from "./_components/selectionOptions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import TopicInput from "./_components/topicInput";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

function Create() {
  const [step, setStep] = useState(0);
  const [studyMaterial, setStudyMaterial] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    user && getUserDetails();
  }, [user]);

  useEffect(() => {
    console.log(studyMaterial);
  }, [studyMaterial]);

  const getUserDetails = async () => {
    const result = await db.select().from(usersTable).where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress));
    setUserDetails(result[0]);
  };

  const handleUserInput = (fieldName, fieldValue) => {
    setStudyMaterial((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  // used to save user input and generate course layout using ai
  const generateCourseOutline = async() => {
    // Validate required fields
    if (!studyMaterial.studyType || !studyMaterial.topic || !studyMaterial.difficultyLevel) {
      toast.error("Please fill in all required fields: Study Type, Topic, and Difficulty Level");
      return;
    }

    // Check if user has reached course limit
    if (!userDetails?.isMember && userDetails?.totalCourses >= 5) {
      toast.error("You have reached the maximum limit of 5 courses. Please upgrade to create more courses.");
      router.push("/dashboard/upgrade");
      return;
    }

    const courseId = uuidv4();
    const creationDate = new Date();
    setLoading(true);

    try {
      // 1. Start the generation process
      await axios.post("/api/generate-course-outline", {
          courseId: courseId,
          ...studyMaterial,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: creationDate
      });

      // 2. Poll for completion status
      let pollCount = 0;
      const maxPolls = 30; // 2.5 minutes maximum (30 * 5 seconds) - only notes generation
      
      const pollInterval = setInterval(async () => {
        pollCount++;
        
        // Timeout after 2.5 minutes
        if (pollCount > maxPolls) {
          clearInterval(pollInterval);
          setLoading(false);
          toast.error("Course generation is taking longer than expected. Please check the dashboard later.");
          router.push("/dashboard");
          return;
        }
        
        try {
          const statusCheck = await axios.get(`/api/courses?courseId=${courseId}`);
          const course = statusCheck.data.result;

          if (course && course.status === "Ready") {
            clearInterval(pollInterval);
            console.log("Course is ready! Redirecting...");
            toast.success("Your course is ready to view!");
            setLoading(false);
            router.push("/dashboard");
          } else {
            console.log(`Course is still generating... (${pollCount}/${maxPolls})`);
          }
        } catch (error) {
          console.error("Error checking course status:", error);
          // Stop polling on error to prevent infinite loops
          clearInterval(pollInterval);
          setLoading(false);
          toast.error("Something went wrong while tracking course progress. Please check the dashboard later.");
        }
      }, 5000); // Check every 5 seconds

    } catch (error) {
      setLoading(false);
      if (error.response?.status === 403) {
        toast.error(error.response.data.error);
        router.push("/dashboard/upgrade");
      } else {
        toast.error("Failed to start course creation. Please try again.");
      }
    }
    // Note: setLoading(false) is handled inside the polling logic or in the catch block
  }
  return (
    <div className="flex flex-col items-center mt-20 p-5 md:px-24 lg:px-36 ">
      <h2 className="text-3xl font-bold">Create a new study material</h2>
      <p className="text-gray-500 mt-2">
        Create a new study material by filling out the form below.
      </p>
      <div className="w-full mt-5">
        {step === 0 ? <SelectionOptions selectedStudyType= { (value) => handleUserInput('studyType', value) }/> : <TopicInput setTopic={(value) => handleUserInput('topic' ,value)} setDifficulty={(value)=> handleUserInput('difficultyLevel', value)} />}
      </div>
      <div className='flex justify-between w-full mt-12'>
        { step !== 0 && <Button className={"cursor-pointer"} variant="outline" onClick = {() => setStep(step - 1)}>Previous</Button>}
        { step == 0 ? <Button className={"cursor-pointer"} onClick = {() => setStep(step + 1)}>Next</Button> : <Button onClick={generateCourseOutline} className={"cursor-pointer"} disabled={loading}>{loading ? <Loader className="animate-spin"></Loader> : "Generate"}</Button>}
      </div>
    </div>
  );
}

export default Create;

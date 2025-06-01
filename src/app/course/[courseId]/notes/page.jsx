"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function ViewNotes() {
  const { courseId } = useParams();
  const [notes, setNotes] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "notes",
      });
      console.log(res?.data);
      setNotes(res?.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className='flex flex-col items-center mb-8'>
          <h2 className="font-bold text-2xl">Notes</h2>
        </div>
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (!notes.length) {
    return (
      <div className="container mx-auto py-8">
        <div className='flex flex-col items-center mb-8'>
          <h2 className="font-bold text-2xl">Notes</h2>
        </div>
        <p className="text-center text-gray-500">No notes available</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-5">
        {stepCount !== 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStepCount(stepCount - 1)}
            className={"cursor-pointer"}
          >
            Previous
          </Button>
        )}
        {notes?.map((note, index) => (
          <div
            key={index}
            className={`w-full h-2 rounded-full ${
              index < stepCount ? "bg-primary" : "bg-gray-200"
            }`}
          ></div>
        ))}
        <Button
          variant="outline"
          size="sm"
          className={"cursor-pointer"}
          onClick={() => setStepCount(stepCount + 1)}
        >
          Next
        </Button>
      </div>
      <div className="mt-5">
        <div
          dangerouslySetInnerHTML={{ __html: (notes[stepCount]?.notes.replace('```html', '')) } }
        ></div>
        {notes?.length == stepCount && <div className="mt-5 flex flex-col items-center gap-5">
          <h2 className="text-2xl font-bold">Congratulations</h2>
          <h2 className="text-2xl font-bold">End of Notes</h2>
          <Button variant="outline" className={"cursor-pointer"} onClick={() => route.back()}>Go To Course</Button>
          </div>}
      </div>
    </div>
  );
}

export default ViewNotes;

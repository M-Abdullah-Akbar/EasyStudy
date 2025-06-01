"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { RefreshCw } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


function ViewNotes() {
  const { courseId } = useParams();
  const [notes, setNotes] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getNotes();
  }, []);
  const getNotes = async () => {
    setLoading(true);
    const res = await axios.post("/api/study-type", {
      courseId: courseId,
      studyType: "notes",
    });
    setLoading(false);
    console.log(res?.data);
    setNotes(res?.data);
  };
  return (
    loading == false ?notes.length>2 && (
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
    ): <div className="w-full p-5 animate-pulse flex justify-center items-center">
      <RefreshCw className="animate-spin"/> Loading...
    </div>
  );
}

export default ViewNotes;

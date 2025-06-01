import { Button } from "@/components/ui/button";
import axios from "axios";
import { RefreshCcw, RefreshCw } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

function MaterialCardItem({ item, studyTypeContent, course, refreshData }) {
  const [loading, setLoading] = useState(false);
  const generateContent = async () => {
    toast("Generating content...");
    setLoading(true);
    let chapters = "";
    course?.courseLayout.Chapters.forEach((chapter) => {
      chapters = chapter.ChapterTitle + "," + chapters;
    });

    const res = await axios.post("/api/generate-study-type-content", {
      courseId: course?.courseId,
      type: item.name,
      chapters: chapters,
    });
    setLoading(false);
    refreshData(true);
    toast("Your Content is ready to View");
  };
  const isNotes = item.type === "notes";
  const isReady = isNotes
    ? Array.isArray(studyTypeContent?.notes) && studyTypeContent.notes.length > 0
    : studyTypeContent?.[item.type] && studyTypeContent[item.type].status === "Ready";
  return (
    <Link href={`/course/${course?.courseId}/${item.path}`}>
      <div
        className={`border shadow-md rounded-lg p-5 flex flex-col items-center ${
          !isReady && "grayscale"
        }`}
      >
        {!isReady ? (
          <h2 className="p-1 px-2 bg-gray-500 text-white rounded-full text-[10px] mb-2">
            Generate
          </h2>
        ) : (
          <h2 className="p-1 px-2 bg-green-500 text-white rounded-full text-[10px] mb-2">
            Ready
          </h2>
        )}
        <Image src={item.icon} alt={item.name} width={70} height={70} />
        <h2 className="font-medium mt-3">{item.name}</h2>
        <p className="text-gray-400 text-sm text-center">{item.desc}</p>
        {!isReady ? (
          <Button
            className="mt-3 cursor-pointer w-full"
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              generateContent();
            }}
          >
            {loading && <RefreshCcw className="animate-spin" />}Generate
          </Button>
        ) : (
          <Button className="mt-3 cursor-pointer w-full" variant="outline">
            View
          </Button>
        )}
      </div>
    </Link>
  );
}

export default MaterialCardItem;

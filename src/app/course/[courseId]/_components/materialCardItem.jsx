import { Button } from "@/components/ui/button";
import axios from "axios";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";

function MaterialCardItem({ item, studyTypeContent, course, refreshData }) {
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [generatedContentId, setGeneratedContentId] = useState(null);

  useEffect(() => {
    const content = studyTypeContent?.[item.type];
    if (content?.status === "Ready") {
      setIsReady(true);
      setLoading(false);
    } else if (content?.status === "Generating") {
      setLoading(true);
      // If content is already generating, start polling
      if (content.id) {
        pollForCompletion(content.id);
      }
    }
  }, [studyTypeContent, item.type]);

  const generateContent = async () => {
    toast("Your content is generating...");
    setLoading(true);
    const chapters = course?.courseLayout.Chapters.map(c => c.title).join(", ");

    try {
      const response = await axios.post("/api/generate-study-type-content", {
        courseId: course?.courseId,
        type: item.type,
        chapters: chapters,
        topic: course?.topic,
        difficultyLevel: course?.difficultyLevel,
      });

      const contentId = response.data;
      if (contentId) {
        setGeneratedContentId(contentId);
        pollForCompletion(contentId);
      } else {
        throw new Error("Failed to get content ID");
      }
    } catch (error) {
      toast.error("Failed to start content generation.");
      setLoading(false);
    }
  };

  const pollForCompletion = (contentId) => {
    const pollInterval = setInterval(async () => {
      try {
        const statusCheck = await axios.get(`/api/study-type?id=${contentId}`);
        const content = statusCheck.data.result;

        if (content && content.status === "Ready") {
          clearInterval(pollInterval);
          toast.success("Your content is ready to view.");
          setLoading(false);
          setIsReady(true);
          refreshData(); // Refresh the parent component's data
        }
      } catch (error) {
        clearInterval(pollInterval);
        setLoading(false);
        toast.error("Something went wrong while checking progress.");
      }
    }, 5000); // Poll every 5 seconds
  };

  const isNotes = item.type === "notes";
  // Notes are always available (generated with course), other content types need to be generated
  const shouldShowReady = isNotes ? true : isReady;
  
  // Check if content is currently being generated
  const content = studyTypeContent?.[item.type];
  const isGenerating = content?.status === "Generating" || loading;

  const cardContent = (
    <div
      className={`border shadow-md rounded-lg p-5 flex flex-col items-center h-full ${
        !shouldShowReady && !isNotes && !isGenerating && "grayscale"
      }`}
    >
      <h2 className={`p-1 px-2 text-white rounded-full text-[10px] mb-2 ${
        shouldShowReady ? 'bg-green-500' : 
        isGenerating ? 'bg-yellow-500' : 'bg-gray-500'
      }`}>
        {shouldShowReady ? "Ready" : isGenerating ? "Generating" : "Generate"}
      </h2>
      <Image src={item.icon} alt={item.name} width={70} height={70} />
      <h2 className="font-medium mt-3">{item.name}</h2>
      <p className="text-gray-400 text-sm text-center flex-grow">{item.desc}</p>
      
      {isNotes ? (
        // Notes are always available - show View button
        <Button className="mt-3 cursor-pointer w-full" variant="outline">View</Button>
      ) : shouldShowReady ? (
        // Content is ready - show View button
        <Button className="mt-3 cursor-pointer w-full" variant="outline">View</Button>
      ) : isGenerating ? (
        // Content is being generated - show loading button
        <Button
          className="mt-3 cursor-pointer w-full"
          variant="outline"
          disabled={true}
        >
          <RefreshCcw className="animate-spin mr-2" />
          Generating...
        </Button>
      ) : (
        // Content needs to be generated - show Generate button
        <Button
          className="mt-3 cursor-pointer w-full"
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            generateContent();
          }}
          disabled={loading}
        >
          {loading ? <RefreshCcw className="animate-spin mr-2" /> : null}
          {loading ? "Generating..." : "Generate"}
        </Button>
      )}
    </div>
  );

  // Only make clickable if content is ready or if it's notes
  return (isNotes || shouldShowReady) ? (
    <Link href={`/course/${course?.courseId}/${item.path}`} className="h-full">
      {cardContent}
    </Link>
  ) : (
    <div className="h-full">
      {cardContent}
    </div>
  );
}

export default MaterialCardItem;
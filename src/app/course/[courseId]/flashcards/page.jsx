"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FlashcardItem from "./_components/flashcardItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { RefreshCw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Flashcards() {
  const { courseId } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [isFlipped, setIsFlipped] = useState();
  const [api, setApi] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getFlashcards();
  }, []);
  useEffect(() => {
    if (!api) {
      return;
    }
    api.on("select", () => {
      setIsFlipped(false);
    });
  }, [api]);
  const getFlashcards = async () => {
    setLoading(true);
    const result = await axios.post("/api/study-type", {
      courseId: courseId,
      studyType: "Flashcard",
    });
    setLoading(false);
    setFlashcards(result?.data);
  };
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  return (
     <div>
      <h2 className="font-bold text-2xl flex flex-col items-center justify-center">
        Flashcards
      </h2>
      <p className="flex flex-col items-center justify-center">
        The Ultimate Tool to Lock In Concepts!
      </p>
      <div className="flex flex-col items-center justify-center mt-5">
        <Carousel
          className="w-[300px] md:w-[600px] lg:w-[800px] mx-auto mt-8"
          setApi={setApi}
        >
          <CarouselPrevious className="absolute left-2 z-10 cursor-pointer" />
          <CarouselNext className="absolute right-2 z-10 cursor-pointer" />
          {loading == false ? (
            <CarouselContent>
              {flashcards.content &&
                flashcards.content.map((flashcard, index) => (
                  <CarouselItem
                    key={index}
                    className="flex justify-center items-center"
                  >
                    <FlashcardItem
                      isFlipped={isFlipped}
                      handleClick={handleClick}
                      flashcard={flashcard}
                    />
                  </CarouselItem>
                ))}
            </CarouselContent>
          ) : (
            <div className="w-full h-5 p-5 animate-pulse flex justify-center items-center">
            <RefreshCw className="animate-spin" /> Loading...
            </div>
          )}
        </Carousel>
      </div>
      <div className="flex justify-center gap-4 mt-8">
        <Link href={`/course/${courseId}`}>
          <Button variant="outline" className="cursor-pointer">Go to Course</Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline" className="cursor-pointer">Go to Dashboard</Button>
        </Link>
      </div>
    </div> 
  );
}

export default Flashcards;

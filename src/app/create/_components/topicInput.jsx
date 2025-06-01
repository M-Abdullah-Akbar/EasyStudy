import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"  
import { Textarea } from "@/components/ui/textarea";
import React from "react";

function TopicInput({ setTopic, setDifficulty }) {
  return (
    <div className="flex flex-col items-center md:px-24 lg:px-36 ">
      <h2 className="text-lg mb-5 text-center font-bold">
        What topic do you want to study?
      </h2>
      <Textarea onChange={(event) => setTopic(event.target.value)} placeholder="Enter the topic here..." className="w-full h-32" />
      <h2 className="text-lg mt-5 mb-5 text-center font-bold">
        Select the Difficulty Level
      </h2>
      <Select defaultValue="easy" className="w-full" onValueChange={(value) => setDifficulty(value)}>
        <SelectTrigger className="w-full h-12">
          <SelectValue placeholder="Select a difficulty level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="easy">Easy</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="hard">Hard</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default TopicInput;

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"  
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

function TopicInput({ setTopic, setDifficulty }) {
  const [topicValue, setTopicValue] = useState('');
  const [difficultyValue, setDifficultyValue] = useState('');

  const handleTopicChange = (event) => {
    const value = event.target.value;
    setTopicValue(value);
    setTopic(value);
  };

  const handleDifficultyChange = (value) => {
    setDifficultyValue(value);
    setDifficulty(value);
  };

  return (
    <div className="flex flex-col items-center md:px-24 lg:px-36 ">
      <h2 className="text-lg mb-5 text-center font-bold">
        What topic do you want to study?
      </h2>
      <Textarea 
        value={topicValue}
        onChange={handleTopicChange} 
        placeholder="Enter the topic here..." 
        className="w-full h-32" 
      />
      {topicValue && (
        <p className="mt-2 text-sm text-green-600 font-medium">
          ✓ Topic: {topicValue}
        </p>
      )}
      
      <h2 className="text-lg mt-5 mb-5 text-center font-bold">
        Select the Difficulty Level
      </h2>
      <Select 
        value={difficultyValue} 
        onValueChange={handleDifficultyChange}
        className="w-full"
      >
        <SelectTrigger className="w-full h-12">
          <SelectValue placeholder="Select a difficulty level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="easy">Easy</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="hard">Hard</SelectItem>
        </SelectContent>
      </Select>
      {difficultyValue && (
        <p className="mt-2 text-sm text-green-600 font-medium">
          ✓ Difficulty: {difficultyValue.charAt(0).toUpperCase() + difficultyValue.slice(1)}
        </p>
      )}
    </div>
  );
}

export default TopicInput;

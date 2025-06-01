import React, { useEffect, useState } from "react";
import MaterialCardItem from "./materialCardItem";
import axios from "axios";

function StudyMaterialSection({ courseId, course }) {
  const [studyTypeContent, setStudyTypeContent] = useState();
  const materialList = [
    {
      name: "Notes/Chapters",
      desc: "Read Notes and Chapters",
      icon: "/notes.png",
      path: "/notes",
      type: "notes",
    },
    {
      name: "Flashcard",
      desc: "Helps to remember important concepts",
      icon: "/flashcard.png",
      path: "/flashcards",
      type: "Flashcard",
    },
    {
      name: "Quiz",
      desc: "Great way to test your knowledge",
      icon: "/quiz.png",
      path: "/quiz",
      type: "Quiz",
    },
    {
      name: "QA",
      desc: "Common questions and detailed answers",
      icon: "/qa.png",
      path: "/qa",
      type: "QA",
    },
  ];

  useEffect(() => {
    getStudyMaterial();
  }, []);

  const getStudyMaterial = async () => {
    const res = await axios.post("/api/study-type", {
      courseId: courseId,
      studyType: "ALL",
    });
    setStudyTypeContent(res?.data);
  };
  return (
    <div className="mt-5">
      <h2 className="text-xl font-bold mb-5">Study Material</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {materialList.map((item, index) => (
          <MaterialCardItem
            key={index}
            item={item}
            studyTypeContent={studyTypeContent}
            course={course}
            refreshData={getStudyMaterial}
          />
        ))}
      </div>
    </div>
  );
}

export default StudyMaterialSection;
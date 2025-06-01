'use client'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import StepProgress from '../_components/stepProgress';
import QuizCardItem from './_components/quizCardItem';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function QuizPage() {
    const {courseId} = useParams();
    const [quizData, setQuizData] = useState();
    const [quiz, setQuiz] = useState([]);
    const [stepCount, setStepCount] = useState(0);
    const [isCorrectAns, setIsCorrectAns] = useState(null);
    const [correctAns, setCorrectAns] = useState();
    useEffect(() => {
        getQuiz();
    },[])
    const getQuiz = async() =>{
        const result = await axios.post('/api/study-type',{
            courseId: courseId,
            studyType: 'Quiz',
        });
        setQuizData(result.data);
        setQuiz(result.data?.content?.questions)
        console.log(result.data?.content?.questions);
    }
    const checkAnswer= (userAnswer, currentQuestion) =>{
        setCorrectAns(currentQuestion?.correctAnswer)
        if (userAnswer== currentQuestion?.correctAnswer){
            setIsCorrectAns(true);
            return;
        }
        setIsCorrectAns(false);
    }
    useEffect(()=>{
        setCorrectAns(null);
        setIsCorrectAns(null);
    },[stepCount])
  return (
    <div>
        <h2 className='font-bold text-3xl flex flex-col items-center'>Quiz</h2>
        <StepProgress data={quiz} stepCount={stepCount} setStepCount={(v)=>setStepCount(v)}  />
        <div>
            <QuizCardItem  quiz={quiz[stepCount]} userSelectedOption={(v)=>checkAnswer(v,quiz[stepCount])}/>
        </div>
        {isCorrectAns == true && <div className='border p-5 border-green-700 bg-green-200 rounded-lg'>
            <h2 className='font-bold text-lg text-green-500 text-center'>Correct Answer</h2>
        </div>}
        {isCorrectAns == false && <div className='border p-5 border-red-700 bg-red-200 rounded-lg'>
            <h2 className='font-bold text-lg text-red-500 text-center'>Incorrect Answer</h2>
            <p className='text-lg text-red-500 text-center'>Correct Answer is {correctAns}</p>
        </div>}
        <div className="flex justify-center gap-4 mt-8">
          <Link href={`/course/${courseId}`}>
            <Button variant="outline" className="cursor-pointer">Go to Course</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="cursor-pointer">Go to Dashboard</Button>
          </Link>
        </div>
    </div>
  )
}

export default QuizPage
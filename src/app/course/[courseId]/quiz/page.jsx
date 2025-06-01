'use client'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import StepProgress from '../_components/stepProgress';
import QuizCardItem from './_components/quizCardItem';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

function QuizPage() {
    const {courseId} = useParams();
    const [quizData, setQuizData] = useState();
    const [quiz, setQuiz] = useState([]);
    const [stepCount, setStepCount] = useState(0);
    const [isCorrectAns, setIsCorrectAns] = useState(null);
    const [correctAns, setCorrectAns] = useState();
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getQuiz();
        // Load saved answers from localStorage
        const savedAnswers = localStorage.getItem(`quiz_answers_${courseId}`);
        if (savedAnswers) {
            setSelectedAnswers(JSON.parse(savedAnswers));
        }
    }, []);

    const getQuiz = async() =>{
        try {
            setIsLoading(true);
            const result = await axios.post('/api/study-type',{
                courseId: courseId,
                studyType: 'Quiz',
            });
            setQuizData(result.data);
            setQuiz(result.data?.content?.questions);
        } catch (error) {
            console.error("Error fetching quiz:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const checkAnswer = (userAnswer, currentQuestion) => {
        setCorrectAns(currentQuestion?.correctAnswer);
        
        // Save the selected answer
        const newSelectedAnswers = {
            ...selectedAnswers,
            [stepCount]: userAnswer
        };
        setSelectedAnswers(newSelectedAnswers);
        localStorage.setItem(`quiz_answers_${courseId}`, JSON.stringify(newSelectedAnswers));

        if (userAnswer === currentQuestion?.correctAnswer) {
            setIsCorrectAns(true);
            return;
        }
        setIsCorrectAns(false);
    }

    useEffect(() => {
        setCorrectAns(null);
        setIsCorrectAns(null);
    }, [stepCount]);

    if (isLoading) {
        return (
            <div className="container mx-auto py-8">
                <div className='flex flex-col items-center mb-8'>
                    <h2 className='font-bold text-3xl'>Quiz</h2>
                </div>
                <div className="flex justify-center items-center min-h-[200px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2 className='font-bold text-3xl flex flex-col items-center'>Quiz</h2>
            <StepProgress data={quiz} stepCount={stepCount} setStepCount={(v)=>setStepCount(v)} />
            <div>
                <QuizCardItem 
                    quiz={quiz[stepCount]} 
                    userSelectedOption={(v)=>checkAnswer(v,quiz[stepCount])}
                    selectedAnswer={selectedAnswers[stepCount]}
                />
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

export default QuizPage;
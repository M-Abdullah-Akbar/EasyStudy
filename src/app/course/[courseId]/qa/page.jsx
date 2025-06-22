'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import axios from 'axios'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

function ViewQA() {
    const { courseId } = useParams();
    const [qa, setQA] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const fetchQA = async ()=>{
            try {
                setIsLoading(true);
                const result = await axios.post("/api/study-type", {
                    courseId: courseId,
                    studyType: "QA",
                });
                console.log("QA Data:", result?.data);
                setQA(result?.data);
            } catch (error) {
                console.error("Error fetching QA:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchQA();
    },[])

    if (isLoading) {
        return (
            <div className="container mx-auto py-8">
                <div className='flex flex-col items-center mb-8'>
                    <h1 className='text-2xl font-bold text-center'>Question & Answer</h1>
                </div>
                <div className="flex justify-center items-center min-h-[200px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            <div className='flex flex-col items-center mb-8'>
                <h1 className='text-2xl font-bold text-center'>Question & Answer</h1>
            </div>
            
            {qa?.[0]?.content?.length > 0 ? (
                <div className="max-w-4xl mx-auto">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {qa[0].content.map((item, index) => (
                            <AccordionItem 
                                key={index} 
                                value={`item-${index}`}
                                className="border rounded-lg px-4 bg-white shadow-sm"
                            >
                                <AccordionTrigger className="text-left hover:no-underline py-4">
                                    <span className="font-medium text-gray-800">{item.question}</span>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="pl-4 py-4">
                                        <p className="text-gray-600 whitespace-pre-line">{item.answer}</p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center h-64'>
                    <p className="text-center text-gray-500">No questions available</p>
                </div>
            )}
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

export default ViewQA
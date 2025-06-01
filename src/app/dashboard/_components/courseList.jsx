'use client'
import React, { useContext } from 'react'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useState } from 'react'
import CourseCardItem from '@/app/dashboard/_components/courseCardItem'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import { Item } from '@radix-ui/react-select'
import { index } from 'drizzle-orm/gel-core'
import { CourseCountContext } from '@/app/_context/courseCountContext'

function CourseList() {
    const {user} = useUser();
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(false);
    const {totalCourse, setTotalCourse} = useContext(CourseCountContext);
    const [pollingCourses, setPollingCourses] = useState(new Set());

    useEffect(() => {
        user && getCourseList();
    }, [user]);

    // Poll for course status updates
    useEffect(() => {
        if (pollingCourses.size === 0) return;

        const pollInterval = setInterval(async () => {
            try {
                const res = await axios.post('/api/courses', {
                    createdBy: user?.primaryEmailAddress?.emailAddress
                });
                
                const updatedCourses = res.data.result;
                setCourseList(updatedCourses);
                setTotalCourse(updatedCourses?.length);

                // Check if any courses are still generating
                const stillGenerating = updatedCourses.filter(course => 
                    course.status === "Generating" && pollingCourses.has(course.courseId)
                );

                if (stillGenerating.length === 0) {
                    clearInterval(pollInterval);
                    setPollingCourses(new Set());
                }
            } catch (error) {
                console.error("Error polling course status:", error);
            }
        }, 2000);

        return () => clearInterval(pollInterval);
    }, [pollingCourses, user]);

    const getCourseList = async () => {
        try {
            setLoading(true);
            const res = await axios.post('/api/courses', {
                createdBy: user?.primaryEmailAddress?.emailAddress
            });
            setCourseList(res.data.result);
            setTotalCourse(res.data.result?.length);

            // Add generating courses to polling set
            const generatingCourses = res.data.result
                .filter(course => course.status === "Generating")
                .map(course => course.courseId);
            if (generatingCourses.length > 0) {
                setPollingCourses(new Set(generatingCourses));
            }
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full mt-5 mx-auto p-4'>
            <h2 className='text-2xl font-bold'>My Courses
                <Button variant='outline' className='float-right cursor-pointer' onClick={getCourseList}> 
                    <RefreshCw className={loading ? 'animate-spin' : ''}/> Refresh
                </Button>
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4'>
                {loading ? (
                    [1,2,3,4,5,6].map((Item,index) => (
                        <div key={index} className='w-full h-56 bg-slate-200 shadow-md rounded-lg p-5 animate-pulse'/>
                    ))
                ) : (
                    courseList.map((course,index) => (
                        <CourseCardItem key={index} course={course}/>
                    ))
                )}
            </div>
        </div>
    );
}

export default CourseList
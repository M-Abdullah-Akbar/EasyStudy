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
    useEffect(() => {
        user&&getCourseList();
    }, [user]);
    const getCourseList = async () => {
        setLoading(true);
        const res = await axios.post('/api/courses', {
            createdBy: user?.primaryEmailAddress?.emailAddress
        });
        setCourseList(res.data.result);
        setLoading(false);
        setTotalCourse(res.data.result?.length);
    }
  return (
    <div className='w-full mt-5 mx-auto p-4'>
        <h2 className='text-2xl font-bold'>My Courses
            <Button variant='outline' className='float-right cursor-pointer' onClick={getCourseList}> <RefreshCw className={loading == true ? `animate-spin` : ''}/> Refresh</Button>
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4'>
            {loading == false ? courseList.map((course,index) => (
                <CourseCardItem key={index} course={course}/>
            )): [1,2,3,4,5,6].map((Item,index) => (
                <div key={index} className='w-full h-56  bg-slate-200 shadow-md rounded-lg p-5 animate-pulse'>
                    
                </div>
            ) )}
        </div>
    </div>
  )
}

export default CourseList
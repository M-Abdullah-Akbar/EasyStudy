import React, { useState } from 'react'
import Image from 'next/image'
function SelectionOptions({selectedStudyType}) {
    const options = [{
        name: 'Exam',
        icon: '/exam_1.png',
    },
    {
        name: 'Job Interview',
        icon: '/job.png',
    },
    {
        name: 'Practice',
        icon: '/practice.png',
    },
    {
        name: 'Coding Prep',
        icon: '/code.png',
    },
    {
        name: 'Other',
        icon: '/knowledge.png',
    }
]
    const [selectedOption, setSelectedOption] = useState(' ');
  return (
    <div className="flex flex-col items-center md:px-24 lg:px-36 ">
        <h2 className='text-lg mb-5 text-center font-bold'>
            For Which you want to create your personal study material?
        </h2>
        <div className='grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5'>
            {options.map((option, index) => (
                <div key={index} className= {` p-4 flex flex-col items-center cursor-pointer hover:scale-105  hover:border-gray-950 transition-transform duration-300 border-2 border-gray-300 rounded-xl shadow-md hover:shadow-lg ${option?.name == selectedOption && 'border-gray-950'  }`} onClick={() => {setSelectedOption(option.name); selectedStudyType(option.name)}}>
                    <Image src={option.icon} alt={option.name} width={50} height={50} />
                    <h3 className=" font-sm text-center mt-2 ">{option.name}</h3>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SelectionOptions
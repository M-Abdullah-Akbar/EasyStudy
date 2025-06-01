import { UserButton } from '@clerk/nextjs'
import React from 'react'

function DashboardHeader() {
  return (
    <div className='flex justify-end p-5'>
      <UserButton></UserButton>
    </div>
  )
}

export default DashboardHeader
import FilterComponent from '@/components/FilterComponent';
import ToDoList from '@/components/ToDoList'
import { GetAlltodos } from '@/lib/api'
import React from 'react'

 const page=async()=> {
  const tasks=await GetAlltodos();
  // console.log("tasks: " + [...tasks]);
  return (
    <div>
      <FilterComponent tasks={tasks} />
      <ToDoList tasks={tasks} />
    </div>
  )
}

export default page


import FilterComponent from '@/components/FilterComponent';
import { GetAlltodos } from '@/lib/api'
import React from 'react'


const FilterHome = async() => {
  const tasks= await GetAlltodos();
  console.log("tasks: " + tasks.length);
  return (
    <div>
      <FilterComponent tasks={tasks} />
    </div>
  )
}

export default FilterHome

import AddTask from "@/components/AddTask";
import {GetAlltodos} from "../lib/api"
import ToDoList from "@/components/ToDoList";
import Link from "next/link";


export default async function Home() {
  const tasks = await GetAlltodos();
  return (
    <div>
      {/* <main className="mx-auto max-w-1xl  mt-5"> 
        <div className="text-center my-5 flex flex-col gap-4">
          <h1 className="text-center font-bold">to do list</h1>
          <AddTask />
        </div>
        <ToDoList tasks={tasks} />
      </main> */}

      <main className="mx-auto max-w-1xl  mt-5">
        {/* <Link href='/'>Home</Link>
         */}
         {/* <Link href={today}>Today</Link>
        <Link href={AddTask}>Add</Link>
        <Link href={ToDoList}>Delete</Link> */}
      </main>
      </div>
  );
}

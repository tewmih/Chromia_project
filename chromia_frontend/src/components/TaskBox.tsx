"use client";

import { ITask } from "@/types/todoTypes";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { SlRefresh } from "react-icons/sl";
import { Modal } from "./Modal";
import { useState } from "react";
import { useTAppStore } from "@/store/stateStore";
import { toast } from "react-toastify";
import Spinner from "@/utility/Progress_spinner";

interface TaskProps {
  task: ITask;
  setTaskCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

function TaskBox({ task, setTaskCompleted }: TaskProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.due_date);
  const [editPriority, setEditPriority] = useState<"high" | "medium" | "low">(
    task.priority_val
  );
  const { session, setNewTaskCheck, newTaskCheck } = useTAppStore();
  const [loading, setLoading] = useState(false);

  // useEffect(()=>{
  //   const check_expired = async ()=>{
  //     if(!session) return;
  //     const diff = new Date(dueDate).getTime() - new Date().getTime();
  //     if(diff<=0 && task.status== 'pending'){
  //       setLoading(true);
  //       try {
  //         await session.call({
  //           name: "update_overdue_tasks_status",
  //           args: [task.id],
  //         });
  //         setNewTaskCheck(!newTaskCheck);
  //         setLoading(false);
  //         // setTaskCompleted(true);
  //       } catch (error) {
          
  //         toast.error("Task is expired with error: " + error);
  //       }
  //       setTaskCompleted(true);
  //     }
  //   }
  //   check_expired();

  // },[session,task.status,newTaskCheck])
  


  const toggleStatus = async () => {
    setLoading(true);
    if (!session) return;
    try {
      if (task.status === "completed") {
        await session.call({
          name: "pend_task",
          args: [task.id],
        });
        setNewTaskCheck(!newTaskCheck);
        setLoading(false);
        // setTaskCompleted(true);
      } else if (task.status === "pending") {
        await session.call({
          name: "complete_task",
          args: [task.id],
        });
        setNewTaskCheck(!newTaskCheck);
        setLoading(false);

      }
      toast.success("Task status updated successfully");
    } catch (err) {
      toast.error("Failed to update task status with error  "+err);
    }
  };

  const priorityToNumber = {
    high: 0,
    medium: 1,
    low: 2,
  };

  const handleEditSubmit = async () => {
    if (!session) return;
    try {
      setLoading(true);
      await session?.call<any>({
        name: "update_task",
        args: [
          task.id,
          editTitle,
          editDescription,
          priorityToNumber[editPriority],
          new Date(dueDate).getTime(),
        ],
      });
      setEditModalOpen(false);
      toast.success("Task edited successfully");
      setNewTaskCheck(!newTaskCheck);
      setLoading(false);
    } catch (error) {
      console.error("Failed to edit task", error);
      toast.error("Failed to edit task");
    }
  };
  const handleDeleteTask = async () => {
    if (!session) return;
    try {
      setLoading(true);
      await session?.call<any>({
        name: "delete_task",
        args: [task.id],
      });
      setDeleteModalOpen(false);
      toast.success("Task deleted successfully");
      setNewTaskCheck(!newTaskCheck);
      setLoading(false);
    } catch (error) {
      console.error("Failed to delete task", error);
      toast.error("Failed to delete task");
    }
  };

  return (

    <>
    {/* {loading && <Spinner message="updating..."/>} */}
    {/* {!loading && */}
    <div className="group relative bg-white border border-gray-300 rounded-lg shadow-md p-4 w-72 ">
      <div className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600">
        {task.title}
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">Priority:</span>
        <span
          className={`text-sm font-semibold ${
            task.priority_val === "high"
              ? "text-red-500"
              : task.priority_val === "medium"
              ? "text-yellow-500"
              : "text-green-500"
          }`}
        >
          {task.priority_val}
        </span>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">Status:</span>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={task.status === "completed"}
            onChange={toggleStatus}
            className="h-4 w-4 cursor-pointer"
          />
          {task.status === "completed" ? (
            <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
              Completed
              <IoCheckmarkDoneSharp size={20} className="text-green-600" />
            </span>
          ) : (
            <span className="text-xs font-semibold text-red-600 flex items-center gap-1">
              Pending
              <SlRefresh size={20} className="text-red-600" />
            </span>
          )}
        </div>
      </div>

      {/* Due Date */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">Due Date:</span>
        <span className="text-sm text-gray-500">
          {new Date(dueDate).toLocaleDateString()}
        </span>
      </div>

      {/* Dropdown for Description */}
      <details className="mb-2">
        <summary className="cursor-pointer text-gray-600 text-sm group-hover:text-gray-800">
          Description
        </summary>
        <p className="text-gray-500 text-sm mt-1">{task.description}</p>
      </details>
      {/* Additional Actions */}
      <div className="absolute bottom-1 right-2 transition-opacity duration-300 flex gap-5">
        <FaRegEdit
          size={17}
          color="blue"
          cursor="pointer"
          onClick={() => setEditModalOpen(true)}
          title="edit task"
        />

        <Modal modalOpen={editModalOpen} setModalOpen={setEditModalOpen}>
          {/* Edit Modal */}
          <form
            onSubmit={handleEditSubmit}
            method="dialog"
            className="flex flex-col gap-3 bg-gray-800 p-4 rounded-xl shadow-lg"
          >
            <h3 className="font-bold text-lg text-white text-center mb-2">
              Edit Task
            </h3>
            {/* Title Input */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm text-white mb-1">
                Title
              </label>
              <input
                className="h-9 bg-gray-700 text-white px-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>

            {/* Description Input */}
            <div className="flex flex-col">
              <label htmlFor="description" className="text-sm text-white mb-1">
                Description
              </label>
              <textarea
                className="h-20 bg-gray-700 text-white px-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Priority Dropdown */}
            <div className="flex flex-col">
              <label htmlFor="priority" className="text-sm text-white mb-1">
                Priority
              </label>
              <select
                className="h-9 bg-gray-700 text-white px-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                value={editPriority}
                onChange={(e) =>
                  setEditPriority(e.target.value as "high" | "medium" | "low")
                }
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Due Date Input */}
            <div className="flex flex-col">
              <label htmlFor="due_date" className="text-sm text-white mb-1">
                Due Date
              </label>
              <input
                type="date"
                className="h-9 bg-gray-700 text-white px-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                value={new Date(dueDate).toISOString().split("T")[0]}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-3">
              <button
                type="button"
                className="px-4 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </Modal>

        <FaRegTrashAlt
          size={17}
          color="red"
          cursor="pointer"
          onClick={() => setDeleteModalOpen(true)}
          title="delete task"
        />

        <Modal modalOpen={deleteModalOpen} setModalOpen={setDeleteModalOpen} >
          <div className="flex flex-col gap-6 bg-gray-800 p-6 rounded-xl shadow-lg text-center ">
            <h3 className="font-bold text-xl text-white">Confirm Delete</h3>
            <p className="text-gray-300">
              Are you sure you want to delete this task?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={() => {
                  handleDeleteTask();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
{/* } */}
    </>
  );
}
export default TaskBox;

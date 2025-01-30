"use client";

import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Modal } from "@/components/ui/Modal"; // Ensure correct import path
import AddModalContent from "@/utility/AddModalContent";
// import { useSessionContext } from "./contextProvider";

const AddTask = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  //  const session=useSessionContext();
  return (
    <div className="">
      <button
        className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded shadow-md hover:from-purple-600 hover:to-blue-500 transition-transform transform hover:scale-105"
        onClick={() => setModalOpen(true)}
      >
        Add Task <FaPlus size={15} className="ml-2" />
      </button>

      {/* Pass modal state and handler to AddModalContent */}
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <AddModalContent setModalOpen={setModalOpen} />
      </Modal>
    </div>
  );
};

export default AddTask;

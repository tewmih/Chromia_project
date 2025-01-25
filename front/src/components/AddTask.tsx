"use client";

import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Modal } from "@/components/Modal"; // Ensure correct import path
import AddModalContent from "@/utility/AddModalContent";

const AddTask = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center">
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

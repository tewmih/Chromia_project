"use client";

interface modalProps {
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  children: React.ReactNode;
}

export const Modal: React.FC<modalProps> = ({
  modalOpen,
  setModalOpen,
  children,
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center h-full ${
        modalOpen ? "bg-black bg-opacity-50 backdrop-blur-md" : "hidden"
      }`}
    >
      <div className="modal-box relative w-full sm:w-96 p-6 bg-gray-800 text-white rounded-xl shadow-2xl transition-transform transform scale-95 hover:scale-100">
        <button
          className="absolute right-4 top-4 text-white text-2xl font-bold hover:bg-red-700 hover:text-white p-2 rounded-full transition w-8 h-8 flex items-center justify-center"
          onClick={() => setModalOpen(false)}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

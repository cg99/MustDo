// src/components/AddTaskModal.js
import React, { useState } from 'react';
import CancelIcon from '../icons/CancelIcon';


const AddTaskModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');

  const handleSave = () => {
    if (!title) {
      alert('Please fill out the title');
      return;
    }
    onSave({ title });
    setTitle('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
          <CancelIcon/>
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Task</h2>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;

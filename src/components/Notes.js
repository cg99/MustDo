// src/components/Notes.js
import React, { useState } from 'react';
import AddTaskModal from './AddTaskModal';

const Notes = ({ tasks, onAddTask, onDeleteTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (task) => {
    onAddTask(task);
    setIsModalOpen(false);
  };

  return (
    <div className="px-4">
      <h2 className="text-[#0e141b] text-2xl font-bold pt-5 pb-3 flex justify-between items-center">
        Notes
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Add Note</button>
      </h2>
      <div className="flex flex-col gap-2">
        {tasks.map(task => (
          <div key={task._id} className="flex items-center gap-4 bg-[#f8fafb] p-2 rounded-lg shadow-md">
            <p className="text-base flex-1 truncate text-[#0e141b]">{task.title}</p>
            <button onClick={() => onDeleteTask(task._id)} className="text-red-500">Delete</button>
          </div>
        ))}
      </div>
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddTask}
      />
    </div>
  );
};

export default Notes;

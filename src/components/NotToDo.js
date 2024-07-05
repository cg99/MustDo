// src/components/NotToDo.js
import React, { useState } from 'react';
import AddTaskModal from './AddTaskModal';

const NotToDo = ({ tasks, onAddTask, onToggleTask, onDeleteTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (task) => {
    onAddTask(task);
    setIsModalOpen(false);
  };

  return (
    <div className="px-4">
      <h2 className="text-[#0e141b] text-2xl font-bold pt-5 pb-3 flex justify-between items-center">
        Not To Do
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Add Task</button>
      </h2>
      <div className="flex flex-col gap-2">
        {tasks.map(task => (
          <div key={task._id} className="flex items-center gap-4 bg-[#f8fafb] p-2 rounded-lg shadow-md">
            <input
              type="checkbox"
              className={`h-5 w-5 rounded border-2 ${task.completed ? 'border-gray-500 text-gray-500' : 'border-[#d0dbe6] text-[#378fe6]'} bg-transparent focus:ring-0`}
              checked={task.completed}
              onChange={() => onToggleTask(task._id)}
            />
            <p className={`text-base flex-1 truncate ${task.completed ? 'text-gray-500 line-through' : 'text-[#0e141b]'}`}>
              {task.title}
            </p>
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

export default NotToDo;

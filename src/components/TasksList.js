// src/components/TasksList.js
import React, { useState } from 'react';
import AddTaskModal from './AddTaskModal';
import AddTaskIcon from '../icons/AddTaskIcon';
import DeleteTaskIcon from '../icons/DeleteTaskIcon';

const TasksList = ({ title, tasks, onAddTask, onUpdateTask, onDeleteTask, defaultDate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (task) => {
    onAddTask({ ...task, date: defaultDate });
  };

  return (
    <div>
      <h3 className="text-[#0e141b] text-xl font-bold pt-5 pb-3 pr-2 flex justify-between items-center">
        {title}
        <button onClick={() => setIsModalOpen(true)} className="bg-transparent text-slate-900"><AddTaskIcon/></button>
      </h3>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <div key={task._id} className={`flex items-center gap-4 p-2 rounded-lg shadow-md ${task.completed ? 'bg-gray-200' : 'bg-[#f8fafb]'}`}>
            <input
              type="checkbox"
              className={`h-5 w-5 rounded border-2 ${task.completed ? 'border-gray-500 text-gray-500' : 'border-[#d0dbe6] text-[#378fe6]'} bg-transparent focus:ring-0`}
              checked={task.completed}
              onChange={() => onUpdateTask(task._id, { ...task, completed: !task.completed })}
            />
            <div className="flex-1">
              <p className={`text-base truncate ${task.completed ? 'text-gray-500 line-through' : 'text-[#0e141b]'}`}>{task.title}</p>
            </div>
            <button onClick={() => onDeleteTask(task._id)} className="text-red-500"><DeleteTaskIcon/></button>
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

export default TasksList;

// src/components/Upcoming.js
import React from 'react';
import TasksList from './TasksList';

const Upcoming = ({ tasks, onAddTask, onUpdateTask, onDeleteTask }) => {
  const getNext6Days = () => {
    const days = [];
    for (let i = 1; i <= 6; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long' };
    const dayName = new Intl.DateTimeFormat('en-US', options).format(date);
    return `${date.getDate()} - ${dayName}`;
  };

  const groupTasksByDate = (tasks) => {
    const groupedTasks = {};
    tasks.forEach((task) => {
      const date = task.date.split('T')[0];
      if (!groupedTasks[date]) {
        groupedTasks[date] = [];
      }
      groupedTasks[date].push(task);
    });
    return groupedTasks;
  };

  const next6Days = getNext6Days();
  const groupedTasks = groupTasksByDate(tasks);

  return (
    <div className="px-4">
      <h2 className="text-[#0e141b] text-2xl font-bold pt-5 pb-3">Upcoming</h2>
      <div className="flex flex-col gap-2">
        {next6Days.map((date) => (
          <TasksList
            key={date}
            title={formatDate(date)}
            tasks={groupedTasks[date] || []}
            onAddTask={onAddTask}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
            defaultDate={date}
          />
        ))}
      </div>
    </div>
  );
};

export default Upcoming;

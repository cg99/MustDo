// src/components/TodaysTasks.js
import React from 'react';
import TasksList from './TasksList';

const TodaysTasks = ({ tasks, onAddTask, onUpdateTask, onDeleteTask }) => {
  const today = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(task => task.date.split('T')[0] === today);

  return (
    <TasksList
      title="Today's Tasks"
      tasks={todayTasks}
      onAddTask={onAddTask}
      onUpdateTask={onUpdateTask}
      onDeleteTask={onDeleteTask}
      defaultDate={today}
    />
  );
};

export default TodaysTasks;

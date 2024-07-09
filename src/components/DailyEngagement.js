// src/components/DailyEngagement.js
import React from 'react';
import TasksList from './TasksList';

const DailyEngagement = ({ tasks, onAddTask, onUpdateTask, onDeleteTask }) => {
  return (
    <TasksList
      title="Daily Engagement"
      tasks={tasks}
      onAddTask={(task) => onAddTask({ ...task, taskType: 'dailyEngagement' })}
      onUpdateTask={onUpdateTask}
      onDeleteTask={onDeleteTask}
    />
  );
};

export default DailyEngagement;

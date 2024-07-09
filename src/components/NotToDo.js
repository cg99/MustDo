// src/components/NotToDo.js
import React from 'react';
import TasksList from './TasksList';

const NotToDo = ({ tasks, onAddTask, onUpdateTask, onDeleteTask }) => {
  return (
    <TasksList
      title="Not To Do"
      tasks={tasks}
      onAddTask={(task) => onAddTask({ ...task, taskType: 'notToDo' })}
      onUpdateTask={onUpdateTask}
      onDeleteTask={onDeleteTask}
    />
  );
};

export default NotToDo;

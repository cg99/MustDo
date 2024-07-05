import {useEffect, useState} from 'react';
import DailyEngagement from './components/DailyEngagement';
import TodaysTasks from './components/TodaysTasks';
import Upcoming from './components/Upcoming';
import NotToDo from './components/NotToDo';
import Notes from './components/Notes';
import './index.css';
import { getTasks, createTask, updateTask, deleteTask } from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    fetchTasks();
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/quotes');
      const data = await response.json();
      setQuote(data.quote);
    } catch (err) {
      console.error('Error fetching quotes:', err);
    }
  };

  const fetchTasks = async () => {
    const tasks = await getTasks();
    setTasks(tasks);
  };

  const handleAddTask = async (task) => {
    const newTask = await createTask(task);
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = async (id, updatedTask) => {
    const task = await updateTask(id, updatedTask);
    setTasks(tasks.map((t) => (t._id === id ? task : t)));
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const dailyEngagementTasks = tasks.filter(task => task.taskType === 'dailyEngagement');
  const regularTasks = tasks.filter(task => task.taskType === 'regular');
  const notToDoTasks = tasks.filter(task => task.taskType === 'notToDo');
  const noteTasks = tasks.filter(task => task.taskType === 'note');

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const currentDate = formatDate(new Date());

  return (
    <div className="bg-[#f8fafb] font-sans min-h-screen flex flex-col justify-between">
      <header className="flex items-center justify-between bg-[#f8fafb] p-4 pb-2">
        <h2 className="text-[#0e141b] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">MustDo</h2>
        <button className="flex items-center justify-center h-12 w-12 bg-transparent text-[#0e141b]">
          <span className="material-icons">Settings</span>
        </button>
      </header>
      <div className="px-4">
        <h1 className="text-[#0e141b] text-2xl font-bold pt-5">{quote}</h1>
        <p className="text-[#0e141b] text-base pt-1">It's {currentDate}</p>
      </div>
      <DailyEngagement
        tasks={dailyEngagementTasks}
        onAddTask={(task) => handleAddTask({ ...task, taskType: 'dailyEngagement' })}
        onToggleTask={(id) => handleUpdateTask(id, { completed: !tasks.find(task => task._id === id).completed })}
        onDeleteTask={handleDeleteTask}
      />
      <TodaysTasks
        tasks={regularTasks}
        onAddTask={(task) => handleAddTask({ ...task, taskType: 'regular' })}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />
      <Upcoming
        tasks={regularTasks}
        onAddTask={(task) => handleAddTask({ ...task, taskType: 'regular' })}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />
      <NotToDo
        tasks={notToDoTasks}
        onAddTask={(task) => handleAddTask({ ...task, taskType: 'notToDo' })}
        onToggleTask={(id) => handleUpdateTask(id, { completed: !tasks.find(task => task._id === id).completed })}
        onDeleteTask={handleDeleteTask}
      />
      <Notes
        tasks={noteTasks}
        onAddTask={(task) => handleAddTask({ ...task, taskType: 'note' })}
        onDeleteTask={handleDeleteTask}
      />
      <footer className="flex justify-end p-5">
        <button className="flex items-center justify-center h-14 px-5 rounded-full bg-[#378fe6] text-[#f8fafb] text-base font-bold gap-4">
          <span className="material-icons">add</span>
          <span className="truncate">New</span>
        </button>
      </footer>
    </div>
  );
}

export default App;

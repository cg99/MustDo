import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DailyEngagement from './components/DailyEngagement';
import TodaysTasks from './components/TodaysTasks';
import Upcoming from './components/Upcoming';
import NotToDo from './components/NotToDo';
import MenuIcon from './icons/MenuIcon';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';

import './index.css';
import { getTasks, createTask, updateTask, deleteTask, getQuote } from './api';


function App() {
  const [tasks, setTasks] = useState([]);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    fetchTasks();
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    const quote = await getQuote();
    setQuote(quote);
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

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const currentDate = formatDate(new Date());

  return (
    <Router>
      <div className="bg-[#f8fafb] font-sans min-h-screen flex flex-col px-5">
        <header className="flex items-center justify-between bg-[#f8fafb] pb-2">
          <h2 className="text-[#0e141b] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
            <Link to="/">MustDo</Link></h2>
          <Link to="/profile" className="flex items-center justify-center h-12 w-12 bg-transparent text-[#0e141b]">
            <MenuIcon />
          </Link>
        </header>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/" element={<PrivateRoute element={
            <>
              <div className="px-4 pb-2">
                <h1 className="text-[#0e141b] text-2xl font-bold pt-5">{quote}</h1>
                <p className="text-[#0e141b] text-base pt-1">It's {currentDate}</p>
              </div>
              <div className="px-4 py-4 bg-white shadow-md rounded-lg mb-4">
                <DailyEngagement
                  tasks={dailyEngagementTasks}
                  onAddTask={(task) => handleAddTask({ ...task, taskType: 'dailyEngagement' })}
                  onUpdateTask={handleUpdateTask}
                  onDeleteTask={handleDeleteTask}
                />
              </div>
              <div className="px-4 py-4 bg-white shadow-md rounded-lg mb-4">
                <TodaysTasks
                  tasks={regularTasks}
                  onAddTask={(task) => handleAddTask({ ...task, taskType: 'regular' })}
                  onUpdateTask={handleUpdateTask}
                  onDeleteTask={handleDeleteTask}
                />
              </div>
              <div className="px-4 py-4 bg-white shadow-md rounded-lg mb-4">
                <Upcoming
                  tasks={regularTasks}
                  onAddTask={(task) => handleAddTask({ ...task, taskType: 'regular' })}
                  onUpdateTask={handleUpdateTask}
                  onDeleteTask={handleDeleteTask}
                />
              </div>
              <div className="px-4 py-4 bg-white shadow-md rounded-lg mb-4">
                <NotToDo
                  tasks={notToDoTasks}
                  onAddTask={(task) => handleAddTask({ ...task, taskType: 'notToDo' })}
                  onUpdateTask={handleUpdateTask}
                  onDeleteTask={handleDeleteTask}
                />
              </div>
            </>
          } />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;

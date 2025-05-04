import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import TasksPage from './pages/TasksPage';
import CreateProject from './pages/CreateProject';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project/:userId/createProject" element={<CreateProject />} />
        <Route path="/tasks/:projectId" element={<TasksPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

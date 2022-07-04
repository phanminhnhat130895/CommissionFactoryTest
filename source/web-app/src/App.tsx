import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './routes/protected.route';
import Login from './views/Login';
import Register from './views/Register';
import Task from './views/Task';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute isAuth={isAuth} />}>
          <Route path='/task' element={<Task />} />
        </Route>
        <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
        <Route path='/register' element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

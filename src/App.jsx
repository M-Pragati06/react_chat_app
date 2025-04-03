// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ChatLayout } from './components/Chat/ChatLayout';
import { Login } from './components/Auth/Login';
import { Signup } from './components/Auth/Signup';
import { PrivateRoute } from './components/Auth/PrivateRoute';
import { PublicRoute } from './components/Auth/PublicRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <ChatLayout />
            </PrivateRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/signup" element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
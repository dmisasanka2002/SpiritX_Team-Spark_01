<<<<<<< HEAD
import { useState } from 'react'
import './App.css'
import {Button} from 'antd'
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";

>>>>>>> sasanka
function App() {
  return (
<<<<<<< HEAD
    <>
      <div>
        <p>click the button and you will be able to see increment the count</p>
         <Button type='primary' onClick={() => setCount(count+1)}> count ({count})</Button>
      </div>
    </>
  )
=======
    <ConfigProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="*" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
>>>>>>> sasanka
}

export default App;

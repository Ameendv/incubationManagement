import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/user/Signup'
import Login from './pages/user/Login'
import Home from './pages/user/Home'
import User from './context/context'
import Process from './pages/user/Process'
import AdminLogin from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import RecordTrack from './pages/admin/RecordTrack'
import SlotPage from './pages/admin/SlotPage'
import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <User>
        <Routes>
          <Route path='/signup' exact element={<Signup />} />
          <Route path='/login' exact element={<Login/>}/>
          <Route path='/userHome' exact element={<Home/>}/>
          <Route path ='/process' exact element={<Process/>}/>
        </Routes>
        </User>
        <Routes>
          <Route path='/adminLogin' exact element={<AdminLogin/>}/>
          <Route path='/dashboard' exact element={<Dashboard/>}/>
          <Route path='/records' exact element={<RecordTrack/>}/>
          <Route path='/slot' exact element={<SlotPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

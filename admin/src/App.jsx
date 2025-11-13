import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard '

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/dashboard' element={<AdminDashboard/>} />
      </Routes>
    </div>
  )
}

export default App
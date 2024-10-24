import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ThatOpen from './components/ThatOpen'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './routes/Home'
import Project from './routes/Project'
import DetailProject from './routes/DetailProject'
import NotFound_404 from './routes/NotFound_404'
import BimModel from './routes/BimModel'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-screen h-screen bg-gray-50">
      <Navbar />
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="project" element={<Project />} />
          <Route path="project/:id" element={<DetailProject />} />
          <Route path="project/:id/models/:uid" element={<BimModel />} />
          <Route path="*" element={<NotFound_404 />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

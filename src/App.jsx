<<<<<<< HEAD
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ThatOpen from "./components/ThatOpen";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./routes/Home";
import Sidebar from "./components/Sidebar";
=======
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
>>>>>>> 504a36253d2639e203504eb7aff2eedfd72e9901

function App() {
  return (
    <div className="w-screen h-screen bg-gray-50 relative">
      <Navbar />
<<<<<<< HEAD
      <div className="flex flex-row">
        <Sidebar />
        <div className="w-10/12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project" element={<ThatOpen />} />
          </Routes>
        </div>
      </div>
      <Footer />
=======
      <main className="overflow-x-hidden overflow-y-auto h-[90vh]">
        <Routes>
          <Route index element={<Home />} />
          <Route path="project" element={<Project />} />
          <Route path="project/:id" element={<DetailProject />} />
          <Route path="project/:id/models/:uid" element={<BimModel />} />
          <Route path="*" element={<NotFound_404 />} />
        </Routes>
      </main>
>>>>>>> 504a36253d2639e203504eb7aff2eedfd72e9901
    </div>
  )
}

export default App

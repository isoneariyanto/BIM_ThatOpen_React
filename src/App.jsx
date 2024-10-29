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

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-screen h-screen">
      <Navbar />
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
    </div>
  );
}

export default App;

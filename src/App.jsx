import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ThatOpen from "./components/ThatOpen";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-screen h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<ThatOpen />} />
      </Routes>
    </div>
  );
}

export default App;

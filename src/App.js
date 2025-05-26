import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { GamePage } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GamePage />} />
      </Routes>
    </Router>
  );
}

export default App;

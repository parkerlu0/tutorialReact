import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Albums from "./pages/Albums";
import Update from "./pages/Update";

function App(): JSX.Element {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Albums />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

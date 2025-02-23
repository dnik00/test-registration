import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './Registration.js'



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/test-registration" element={<Registration/>} />
      </Routes>
    </Router>
  );
}

export default App;

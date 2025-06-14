// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout'; // Fixed import path
import Home from './pages/Home';
import Create from './pages/Create';
import Templates from './pages/Templates';
import Editor from './pages/Editor';
import About from './pages/About';
import { CardProvider } from './context/CardContext';
// import React from 'react';

function App() {
  return (
    <CardProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      </Router>
    </CardProvider>
  );
}

export default App;
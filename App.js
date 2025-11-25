import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CatDetail from './pages/CatDetail';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mt-6 mb-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cat/:id" element={<CatDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
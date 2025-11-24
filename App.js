import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MobileNav from './components/MobileNav';
import Home from './pages/Home';
import CatDetail from './pages/CatDetail';
import AddCat from './pages/AddCat';
import EditCat from './pages/EditCat';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mt-6 mb-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cat/:id" element={<CatDetail />} />
          <Route path="/add" element={<AddCat />} />
          <Route path="/edit/:id" element={<EditCat />} />
        </Routes>
      </main>
      <MobileNav />
    </div>
  );
}

export default App;
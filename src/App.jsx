import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import ApiKeyModal from './components/ApiKeyModal';

// Pages
import Dashboard from './pages/Dashboard';
import Translator from './pages/Translator';
import Generator from './pages/Generator';
import Documentation from './pages/Documentation';

export default function App() {
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isApiKeySet, setIsApiKeySet] = useState(false);

  useEffect(() => {
    const key = localStorage.getItem('rapidapi_key');
    setIsApiKeySet(!!(key && key.trim()));
  }, []);

  const handleSaveKey = (key) => {
    setIsApiKeySet(!!(key && key.trim()));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-primary-500 selection:text-slate-950">
      {/* Top Navigation Bar */}
      <Navbar
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        isApiKeySet={isApiKeySet}
      />

      {/* Main Container with Sidebar & Route Output */}
      <div className="flex-1 flex flex-col md:flex-row w-full max-w-7xl mx-auto">
        {/* Client-Side Routing Sidebar */}
        <Sidebar />

        {/* Dynamic Route View Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          <Routes>
            <Route
              path="/"
              element={<Dashboard onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)} />}
            />
            <Route
              path="/translator"
              element={<Translator onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)} />}
            />
            <Route
              path="/generator"
              element={<Generator />}
            />
            <Route
              path="/docs"
              element={<Documentation />}
            />
            {/* Catch-all route redirects back to Dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* RapidAPI Configuration Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSaveKey={handleSaveKey}
      />
    </div>
  );
}

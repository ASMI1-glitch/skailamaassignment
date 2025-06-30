import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Hero from './components/Hero/Hero';
import Plan from './components/Plan/Plan';
import UploadSection from './components/UploadSection/UploadSection';
import SignupForm from './components/SignupForm/SignupForm';
import TranscriptEditor from './components/TranscriptEditor/TranscriptEditor';

import { AsmiProvider } from './context/contextAsmi';

function App() {
  const hasLocalUser = localStorage.getItem('localUserId');

  return (
    <AsmiProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route
            path="/signup"
            element={
              hasLocalUser ? <Navigate to="/transcript" replace /> : <SignupForm />
            }
          />
          <Route path="/transcript" element={<TranscriptEditor />} />
          <Route path="/projects" element={<Plan />} />
          <Route path="/upload" element={<UploadSection />} />
        </Routes>
      </Router>
    </AsmiProvider>
  );
}

export default App;

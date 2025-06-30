import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Corrected import paths (inside ./Component folder)
import Hero from './components/Hero/Hero';
import Plan from './components/Plan/Plan';
import UploadSection from './components/UploadSection/UploadSection';
import SignupForm from './components/SignupForm/SignupForm';
import TranscriptEditor from './components/TranscriptEditor/TranscriptEditor';

// Context
import RequireAuth from './auth/RequireAuth';
import { AsmiProvider } from './context/contextAsmi';

function App() {
  return (
    <AsmiProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/transcript" element={<TranscriptEditor />} />
          <Route
            path="/projects"
            element={
              <RequireAuth>
                <Plan />
              </RequireAuth>
            }
          />
          <Route path="/upload" element={<UploadSection />} />
        </Routes>
      </Router>
    </AsmiProvider>
  );
}

export default App; 

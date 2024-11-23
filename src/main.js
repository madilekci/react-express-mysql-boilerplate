import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './pages/Home.js';
import AquaGSM from './pages/AquaGSM.js';
import './index.css';
import { BackendProvider } from './context/backend-context.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <BackendProvider>
                <Routes>
                    <Route path="aqua-gsm" element={<AquaGSM />} />
                    <Route path="*" element={<App />} />
                </Routes>
            </BackendProvider>
        </BrowserRouter>
    </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppLayout from './layout/AppLayout.js';
import Home from './pages/Home.js';
import AquaGSM from './pages/AquaGSM.js';
import TcProPersonal from './pages/TcProPersonal.js';
import TcProFamily from './pages/TcProFamily.js';
import './index.css';
import { BackendProvider } from './context/backend-context.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <BackendProvider>
                <Routes>
                    <Route path="/" element={<AppLayout />}>
                        <Route index element={<Home />} />
                        <Route path="aqua-gsm" element={<AquaGSM />} />
                        <Route path="tcpro-personal" element={<TcProPersonal />} />
                        <Route path="tcpro-family" element={<TcProFamily />} />
                    </Route>
                </Routes>
            </BackendProvider>
        </BrowserRouter>
    </React.StrictMode>
);

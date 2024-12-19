/* eslint-disable no-process-env */
import 'dotenv/config';
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import db from './models/index.js';

// __dirname is not defined in ES module scope
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import routes from './routes/index.js';

const app = express();

const PORT = process.env.PORT || 8081;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
console.log('client url', CLIENT_URL);

const corsOptions = { origin: CLIENT_URL };

app.use(cors(corsOptions));
app.use(json({ limit: '20mb' }));
app.use(urlencoded({ extended: true }));
app.use('/', routes);

db.sequelize.sync();

// Serve the static files from the Vite build directory
const buildPath = path.resolve(__dirname, 'dist');
app.use(express.static(buildPath));

// Fallback to serve `index.html` for React routing
app.get('*', (req, res) => {
    res.sendFile(path.resolve(buildPath, 'index.html'));
});

// set port, listen for requests
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}.`);
});

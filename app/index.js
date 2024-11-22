/* eslint-disable no-process-env */
import 'dotenv/config';
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import db from './models/index.js';

import routes from './routes/index.js';

const app = express();

const PORT = process.env.PORT || 8080;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:8081';

const corsOptions = { origin: CLIENT_URL };

app.use(cors(corsOptions));
app.use(json({ limit: '20mb' }));
app.use(urlencoded({ extended: true }));
app.use('/', routes);

db.sequelize.sync();

// set port, listen for requests
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}.`);
});

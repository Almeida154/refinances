import express from 'express';
import cors from 'cors';

import routes from './routes';
import './connection';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(3333, () => console.log('🔥 Backend server started at http://localhost:3333'));
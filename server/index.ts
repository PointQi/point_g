/**
 * @file 后台服务
 */

import express from 'express';
import cors from 'cors';
import consola from 'consola';
import route from './route';
import { connectDB } from './db';

const PORT = '5051';

connectDB();

const app = express();
app.use(cors());

app.use(express.json());

route(app);

app.listen(PORT, () => {
	consola.log(`success: http://127.0.0.1:${PORT}`);
});

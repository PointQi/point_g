/**
 * @file 服务路由
 */

import role from './role/types';
import type { Express } from 'express';

const handleNotFound = (app: Express) => {
	app.use('*', (_req, res) => {
		res.status(404).send({
			data: null,
			msg: 'request not found',
			code: 404,
			success: 0,
		});
	});
};

export default function route(app: Express) {
	app.use('/role', role);

	handleNotFound(app);
}

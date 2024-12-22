/**
 * @file 角色类型服务
 */

import express from 'express';
import consola from 'consola';
import { v4 as uuidV4 } from 'uuid';
import { connection } from '../../db';
import { getSortOrder } from '../utils';

const router: express.Router = express.Router();

// 获取 role_type 列表
router.get('/types', async (req, res) => {
	try {
		const { search, sort, order } = req.query;
		let sql = 'SELECT * FROM role_types';
		const value: string[] = [];

		// 搜索
		if (search) {
			sql += ' WHERE name LIKE ?';
			value.push(`%${search}%`);
		}

		// 排序
		if (typeof sort === 'string' && sort) {
			sql += ' ORDER BY ?? ';
			value.push(sort);
			sql += getSortOrder(String(order));
		}

		sql += ';';
		const [data] = await connection.promise().query(sql, value);
		res.send({
			data,
			msg: '',
			code: 200,
			success: 1,
		});
	} catch (err) {
		consola.log(err);
		res.status(500).send({
			data: null,
			msg: `mysql failed: ${err}`,
			code: 500,
			success: 0,
		});
	}
});

// 获取 role_type_identifier 列表
router.get('/types/identifier', async (_req, res) => {
	try {
		const sql = 'SELECT DISTINCT identifier FROM role_types';
		const data = ((await connection.promise().query(sql))?.[0] || []) as { identifier: string }[];
		res.send({
			data: data.map(item => item.identifier),
			msg: '',
			code: 200,
			success: 1,
		});
	} catch (err) {
		consola.log(err);
		res.status(500).send({
			data: null,
			msg: `mysql failed: ${err}`,
			code: 500,
			success: 0,
		});
	}
});

// 创建 role_type
router.post('/types/create', async (req, res) => {
	try {
		const { name, identifier, enabled, description } = req.body;
		const sql = 'INSERT INTO role_types (id, name, identifier, enabled, description) VALUES (?, ?, ?, ?, ?);';
		const value = [uuidV4(), name, identifier, enabled, description];
		await connection.promise().query(sql, value);
		res.send({
			data: null,
			msg: '',
			code: 200,
			success: 1,
		});
	} catch (err) {
		consola.log(err);
		res.status(500).send({
			data: null,
			msg: `mysql failed: ${err}`,
			code: 500,
			success: 0,
		});
	}
});

// 更新 role_type
router.post('/types/:id/update', async (req, res) => {
	try {
		const { name, identifier, enabled, description } = req.body;
		const { id } = req.params;

		let sql = 'UPDATE role_types';
		sql += ' SET name = ?, identifier = ?, enabled = ?, description = ?';
		sql += ' WHERE id = ?';
		const value = [name, identifier, enabled, description, id];
		await connection.promise().query(sql, value);
		res.send({
			data: null,
			msg: '',
			code: 200,
			success: 1,
		});
	} catch (err) {
		consola.log(err);
		res.status(500).send({
			data: null,
			msg: `mysql failed: ${err}`,
			code: 500,
			success: 0,
		});
	}
});

// 删除 role_type
router.delete('/types/del', async (req, res) => {
	try {
		const { ids } = req.body;
		const dynamicParameter = ids.map(() => '?').join(', ');
		const sql = `DELETE FROM role_types WHERE id IN (${dynamicParameter});`;
		await connection.promise().query(sql, ids);
		res.send({
			data: null,
			msg: '',
			code: 200,
			success: 1,
		});
	} catch (err) {
		consola.log(err);
		res.status(500).send({
			data: null,
			msg: `mysql failed: ${err}`,
			code: 500,
			success: 0,
		});
	}
});

export default router;

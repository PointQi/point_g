/**
 * @file 数据库服务
 */

import mysql2 from 'mysql2';
import consola from 'consola';

// 设置数据库连接
export const connection = mysql2.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'xxx',
	database: 'pg_data',
});

// 连接数据库
export const connectDB = () => {
	connection.connect(err => {
		if (err) {
			throw err;
		}
		consola.log('Connected to the database.');
	});
};

// 在发生错误时触发
connection.on('error', err => {
	consola.error('Database error:', err);
});

// 在数据库连接关闭时触发
connection.on('end', () => {
	consola.log('Database connection closed');
});

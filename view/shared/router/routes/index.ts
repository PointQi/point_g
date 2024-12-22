/**
 * @file 路由
 */

import { RoleControlViews } from '@role_control';
import { EngineViews } from '@engine';
import type { RouteRecordRaw } from 'vue-router';

export const getRoleControlRoutes = (): RouteRecordRaw[] => {
	return [
		{
			path: '/engine',
			name: 'engine_center',
			meta: { enLabel: 'ENGINE', zhLabel: '引擎' },
			component: EngineViews.entrance,
		},
		{
			path: '/role',
			name: 'role_control',
			meta: { enLabel: 'ROLE_CTR', zhLabel: '角色控制' },
			redirect: '/role/type',
			children: [
				{
					path: '/role/type',
					name: 'role_type',
					meta: { zhLabel: '类型' },
					component: RoleControlViews.type,
				},
				{
					path: '/role/user',
					name: 'role_user',
					meta: { zhLabel: '角色' },
					component: RoleControlViews.user,
				},
			],
		},
	];
};

/**
 * @file 角色控制
 */

export const RoleControlViews = {
	type: () => import('./role_type/entrance/index.vue'),
	user: () => import('./user/index.vue'),
};

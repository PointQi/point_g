import { axios } from '@shared/request';
import type {
	GetRoleTypesParams,
	GetRoleTypesReturn,
	CreateRoleTypeParams,
	updateRoleTypeTypeUrlParams,
	updateRoleTypeTypeParams,
	DeleteRoleTypesParams,
} from './interface';

export * from './interface';

export function getRoleTypes(params?: GetRoleTypesParams): Promise<ApiReturn<GetRoleTypesReturn>> {
	return axios.get('/role/types', params);
}

export function getRoleTypeIdentifier(): Promise<ApiReturn<number[]>> {
	return axios.get('/role/types/identifier');
}

export function createRoleType(params: CreateRoleTypeParams) {
	return axios.post('/role/types/create', params);
}

export function updateRoleType(
	urlParams: updateRoleTypeTypeUrlParams,
	params: updateRoleTypeTypeParams,
): Promise<ApiReturn> {
	return axios.post(`/role/types/${urlParams.id}/update`, params);
}

export function deleteRoleTypes(params: DeleteRoleTypesParams): Promise<ApiReturn> {
	return axios.delete('/role/types/del', params);
}

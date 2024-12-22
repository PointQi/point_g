export interface GetRoleTypesParams {
	search?: string;
	sort?: string;
	order?: 'ascending' | 'descending';
}

export type GetRoleTypesReturn = {
	id: string;
	name: string;
	identifier: number;
	enabled: number;
	description: string;
	created_at: string;
}[];

export interface CreateRoleTypeParams {
	name: string;
	identifier: number;
	enabled: boolean;
	description: string;
}

export interface updateRoleTypeTypeUrlParams {
	id: string;
}

export interface updateRoleTypeTypeParams {
	name: string;
	identifier: number;
	enabled: boolean;
	description: string;
}

export interface DeleteRoleTypesParams {
	ids: string[];
}

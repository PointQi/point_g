import { SORT_ORDER_MAP } from './const';

export const getSortOrder = (v: string) => {
	return SORT_ORDER_MAP[v === 'descending' ? 'descending' : 'ascending'];
};

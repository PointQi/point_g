/**
 * @file PTable 状态管理
 */

import { Ref, computed, reactive, ref } from 'vue';

interface SortParams {
	sort?: string;
	order?: 'ascending' | 'descending';
}

interface LoadFnParams extends SortParams {
	search?: string;
	limit?: number;
	start?: number;
}

interface Config<T> {
	sort?: SortParams;
	loadFn?: (loadParams: LoadFnParams) => Promise<ApiReturn<T[]>>;
}

export const useTableData = <T>(config: Config<T>) => {
	const search = ref('');

	const isLoading = ref(false);

	const tableData: Ref<T[]> = ref([]);

	const sortData = reactive<LoadFnParams>({});

	const selected: Ref<null | T | T[]> = ref(null);

	const tableDefaultSort = {
		prop: config.sort?.sort || '',
		order: config.sort?.order || 'descending',
	};

	const loadData = async (data?: T[]) => {
		if (data) {
			tableData.value = data;
			return;
		}

		if (!config.loadFn) {
			return;
		}

		isLoading.value = true;
		const { success, data: syncData } = await config.loadFn({
			...(search.value ? { search: search.value } : {}),
			...(sortData.sort ? { sort: sortData.sort, order: sortData.order } : {}),
		});
		isLoading.value = false;

		if (!success) {
			tableData.value = [];
		}

		tableData.value = syncData;
	};

	const searchData = async (v: string) => {
		search.value = v;
		await loadData();
	};

	const sortEvent = async (data: { prop: string; order: null | SortParams['order'] }) => {
		const { prop, order } = data;
		if (prop && order) {
			sortData.sort = prop;
			sortData.order = order;
		} else {
			sortData.sort = void 0;
		}

		await loadData();
	};

	const selectEvent = (v: T | T[]) => {
		selected.value = v;
	};

	// 仅初始化 hook 的状态, 本身不会执行任何操作
	const initStatus = () => {
		if (config.sort?.sort && config.sort.order) {
			sortData.sort = config.sort.sort;
			sortData.order = config.sort.order;
		}
	};

	return {
		search,
		isLoading,
		tableData,
		tableDefaultSort,
		selected: computed(() => selected.value),
		loadData,
		searchData,
		sortEvent,
		selectEvent,
		initStatus,
	};
};

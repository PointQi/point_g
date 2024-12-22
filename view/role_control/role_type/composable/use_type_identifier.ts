/**
 * @file 用户类型标识状态
 */

import { computed, ref } from 'vue';
import { getRoleTypeIdentifier } from '../../api';

// 最大标识数位
const MAX_IDENTIFIER = 10;

export const useTypeIdentifier = () => {
	const usedIdentifier = ref<number[]>([]);

	const canUseIdentifier = computed(() => {
		const value = [];
		for (let i = 1; i < MAX_IDENTIFIER; i++) {
			if (!usedIdentifier.value.includes(i)) {
				value.push(i);
			}
		}
		return value;
	});

	const updateTypeIdentifier = async () => {
		const { success, data } = await getRoleTypeIdentifier();
		if (!success) {
			usedIdentifier.value = [];
			return;
		}
		usedIdentifier.value = data;
	};

	return {
		usedIdentifier,
		canUseIdentifier,
		updateTypeIdentifier,
	};
};

/**
 * @file 角色类型删除状态
 */

import { ElMessage, ElMessageBox } from 'element-plus';
import { computed } from 'vue';
import { ACTION_MESSAGE } from '@shared/const/message';
import { deleteRoleTypes } from '../../api';
import type { Ref } from 'vue';
import type { GetRoleTypesReturn } from '../../api';

export const useTypeDelete = (deleted: Ref<GetRoleTypesReturn>) => {
	const deleteIsDisabled = computed(() => !deleted.value.length);

	const deleteType = async () => {
		// 二次确认
		const confirm = await ElMessageBox.confirm(
			`确认删除以下角色类型：${deleted.value.map(item => item.name).join('，')}`,
			'删除',
			{
				confirmButtonText: '确认',
				cancelButtonText: '取消',
			},
		).catch(() => {});

		if (!confirm) {
			return false;
		}

		const ids = deleted.value.map(item => item.id);
		if (!ids.length) {
			return false;
		}

		const { success } = await deleteRoleTypes({ ids });
		if (success) {
			ElMessage({ type: 'success', message: ACTION_MESSAGE.syncSuccess });
		}

		return !!success;
	};

	return {
		deleteIsDisabled,
		deleteType,
	};
};

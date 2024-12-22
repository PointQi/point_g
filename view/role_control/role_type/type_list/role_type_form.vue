<template>
	<div v-loading="isLoading"
		 class="role-type__create-container">
		<p-form label-position="left"
				label-width="auto"
				label-suffix=" : "
				class="form">
			<!-- 编辑名称 -->
			<p-form-item label="名称">
				<p-input v-model="formData.name" />
			</p-form-item>

			<!-- 编辑标识符 -->
			<p-tooltip :disabled="!identifierIsDisable">
				<template #content>
					不支持修改"{{ initData?.name || '-' }}"的标识符
				</template>
				<p-form-item label="标识符">
					<p-select v-model="formData.identifier"
							  :disabled="identifierIsDisable"
							  placeholder="选择标识符">
						<p-option v-for="item of canUseIdentifier"
								  :key="item"
								  :label="item"
								  :value="item" />
					</p-select>
				</p-form-item>
			</p-tooltip>

			<!-- 启用状态 -->
			<p-form-item label="是否启用">
				<p-switch v-model="formData.enabled" />
			</p-form-item>

			<!-- 描述 -->
			<p-form-item label="描述">
				<p-input v-model="formData.description" />
			</p-form-item>
		</p-form>

		<div class="operator-bar">
			<p-button type="primary"
					  @click="submit">
				{{ submitBtnTxt }}
			</p-button>
			<p-button @click="cancel">
				取消
			</p-button>
		</div>
	</div>
</template>

<script lang="ts">
/**
 * @file 角色类型表单
 */

import { computed, defineComponent, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { ACTION_MESSAGE } from '@shared/const/message';
import { createRoleType, updateRoleType } from '../../api';
import { SYSTEM_ROLE_IDENTIFIER } from '../const';
import type { PropType } from 'vue';
import type { GetRoleTypesReturn } from '../../api';

export default defineComponent({
	name: 'RoleTypeForm',
	props: {
		initData: {
			type: Object as PropType<GetRoleTypesReturn[number]>,
		},
		canUseIdentifier: {
			type: Array as PropType<number[]>,
			default: () => [],
		},
		afterSubmit: {
			type: Function as PropType<(status: boolean) => void>,
		},
		cancel: {
			type: Function as PropType<() => void>,
		},
	},
	setup(props) {
		const isLoading = ref(false);

		const isUpdate = computed(() => Boolean(props.initData?.id));

		// 标识符编辑是否禁用
		const identifierIsDisable = computed(() => {
			return props.initData?.identifier === SYSTEM_ROLE_IDENTIFIER;
		})

		const submitBtnTxt = computed(() => {
			if (isUpdate.value) {
				return '更新';
			}
			return '创建';
		});

		const formData = reactive({
			name: props.initData?.name || '',
			identifier: props.initData?.identifier || props.canUseIdentifier[0],
			enabled: Boolean(props.initData?.enabled ?? true),
			description: props.initData?.description || '',
		});

		const create = async () => {
			isLoading.value = true;
			const { success } = await createRoleType(formData);
			isLoading.value = false;

			if (success) {
				ElMessage({ type: 'success', message: ACTION_MESSAGE.syncSuccess });
			}

			props.afterSubmit?.(Boolean(success));
		};

		const update = async () => {
			if (!props.initData?.id) {
				return;
			}

			isLoading.value = true;
			const { success } = await updateRoleType(
				{
					id: props.initData.id,
				},
				formData,
			);
			isLoading.value = false;

			if (success) {
				ElMessage({ type: 'success', message: ACTION_MESSAGE.syncSuccess });
			}

			props.afterSubmit?.(Boolean(success));
		};

		const submit = () => {
			if (isUpdate.value) {
				update();
				return;
			}

			// 没有初始化数据的 ID 则创建该类型
			create();
		};

		return {
			isLoading,
			formData,
			submitBtnTxt,
			identifierIsDisable,
			submit,
		};
	},
});
</script>

<style lang="less">
.role-type__create-container {
	height: 100%;

	.form {
		padding: 64px;
		width: 510px;
	}

	.operator-bar {
		padding: 16px 64px;
		text-align: right;
	}
}
</style>

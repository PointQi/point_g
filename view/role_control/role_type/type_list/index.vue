<template>
	<div class="role-type__list-container">
		<div class="list-toolbar">
			<!-- 创建角色类型 -->
			<p-button :class="{ 'is-show-form': isShowForm }"
					  :disabled="!canUseIdentifier.length"
					  circle
					  plain
					  type="primary"
					  @click="toggleCreateStatus">
				<i class="iconfont icon-add"></i>
			</p-button>

			<!-- 删除角色类型 -->
			<p-tooltip :disabled="!deleteIsDisabled">
				<template #content>
					至少选择一个类型
				</template>
				<p-button :disabled="deleteIsDisabled"
						  circle
						  plain
						  type="danger"
						  @click="deleteTypeFn">
					<i class="iconfont icon-delete"></i>
				</p-button>
			</p-tooltip>


			<p-space class="right">
				<!-- 搜索器 -->
				<p-input v-model="search"
						 class="search-text"
						 placeholder="输入名称"
						 @change="searchData">
					<template #suffix>
						<i class="iconfont icon-search"></i>
					</template>
				</p-input>

				<!-- 刷新按钮 -->
				<p-button :loading="isLoading"
						  circle
						  @click="loadData()">
					<template #icon>
						<i class="iconfont icon-refresh"></i>
					</template>
				</p-button>
			</p-space>
		</div>

		<div class="role-type-list">
			<!-- 表格 -->
			<p-table v-loading="isLoading"
					 :data="tableData"
					 :height="600"
					 :default-sort="tableDefaultSort"
					 @sort-change="sortEvent"
					 @selection-change="selectEvent">
				<p-column :selectable="getSelectable"
						  type="selection"
						  width="55" />

				<!-- 名称 -->
				<p-column prop="name"
						  label="名称" />

				<!-- 标识符: 用来定义字段标识 -->
				<p-column prop="identifier"
						  sortable="custom"
						  label="标识符" />

				<!-- 启用状态 -->
				<p-column prop="enabled"
						  label="启用状态">
					<template #default="{ row }">
						{{ row.enabled ? '已启用' : '已禁用' }}
					</template>
				</p-column>

				<!-- 类型描述 -->
				<p-column prop="description"
						  label="描述" />

				<!-- 创建时间 -->
				<p-column prop="created_at"
						  sortable="custom"
						  label="创建时间">
					<template #default="{ row }">
						{{ formatTime(row.created_at) }}
					</template>
				</p-column>

				<!-- 操作列 -->
				<p-column label="操作">
					<template #default="{ row }">
						<p-button @click="e => updateType(e, row)"> 更新 </p-button>
					</template>
				</p-column>
			</p-table>

			<!-- 创建或编辑表单 -->
			<anime-origin-diffusion :visible="isShowForm"
									:bg-color="bgColor"
									:origin="originPoint"
									class="created-form">
				<role-type-form :init-data="updated"
								:can-use-identifier="canUseIdentifier"
								:after-submit="afterSubmit"
								:cancel="toggleCreateStatus" />
			</anime-origin-diffusion>
		</div>
	</div>
</template>

<script lang="ts">
/**
 * @file 角色类型页
 */

import { computed, defineComponent, onMounted, ref } from 'vue';
import dayjs from 'dayjs';
import { convertToArray } from '@shared/utils/format';
import { useCssVar } from '@vueuse/core';
import { useTableData } from '@shared/composable/use_table_data';
import AnimeOriginDiffusion from '@shared/component/anime/origin_diffusion.vue';
import { GetRoleTypesReturn } from '../../api';
import { getRoleTypes } from '../../api';
import { SYSTEM_ROLE_IDENTIFIER } from '../const';
import { useTypeIdentifier } from '../composable/use_type_identifier';
import RoleTypeForm from './role_type_form.vue';

import { useTypeDelete } from '../composable/use_type_delete'

export default defineComponent({
	name: 'RoleTypeList',
	components: {
		RoleTypeForm,
		AnimeOriginDiffusion,
	},
	setup() {
		const isShowForm = ref(false);

		const search = ref('');

		// 表格状态管理
		const {
			isLoading,
			tableData,
			tableDefaultSort,
			selected,
			searchData,
			loadData,
			sortEvent,
			selectEvent,
			initStatus,
		} = useTableData<GetRoleTypesReturn[number]>({
			sort: { sort: 'identifier', order: 'ascending' },
			loadFn: params => getRoleTypes(params),
		});

		// 待更新类型
		const updated = ref();

		// 删除角色类型
		const { deleteIsDisabled, deleteType } = useTypeDelete(computed(() => convertToArray(selected.value)))

		// 删除后更新类型列表状态
		const deleteTypeFn = async () => {
			const status = await deleteType();
			if (status) {
				loadData();
				updateTypeIdentifier();
			}
		}

		const bgColor = useCssVar('--p-color-primary-light-8', document.documentElement);

		// 类型标识符
		const { canUseIdentifier, updateTypeIdentifier } = useTypeIdentifier();

		const formatTime = (v: string) => {
			return dayjs(v).format('YYYY-MM-DD');
		};

		const toggleCreateStatus = () => {
			updated.value = void 0;
			originPoint.value = void 0;
			isShowForm.value = !isShowForm.value;
		};

		const getSelectable = (row: GetRoleTypesReturn[number]) => {
			return row.identifier !== SYSTEM_ROLE_IDENTIFIER;
		};

		const afterSubmit = (actionStatus: boolean) => {
			if (actionStatus) {
				toggleCreateStatus();
				loadData();
				updateTypeIdentifier();
			}
		};

		const originPoint = ref();
		const updateType = (e: MouseEvent, row: GetRoleTypesReturn[number]) => {
			toggleCreateStatus();
			updated.value = row;
			originPoint.value = [e.clientX, e.clientY];
		};

		const init = () => {
			initStatus();
			loadData();
			updateTypeIdentifier();
		};

		onMounted(() => {
			init();
		});

		return {
			isShowForm,
			search,
			isLoading,
			tableData,
			tableDefaultSort,
			deleteIsDisabled,
			bgColor,
			canUseIdentifier,
			searchData,
			loadData,
			formatTime,
			sortEvent,
			selectEvent,
			toggleCreateStatus,
			getSelectable,
			afterSubmit,
			deleteTypeFn,
			updateType,

			originPoint,
			updated,
		};
	},
});
</script>

<style lang="less" scoped>
.role-type__list-container {
	width: 848px;
	margin: 0 auto;
	padding: 96px 0;

	.list-toolbar {
		display: flex;
		align-items: center;
		padding: 8px;
		border-bottom: 1px solid var(--p-border-color-lighter);

		.right {
			margin-left: auto;
		}
	}

	.search-text {
		width: 200px;
	}

	.is-show-form {
		transform: rotateZ(135deg);
		transition: transform 0.8s ease;
	}

	.role-type-list {
		position: relative;
		border-bottom: 1px solid var(--p-color-primary-light-8);

		.created-form {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			z-index: 110;
		}
	}
}
</style>

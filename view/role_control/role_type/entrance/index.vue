<template>
	<component :is="comp" />
</template>

<script lang="ts">
/**
 * @file 角色类型
 */

import { computed, defineComponent } from 'vue';
import TypeList from '../type_list/index.vue';

export default defineComponent({
	name: 'RoleType',
	setup() {
		const comp = computed(() => {
			return TypeList;
		});

		return {
			comp,
		};
	},
});
</script>

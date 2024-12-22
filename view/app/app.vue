<template>
	<el-config-provider namespace="p">
		<app-layout />
	</el-config-provider>
</template>

<script lang="ts">
/**
 * @file PointG 应用
 */

import { defineComponent } from 'vue';
import AppLayout from './layout/index.vue';

export default defineComponent({
	name: 'PointGApp',
	components: {
		AppLayout,
	},
	setup() { },
});
</script>

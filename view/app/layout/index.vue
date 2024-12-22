<template>
	<div class="point-g__nav">
		<div class="point-g__nav-logo">
			POINT_G
		</div>

		<!-- 顶部导航 -->
		<top-nav />

		<div class="point-g__nav-avatar"></div>
	</div>

	<!-- 视图 -->
	<div class="point-g__content">
		<router-view></router-view>
	</div>
</template>

<script lang="ts">
/**
 * @file 应用框架布局
 */

import { defineComponent } from 'vue';
import TopNav from './top_nav.vue';

export default defineComponent({
	name: 'AppLayout',
	components: {
		TopNav,
	},
	setup() { },
});
</script>

<style lang="less" scoped>
.point-g__nav {
	display: flex;
	align-items: center;
	height: 100px;
	padding: 0px 3em;
	background-color: var(--p-color-primary-light-3);

	.point-g__nav-logo {
		width: 5rem;
		margin-right: auto;
		font-size: 24px;
		font-weight: 500;
	}

	.point-g__nav-avatar {
		width: 64px;
		height: 64px;
		background-color: var(--p-bg-color);
		border-radius: 50%;
		margin-left: 3rem;
	}
}

.point-g__content {
	height: calc(100% - 100px);
}
</style>

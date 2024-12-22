<template>
	<div :style="{ height: `${defaultHeight}px` }"
		 class="pg-empty">
		<img :width="48"
			 :height="48"
			 :src="EmptySvg" />

		<div class="pg-empty__text">
			{{ emptyText }}
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EmptySvg from './empty.svg';

export default defineComponent({
	name: 'PgEmpty',
	props: {
		defaultHeight: {
			type: Number,
			default: 240,
		},
		emptyText: {
			type: String,
			default: '暂无数据',
		},
	},
	setup() {
		return {
			EmptySvg,
		};
	},
});
</script>

<style lang="less">
.pg-empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.pg-empty__text {
		margin-top: 4px;
		color: var(--surface-400);
	}
}
</style>

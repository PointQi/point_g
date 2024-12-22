<template>
	<router-link v-for="route of routes"
				 :key="route.name"
				 :to="{ name: route.name }"
				 class="point-g__nav-label">
		<div class="point-g__nav-en-label">
			{{ route.meta?.enLabel }}
		</div>
		<div class="point-g__nav-zh-label">
			{{ route.meta?.zhLabel }}
		</div>

		<div v-if="route.children"
			 class="point-g__nav-children">
			<router-link v-for="childrenRote of route.children"
						 :key="childrenRote.name"
						 :to="{ name: childrenRote.name }"
						 class="point-g__nav-children-label">
				<div class="prefix-block"></div>
				{{ childrenRote.meta?.zhLabel }}
			</router-link>
		</div>
	</router-link>
</template>

<script lang="ts">
/**
 * @file 顶部导航
 */

import { defineComponent } from 'vue';
import { getRoutes } from '@shared/router';

export default defineComponent({
	name: 'TopNav',
	setup() {
		const routes = getRoutes();

		return {
			routes,
		};
	},
});
</script>

<style lang="less" scoped>
.point-g__nav-label {
	position: relative;
	padding: 6px 8px;
	color: #fff;
	text-decoration: none;
	transition: scale 0.3s ease-in-out;

	.point-g__nav-en-label {
		font-weight: 600;
		font-size: 24px;
	}

	.point-g__nav-zh-label {
		font-size: 16px;
	}

	.point-g__nav-children {
		position: absolute;
		left: -24%;
		top: 100%;
		display: none;
		width: 124%;
		padding: 8px 8px;
		border-radius: 2px;
		background-color: var(--p-color-primary-light-3);
		box-shadow: 0px 0px 8px var(--p-color-primary);

		.point-g__nav-children-label {
			color: #fff;
			text-decoration: none;
			display: block;
			padding: 4px 8px;
			border-radius: 2px;
			transition: color 0.3s ease-in-out;

			.prefix-block {
				display: inline-block;
				width: 2px;
				height: 18px;
				margin-right: 2px;
				vertical-align: text-bottom;
				background-color: var(--p-color-primary-dark-2);
			}

			&:hover {
				color: var(--p-color-primary-dark-2);
			}

			&.router-link-active {
				color: var(--p-color-primary-dark-2);

				.prefix-block {
					background-color: var(--p-color-primary-dark-2);
				}
			}
		}
	}

	&:hover {
		scale: (1.2);

		.point-g__nav-children {
			display: block;
		}
	}

	&.router-link-active {
		color: var(--p-color-primary-dark-2);
	}

	&+.point-g__nav-label {
		margin-left: 3rem;
	}
}
</style>

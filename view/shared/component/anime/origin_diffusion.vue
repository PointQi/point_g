<template>
	<div v-show="realVisible"
		 class="anime-window">
		<transition @enter="enter"
					@leave="leave">
			<div v-if="visible"
				 :style="boxStyle"
				 class="anime-box">
				<div :style="realWinStyle"
					 class="anime-real-window">
					<slot></slot>
				</div>
			</div>
		</transition>
	</div>
</template>

<script lang="ts">
/**
 * @file anime 原点动画组件
 * 能够是元素以一个原点向外直至填充整个空间
 */

import { computed, defineComponent, ref, watch } from 'vue';
import anime from 'animejs';
import { useElementBounding } from '@vueuse/core';
import { getProxyVM } from '@shared/composable/get_proxy_vm';
import type { PropType } from 'vue';

const ANIMATION_TIMES = 1300;

export default defineComponent({
	name: 'AnimeOriginDiffusion',
	props: {
		visible: {
			type: Boolean,
			default: false,
		},
		origin: {
			type: Array as PropType<number[]>,
		},
		bgColor: {
			type: String,
			default: '#fff',
		},
	},
	setup(props) {
		const { proxyVM } = getProxyVM();

		const { x, y, width, height, update } = useElementBounding(() => proxyVM.$el);

		// 组件内部显隐控制
		const realVisible = ref(props.visible);

		// 背景半径
		const r = computed(() => {
			return Math.sqrt(Math.pow(width.value, 2) + Math.pow(height.value, 2));
		});

		// 偏移量
		const offset = computed(() => ({
			x: props.origin?.[0] ? props.origin?.[0] - x.value : 0,
			y: props.origin?.[1] ? props.origin?.[1] - y.value : 0,
		}));

		// 背景盒子样式
		const boxStyle = computed(() => ({
			'background-color': props.bgColor,
			transform: `translate(calc(-50% + ${offset.value.x}px), calc(-50% + ${offset.value.y}px))`,
		}));

		// 真实窗口大小
		const realWinStyle = computed(() => ({
			width: `${width.value}px`,
			height: `${height.value}px`,
			left: `calc(50% - ${offset.value.x}px)`,
			top: `calc(50% - ${offset.value.y}px)`,
		}));

		const enter = (el: SafeAny, done: SafeAny) => {
			update();
			anime({
				targets: el,
				opacity: 1,
				width: [0, `${r.value * 2}px`],
				height: [0, `${r.value * 2}px`],
				easing: 'easeInOutQuad',
				duration: ANIMATION_TIMES,
				complete: done,
			});
		};

		const leave = (el: SafeAny, done: SafeAny) => {
			anime({
				targets: el,
				opacity: 0,
				easing: 'easeInOutQuad',
				duration: ANIMATION_TIMES,
				complete: done,
			});
		};

		// 显隐额外处理: 解决外部盒子需要等待真实窗口动画结束后才更改显隐状态的问题
		const timeId = ref<number>();
		watch(
			() => props.visible,
			v => {
				clearTimeout(timeId.value);
				if (v) {
					realVisible.value = v;
					return;
				}

				timeId.value = setTimeout(() => {
					realVisible.value = v;
					clearTimeout(timeId.value);
				}, ANIMATION_TIMES);
			},
		);

		return {
			realVisible,
			boxStyle,
			realWinStyle,
			enter,
			leave,
		};
	},
});
</script>

<style lang="less">
.anime-window {
	overflow: hidden;

	.anime-box {
		position: relative;
		border-radius: 50%;
		overflow: hidden;
		box-sizing: border-box;

		.anime-real-window {
			position: absolute;
			height: 100%;
		}
	}
}
</style>

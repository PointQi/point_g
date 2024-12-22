export {};

declare module 'vue' {
	export interface GlobalComponents {
		PSpace: (typeof import('element-plus'))['ElSpace'];
		PButton: (typeof import('element-plus'))['ElButton'];
		PForm: (typeof import('element-plus'))['ElForm'];
		PFormItem: (typeof import('element-plus'))['ElFormItem'];
		PForm: (typeof import('element-plus'))['ElFormItem'];
		PInput: (typeof import('element-plus'))['ElInput'];
		PSelect: (typeof import('element-plus'))['ElSelect'];
		POption: (typeof import('element-plus'))['ElOption'];
		PSwitch: (typeof import('element-plus'))['ElSwitch'];
		PTable: (typeof import('element-plus'))['ElTable'];
		PColumn: (typeof import('element-plus'))['ElTableColumn'];
		PDialog: (typeof import('element-plus'))['ElDialog'];
		PTooltip: (typeof import('element-plus'))['ElTooltip'];
	}
}

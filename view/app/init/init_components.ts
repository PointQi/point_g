/**
 * @file 初始化组件库
 */

import {
	ElConfigProvider,
	ElSpace,
	ElButton,
	ElForm,
	ElFormItem,
	ElInput,
	ElSelect,
	ElOption,
	ElSwitch,
	ElTable,
	ElTableColumn,
	ElLoading,
	ElDialog,
	ElTooltip,
} from 'element-plus';
import type { App } from 'vue';

export const initComponents = (app: App) => {
	app.use(ElLoading);

	// 按需引入组件
	app.component('ElConfigProvider', ElConfigProvider);
	app.component('PSpace', ElSpace);
	app.component('PButton', ElButton);
	app.component('PForm', ElForm);
	app.component('PFormItem', ElFormItem);
	app.component('PInput', ElInput);
	app.component('PSelect', ElSelect);
	app.component('POption', ElOption);
	app.component('PSwitch', ElSwitch);
	app.component('PTable', ElTable);
	app.component('PColumn', ElTableColumn);
	app.component('PDialog', ElDialog);
	app.component('PTooltip', ElTooltip);
};

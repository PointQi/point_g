import { getCurrentInstance } from 'vue';

export const getProxyVM = () => {
	const proxyVM = getCurrentInstance()?.proxy;
	if (!proxyVM) {
		throw '当前无法获取实例';
	}

	return { proxyVM };
};

/**
 * @file axios 封装
 */

import Axios from 'axios';
import { ElNotification } from 'element-plus';
import type { AxiosRequestConfig, AxiosResponse, AxiosStatic } from 'axios';

const BASE_URL = 'http://127.0.0.1:5051';

const SUCCESS_CODE = 1;

class AxiosWrapper {
	public axios: AxiosStatic;

	constructor() {
		this.axios = Axios;
		this.initAxios();
	}
	initAxios() {
		this.setBaseOptions();
		this.rewriteMethods();
		this.resInterceptors();
	}

	setBaseOptions() {
		this.axios.defaults.baseURL = BASE_URL;
	}

	request<T, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
		return this.axios(config);
	}

	rewriteMethods() {
		this.axios.delete = (url: string, data: AnyObject = {}, config: AxiosRequestConfig = {}) => {
			Object.assign(config, {
				url,
				data,
				method: 'DELETE',
			});
			return this.request(config);
		};

		(['get', 'head'] as const).forEach(method => {
			this.axios[method] = <T, R = AxiosResponse<T>>(
				url: string,
				data: AnyObject = {},
				config: AxiosRequestConfig = {},
			): Promise<R> => {
				const query = Object.entries(data)
					.filter(([_, v]) => typeof v !== 'undefined' && v !== '')
					.reduce((r, [k, v]) => r + `${k}=${v}&`, '');
				Object.assign(config, {
					url: url + (url.includes('?') ? '&' : '?') + (query.length ? `${query}` : ''),
					method: method.toUpperCase(),
				});
				return this.request(config);
			};
		});
	}

	resInterceptors() {
		this.axios.interceptors.response.use(this.successHandle.bind(this), this.failedHandle.bind(this));
	}

	successHandle(value: AxiosResponse<SafeAny>) {
		const { data } = value;
		const isFailed = data.success !== SUCCESS_CODE;
		if (isFailed) {
			this.errMsg(value?.data?.msg);
		}
		return data;
	}

	failedHandle(error: SafeAny) {
		this.errMsg(error);
		return {
			code: 500,
			data: void 0,
			msg: '',
			success: 0,
		};
	}

	errMsg(msg: string) {
		ElNotification({
			title: '服务异常，请稍后重试',
			message: msg,
			type: 'error',
			position: 'bottom-right',
		});
	}
}

export default new AxiosWrapper().axios;

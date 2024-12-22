import 'axios';

declare module 'axios' {
	export interface AxiosResponse<T> {
		code: number;
		data: T;
		msg?: string;
		success?: number;
	}

	export interface AxiosInstance {
		get<T = SafeAny, R = AxiosResponse<T>>(
			url: string,
			data?: AnyObject,
			config?: AxiosRequestConfig,
		): Promise<R>;
		delete<T = SafeAny, R = AxiosResponse<T>>(
			url: string,
			data?: AnyObject,
			config?: AxiosRequestConfig,
		): Promise<R>;
		head<T = SafeAny, R = AxiosResponse<T>>(
			url: string,
			data?: AnyObject,
			config?: AxiosRequestConfig,
		): Promise<R>;
	}
}

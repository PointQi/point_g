declare global {
	// eslint-disable-next-line
	type SafeAny = any;
	type AnyObject = Record<string, SafeAny>;

	type ApiReturn<T = AnyObject> = {
		code: number;
		data: T;
		msg?: string;
		success?: number;
	};
}

export {};

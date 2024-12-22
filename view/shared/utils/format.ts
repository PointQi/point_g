/**
 * @file 格式化相关工具
 */

/**
 * 转参数为数组, 但以下类型仅返回空数组: `undefined` `null`
 * @param v 任何类型数据
 * @returns 参数对应的类型数组
 */
export const convertToArray = <T>(v: T | T[]) => {
	if (typeof v === 'undefined' || v === null) {
		return [] as never[];
	}

	return (Array.isArray(v) ? v : [v]) as Exclude<T, undefined | null>[];
};

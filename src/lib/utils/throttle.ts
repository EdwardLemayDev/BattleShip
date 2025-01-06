const NULL_RETURN = Symbol('NULL RETURN');

export function useThrottle<ArgsT extends any[], ReturnT>(
	callback: (...args: ArgsT) => ReturnT,
	wait: number
) {
	let cachedReturn: ReturnT | typeof NULL_RETURN = NULL_RETURN;

	return (...args: ArgsT) => {
		if (cachedReturn !== NULL_RETURN) return cachedReturn;

		cachedReturn = callback(...args);
		setTimeout(() => {
			cachedReturn = NULL_RETURN;
		}, wait);

		return cachedReturn;
	};
}

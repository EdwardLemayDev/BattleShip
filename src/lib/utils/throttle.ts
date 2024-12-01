export function useThrottle<ArgsT extends any[], ReturnT>(
	callback: (...args: ArgsT) => ReturnT,
	wait: number
) {
	let cachedReturn: ReturnT | null = null;

	return (...args: ArgsT) => {
		if (cachedReturn) return cachedReturn;

		cachedReturn = callback(...args);
		setTimeout(() => {
			cachedReturn = null;
		}, wait);

		return cachedReturn;
	};
}

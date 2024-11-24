export function useThrottle<ArgsT extends unknown[], ReturnT>(
	callback: (...args: ArgsT) => ReturnT,
	cooldown: number
) {
	let cachedReturn: ReturnT;
	let isPending: boolean = false;

	return (...args: ArgsT) => {
		if (isPending) return cachedReturn;

		cachedReturn = callback(...args);

		isPending = true;
		setTimeout(() => {
			isPending = false;
		}, cooldown);

		return cachedReturn;
	};
}

export function debounce<Callback extends (...args: any[]) => any>(
	timeout: number,
	callback: Callback
) {
	let locked = false;

	return ((...args) => {
		if (locked) return;

		const returnedData = callback(...args);

		locked = true;
		setTimeout(() => {
			locked = false;
		}, timeout);

		return returnedData;
	}) as Callback;
}

import { getContext, hasContext, setContext } from 'svelte';
import type { Prettify } from './Prettify';

export function useContext<ContextT, ArgsT extends any[]>(
	key: string | symbol,
	constructor: (...args: ArgsT) => ContextT
) {
	function initContext(...args: ArgsT): Prettify<ContextT> {
		return setContext(key, constructor(...args));
	}

	function useContext(): Prettify<ContextT> | never {
		if (hasContext(key)) return getContext<ContextT>(key);
		throw new Error(`Context "${key.toString()} is undefined"`);
	}

	return [initContext, useContext] as const;
}

import { getContext, hasContext, setContext } from 'svelte';

export default function strictContext<Type>(key: any = Symbol()) {
	return {
		get: (): Type | never => {
			if (hasContext(key)) return getContext(key);
			throw new Error('Context is undefined');
		},
		set: (context: Type): Type | never => {
			if (hasContext(key)) throw new Error('Context was already set');
			return setContext(key, context);
		}
	};
}

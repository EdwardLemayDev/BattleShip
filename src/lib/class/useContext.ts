import { getContext, hasContext, setContext } from 'svelte';
import type { ClassConstructor } from './GenericConstructor';
import { silentConstructor } from './utils/silentConstructor';

export function useContext<Constructor extends ClassConstructor>(Base: Constructor) {
	type Args = ConstructorParameters<Constructor>;
	type Instance = InstanceType<Constructor>;

	const CONTEXT_KEY = Symbol();

	const ContextConstructor = silentConstructor(Base, function (...args) {
		if (hasContext(CONTEXT_KEY)) {
			throw new Error(`${Base.name} : Context was already set`);
		}

		return setContext(CONTEXT_KEY, new Base(...args)) as Instance;
	});

	return Object.assign(ContextConstructor, {
		fromContext(): Instance | never {
			if (hasContext(CONTEXT_KEY)) return getContext(CONTEXT_KEY);
			throw new Error(`${Base.name} : Context doesn't exist yet`);
		},
		safeFromContext(...args: Args): Instance {
			if (hasContext(CONTEXT_KEY)) return getContext(CONTEXT_KEY);
			return new ContextConstructor(...args) as Instance;
		}
	});
}

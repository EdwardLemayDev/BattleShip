import { getContext, hasContext, setContext } from 'svelte';
import type { ClassConstructor } from './GenericConstructor';
import { silentConstructor } from './utils/silentConstructor';

export function useStrictContext<Constructor extends ClassConstructor>(Base: Constructor) {
	type Args = ConstructorParameters<Constructor>;
	type Instance = InstanceType<Constructor>;

	const CONTEXT_KEY = Symbol(Base.name);

	const ContextConstructor = silentConstructor(Base, function (...args) {
		if (hasContext(CONTEXT_KEY)) {
			throw new Error(`${Base.name}/Context - Instance was already created`);
		}

		return setContext(CONTEXT_KEY, new Base(...args)) as Instance;
	});

	return Object.assign(ContextConstructor, {
		fromContext(): Instance | never {
			if (hasContext(CONTEXT_KEY)) return getContext(CONTEXT_KEY);
			throw new Error(`${Base.name}/Context - Instance doesn't exist yet`);
		},
		safeFromContext(...args: Args): Instance {
			if (hasContext(CONTEXT_KEY)) return getContext(CONTEXT_KEY);
			return new ContextConstructor(...args) as Instance;
		}
	});
}

export type StrictContextMixin<Constructor extends ClassConstructor> = ReturnType<
	typeof useStrictContext<Constructor>
>;

export function useForceContext<Constructor extends ClassConstructor>(Base: Constructor) {
	type Instance = InstanceType<Constructor>;

	const CONTEXT_KEY = Symbol(Base.name);

	return silentConstructor(Base, function (...args) {
		if (hasContext(CONTEXT_KEY)) {
			return getContext(CONTEXT_KEY) as Instance;
		}

		return setContext(CONTEXT_KEY, new Base(...args)) as Instance;
	});
}

export type ForceContextMixin<Constructor extends ClassConstructor> = ReturnType<
	typeof useForceContext<Constructor>
>;

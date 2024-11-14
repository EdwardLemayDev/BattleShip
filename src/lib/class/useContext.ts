import { getContext, hasContext, setContext } from 'svelte';
import { bindConstructor, type ClassConstructor } from './utils/GenericConstructor';

export function useStrictContext<Constructor extends ClassConstructor>(Base: Constructor) {
	type Instance = InstanceType<Constructor>;

	const CONTEXT_KEY = Symbol(Base.name);

	const StrictContextConstructor = bindConstructor(Base, function (...args) {
		return setContext(CONTEXT_KEY, new Base(...args)) as Instance;
	});

	const StrictContextClass = Object.assign(StrictContextConstructor, {
		fromContext(): Instance | never {
			if (hasContext(CONTEXT_KEY)) return getContext(CONTEXT_KEY);
			throw new Error(`${Base.name}/Context - Instance doesn't exist yet`);
		}
	});

	return StrictContextClass;
}

export function useForceContext<Constructor extends ClassConstructor>(Base: Constructor) {
	type Instance = InstanceType<Constructor>;

	const CONTEXT_KEY = Symbol(Base.name);

	const ForceContextConstructor = bindConstructor(Base, function (...args) {
		if (hasContext(CONTEXT_KEY)) {
			return getContext(CONTEXT_KEY) as Instance;
		}

		return setContext(CONTEXT_KEY, new Base(...args)) as Instance;
	});

	return ForceContextConstructor;
}

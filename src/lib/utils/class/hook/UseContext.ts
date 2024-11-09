import { getContext, hasContext, setContext } from 'svelte';
import type { Constructor } from '../Constructor.type';

export function UseContext<BaseT extends Constructor>(Base: BaseT) {
	const KEY = Symbol();

	return class ContextClass extends Base {
		static fromContext<CurrentClass extends typeof Base>(): InstanceType<CurrentClass> | never {
			if (hasContext(KEY)) return getContext(KEY);
			throw new Error('Context is undefined');
		}

		constructor(...args: any[]) {
			super(...args);
			setContext(KEY, this);
		}
	};
}

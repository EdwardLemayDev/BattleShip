import { bindConstructor, type ClassConstructor } from './utils/GenericConstructor';

export const STATE_SYMBOL = Symbol('CUSTOM STATE');

export function useState<Constructor extends ClassConstructor>(Base: Constructor) {
	type Instance = InstanceType<Constructor>;

	const StateConstructor = bindConstructor(Base, function (...args) {
		return transformStates(new Base(...args) as Instance);
	});

	return StateConstructor;
}

function transformStates<T>(original: T) {
	for (const propName of Object.getOwnPropertyNames(original)) {
		if (propName.startsWith('__') || propName === 'constructor') continue;

		const propValue = (original as any)[propName];

		if (typeof propValue !== 'object' || propValue === null) continue;

		if (propValue?.[STATE_SYMBOL]) {
			Object.defineProperty(original, propName, propValue);
		} else {
			transformStates(propValue);
		}
	}

	const parent = Object.getPrototypeOf(original);
	if (parent) transformStates(parent);

	return original;
}

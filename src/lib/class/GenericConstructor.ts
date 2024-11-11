export type ClassConstructor<Args extends any[] = any[], Instance extends {} = {}> = {
	new (...args: Args): Instance;
	prototype: Object;
};

export type MixinConstructor<Args extends any[] = any[], Instance extends {} = {}> = {
	(...args: Args): Instance;
	prototype: Object;
};

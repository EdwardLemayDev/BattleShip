export type ClassConstructor<Args extends any[] = any[], Instance extends {} = {}> = {
	new (...args: Args): Instance;
	prototype: Object;
};

export type MixinConstructor<Args extends any[] = any[], Instance extends {} = {}> = {
	(...args: Args): Instance;
	prototype: Object;
};

export function bindConstructor<
	BaseConstructor extends ClassConstructor,
	NewConstructor extends MixinConstructor<
		ConstructorParameters<BaseConstructor>,
		InstanceType<BaseConstructor>
	>
>(
	Base: BaseConstructor,
	New: NewConstructor
): ClassConstructor<ConstructorParameters<BaseConstructor>, ReturnType<NewConstructor>>;

export function bindConstructor<
	BaseConstructor extends ClassConstructor,
	NewConstructor extends MixinConstructor<
		ConstructorParameters<BaseConstructor>,
		InstanceType<BaseConstructor>
	>,
	Prototype extends Object
>(
	Base: BaseConstructor,
	New: NewConstructor,
	proto?: Prototype
): ClassConstructor<ConstructorParameters<BaseConstructor>, ReturnType<NewConstructor> & Prototype>;

export function bindConstructor<
	BaseConstructor extends ClassConstructor,
	NewConstructor extends MixinConstructor<
		ConstructorParameters<BaseConstructor>,
		InstanceType<BaseConstructor>
	>,
	Prototype extends Object
>(Base: BaseConstructor, New: NewConstructor, proto?: Prototype) {
	const prototype = proto ? Object.setPrototypeOf(proto, Base.prototype) : Base.prototype;

	const Constructor = function (...args: any) {
		return Object.setPrototypeOf((New as any)(...args), prototype);
	} as unknown as BaseConstructor;

	Constructor.prototype = prototype;
	delete (Constructor as any).name;
	Object.setPrototypeOf(Constructor, Base);

	return Constructor;
}

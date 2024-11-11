import type { ClassConstructor, MixinConstructor } from '../GenericConstructor';

export function silentConstructor<BaseConstructor extends ClassConstructor>(
	Base: BaseConstructor,
	Mixin: MixinConstructor<ConstructorParameters<BaseConstructor>, InstanceType<BaseConstructor>>
) {
	Mixin.prototype = Base.prototype;
	delete (Mixin as any).name;
	Object.setPrototypeOf(Mixin, Base);
	return Mixin as unknown as BaseConstructor;
}

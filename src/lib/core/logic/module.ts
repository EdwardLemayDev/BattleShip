import type { Action, FSMLifecycle, FSMLifecycleFn } from 'runed';
import type { CoreEvents, CoreInstance, CoreLogic, CoreStates } from '../Core.svelte';

export type CoreAction = Action<CoreStates>;

export type CoreTransition<
	StatesT extends string = CoreStates,
	EventsT extends string = CoreEvents
> = {
	[s in StatesT]: {
		[e in EventsT]?: CoreAction;
	} & {
		[k in FSMLifecycle]?: FSMLifecycleFn<CoreStates, CoreEvents>;
	};
};

export type ModuleContext = {
	readonly core: CoreInstance;
	readonly send: CoreLogic['send'];
	readonly debounce: CoreLogic['debounce'];
};

export type ApiType<FnT extends (...args: any[]) => readonly any[]> = InstanceType<
	ReturnType<FnT>[1]
>;

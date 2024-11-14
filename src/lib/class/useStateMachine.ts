import { bindConstructor, type ClassConstructor } from './utils/GenericConstructor';

export type StateMachineEvents<
	Instance,
	States extends string = string,
	Events extends string = string
> = {
	[Event in Events]: {
		[State in States]?: (this: Instance) => States;
	};
};

export type StateMachineEventError<
	States extends string = string,
	Events extends string = string
> = {
	state: null;
	event: {
		name: Events;
		from: States;
	};
};

export type StateMachineStateError<
	States extends string = string,
	Events extends string = string
> = {
	state: {
		from: States;
		to: any;
		during: Events;
	};
	event: null;
};

export type StateMachineError<States extends string = string, Events extends string = string> =
	| StateMachineEventError<States, Events>
	| StateMachineStateError<States, Events>;

const STATE = Symbol('FSM_CURRENT_STATE');

type StateMachineInternal<Base, States extends string = string> = Base & {
	[STATE]: States;
};

export function useStateMachine<
	Constructor extends ClassConstructor,
	States extends string,
	Events extends string
>(
	Base: Constructor,
	{
		states,
		events,
		update,
		catch: catchCallback
	}: {
		states: States[];
		events: StateMachineEvents<InstanceType<Constructor>, States, Events>;
		update: (this: InstanceType<Constructor>, state: States) => void;
		catch?: (this: InstanceType<Constructor>, error: StateMachineError<States, Events>) => void;
	}
) {
	type Instance = InstanceType<Constructor>;

	const error = catchCallback ?? defaultError;

	const StateMachineConstructor = bindConstructor(
		Base,
		function (...args) {
			const base = new Base(...args) as Instance;

			(base as any)[STATE] = states[0];
			update.call(base, states[0]);

			return base;
		},
		{
			dispatch(event: Events) {
				const internal = this as unknown as StateMachineInternal<Instance, States>;

				if (!(event in events) || !(internal[STATE] in events[event])) {
					error.call(this as Instance, {
						state: null,
						event: {
							name: event,
							from: internal[STATE]
						}
					});
					return;
				}

				const newState = events[event][internal[STATE]]?.call(this as Instance);

				if (newState === undefined || !states.includes(newState)) {
					error.call(this as Instance, {
						state: {
							from: internal[STATE],
							to: newState,
							during: event
						},
						event: null
					});
					return;
				}

				internal[STATE] = newState;
				update.call(this as Instance, newState);
			}
		}
	);

	return StateMachineConstructor;
}

const defaultError: <Instance, States extends string = string, Events extends string = string>(
	this: Instance,
	error: StateMachineError<States, Events>
) => void = ({ state, event }) => {
	if (state) {
		throw new Error(
			`Invalid state change from state:${state.from} to state:${state.to} during event:${state.during}`
		);
	}
	throw new Error(`Invalid dispatch of event:${event.name} from state:${event.from}`);
};

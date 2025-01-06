import { FiniteStateMachine, type FSMLifecycle, type FSMLifecycleFn } from 'runed';
import { untrack } from 'svelte';

/**
 * Enhanced wrapper for Runed's `FiniteStateMachine`.
 *
 * ### Modifications:
 * - Events are now typed as `string | [string, ...unknown[]]`, enabling the specification of arguments.
 * - Actions must now be functions returning a State; direct `string` values are no longer permitted.
 * - Renamed `this.current` to `this.state` for improved clarity and consistency.
 * - `this.send()` and `this.debounce()` are now generic functions, enforcing type safety for arguments associated with the specified event.
 *
 * @see {@link https://runed.dev/docs/utilities/finite-state-machine}
 *
 * @todo Enable type safety for LifeCycle functions
 *
 * @EdwardLemayDev
 */
export class SvelteStateMachine<
	StatesT extends SvelteStateMachine.State,
	EventsT extends SvelteStateMachine.Event
> {
	#internal: FiniteStateMachine<
		'__new__' | StatesT,
		'__init__' | SvelteStateMachine.Event.Name<EventsT>
	>;

	constructor(initial: StatesT, transition: SvelteStateMachine.Transition<StatesT, EventsT>) {
		this.#internal = new FiniteStateMachine<
			'__new__' | StatesT,
			'__init__' | SvelteStateMachine.Event.Name<EventsT>
		>('__new__', {
			__new__: { __init__: initial },
			...(transition as any)
		});
	}

	/** The current state. */
	get state() {
		return this.#internal.current as StatesT;
	}

	/** Start the state machine. */
	init() {
		if (this.state === '__new__') this.#internal.send('__init__');
	}

	/**
	 * Check if an event can be triggered.
	 * @param event The event's name
	 */
	canTrigger(event: SvelteStateMachine.Event.Name<EventsT>) {
		return (
			event in this.#internal.states[this.state] ||
			(this.#internal.states['*'] !== undefined && event in this.#internal.states['*'])
		);
	}

	/**
	 * Triggers a new event.
	 * @param event The event's name
	 * @param args The event's arguments
	 * @returns The new state
	 */
	send<EventT extends SvelteStateMachine.Event.Name<EventsT>>(
		event: EventT,
		...args: SvelteStateMachine.Event.Args<EventsT, EventT>
	) {
		return untrack(() => this.#internal.send(event, ...args)) as StatesT;
	}

	/**
	 * Debounces the triggering of an event.
	 * @param wait Time to wait for trigger
	 * @param event The event's name
	 * @param args The event's arguments
	 * @returns The new state
	 */
	debounce<EventT extends SvelteStateMachine.Event.Name<EventsT>>(
		wait: number | undefined,
		event: EventT,
		...args: SvelteStateMachine.Event.Args<EventsT, EventT>
	) {
		return untrack(() => this.#internal.debounce(wait, event, ...args)) as Promise<StatesT>;
	}
}

export namespace SvelteStateMachine {
	export type State<StateT extends string = string> = StateT;

	export type Event<
		EventT extends string | [string, ...unknown[]] = string | [string, ...unknown[]]
	> = EventT;

	export namespace Event {
		export type Object<EventT extends Event = Event> = EventT extends [
			infer NameT extends string,
			...infer ArgsT extends unknown[]
		]
			? { [E in NameT]: ArgsT }
			: { [E in Extract<EventT, string>]: [] };

		export type Name<EventT extends Event = Event> = EventT extends [infer NameT, ...unknown[]]
			? NameT
			: EventT;

		export type Args<EventT extends Event, KeyT extends keyof any> = Extract<
			Object<EventT>,
			Record<KeyT, unknown>
		>[KeyT];
	}

	export type Action<StateT extends State, ArgsT extends unknown[]> = (
		...args: ArgsT
	) => StateT | void;

	export type EventHandler<StateT extends State, EventT extends Event.Object> = {
		[E in keyof EventT]?: Action<StateT, EventT[E]>;
	};

	export type StateHandler<StateT extends State, EventT extends Event> = EventHandler<
		StateT,
		Event.Object<EventT>
	> & {
		[L in FSMLifecycle]?: FSMLifecycleFn<StateT, Event.Name<EventT>>;
	};

	export type Transition<StateT extends State, EventT extends Event> = {
		[S in StateT]: StateHandler<StateT, EventT>;
	} & {
		'*'?: StateHandler<StateT, EventT>;
	};
}

export type FsmConfig<State extends string, Action extends string> = {
	initial: State;
	states: {
		[SK in State]: {
			[AK in Action]?: () => State;
		};
	};
	update: (state: State) => void;
	catch?: (error: FsmActionError<State, Action> | FsmStateError<State, Action>) => void;
};

export type FsmActionError<State extends string, Action extends string> = {
	state: null;
	action: {
		call: Action;
		from: State;
	};
};

export type FsmStateError<State extends string, Action extends string> = {
	state: {
		from: State;
		to: State;
		during: Action;
	};
	action: null;
};

export default function createFsm<State extends string, Action extends string>({
	initial,
	states,
	update,
	catch: catchCallback
}: FsmConfig<State, Action>) {
	const hasCatchCallback = typeof catchCallback !== 'undefined';

	let currState = initial;
	update(currState);

	return (action: Action) => {
		const actionCallback = states[currState]?.[action];

		if (typeof actionCallback === 'undefined') {
			if (hasCatchCallback) {
				return catchCallback({ action: { from: currState, call: action }, state: null });
			}

			throw new Error(`Fsm - Invalid Action call\n > State: ${currState}\n > Action: ${action}`);
		}

		const newState = actionCallback() ?? currState;

		if (typeof states?.[newState] === 'undefined') {
			if (hasCatchCallback) {
				return catchCallback({
					state: { from: currState, to: newState, during: action },
					action: null
				});
			}

			throw new Error(
				`Fsm - Invalid State value\n > From: ${currState}\n > To: ${newState}\n > During: ${action}`
			);
		}

		currState = newState;
		update(newState);
	};
}

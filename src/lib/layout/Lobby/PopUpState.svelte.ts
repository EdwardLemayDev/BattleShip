import { FiniteStateMachine } from 'runed';
import { getContext, hasContext, setContext } from 'svelte';

const CONTEXT_KEY = Symbol('PopUp Context');

export type PopUpStates = 'closed' | 'PvE' | 'PvP';

export type PopUpEvents = `open.${'PvE' | 'PvP'}` | 'close';

export function initPopUp() {
	const popUp = new FiniteStateMachine<PopUpStates, PopUpEvents>('closed', {
		closed: {
			'open.PvE': 'PvE',
			'open.PvP': 'PvP'
		},
		PvE: { close: 'closed' },
		PvP: { close: 'closed' }
	});

	return setContext(CONTEXT_KEY, popUp);
}

export function usePopUp() {
	if (hasContext(CONTEXT_KEY)) return getContext<ReturnType<typeof initPopUp>>(CONTEXT_KEY);
	throw new Error("PopUp instance wasn't created yet");
}

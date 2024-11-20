import { getContext, hasContext, setContext } from 'svelte';
import { initGame } from './Game.svelte';
import { initGui } from './Gui.svelte';

const CONTEXT_KEY = Symbol('Core Context');

class Core {
	readonly game = initGame();
	readonly gui = initGui();
}

export function initCore() {
	const core = new Core();
	return setContext(CONTEXT_KEY, core);
}

export function useCore() {
	if (hasContext(CONTEXT_KEY)) return getContext<ReturnType<typeof initCore>>(CONTEXT_KEY);
	throw new Error("Core instance wasn't created yet");
}

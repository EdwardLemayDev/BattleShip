import { IS_DEV } from '$lib/const';
import { DevLogic } from './Private_DevLogic.svelte';
import DevComponent from './Private_DevMenu.svelte';
import ProdComponent from './Private_ProdMenu.svelte';

export const Dev = IS_DEV && DevLogic;

export const DevMenu = IS_DEV ? DevComponent : ProdComponent;

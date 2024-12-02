export type Prettify<T> = {
	[K in keyof T]: T[K];
} & unknown;

export type PrettyReturnType<T extends (...args: any) => any> = Prettify<
	T extends (...args: any) => infer R ? R : any
>;

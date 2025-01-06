export type Prettify<T> = T extends Function
	? T
	: T extends {}
		? {
				[K in keyof T]: Prettify<T[K]>;
			} & unknown
		: T;

export type PrettyReturnType<T extends (...args: any) => any> = Prettify<
	T extends (...args: any) => infer R ? R : any
>;

export type PrettyInstanceType<T extends abstract new (...args: any) => any> =
	T extends abstract new (...args: any) => infer R ? Prettify<R> : any;

// Union manipulation

// type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
// 	? I
// 	: never;

// type UnionToObject<U> = {
// 	[K in keyof UnionToIntersection<U>]: UnionToIntersection<U>[K];
// };

import assoc from './assoc';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
  ? true
  : false;
type Expect<T extends true> = T;
type Simplify<T> = { [K in keyof T]: T[K] };

const base: { a: number; b: number } = { a: 1, b: 2 };
const addKey = assoc('c', 3, base);
const updateKey = assoc('a', 'x', base);

const list: string[] = ['a', 'b', 'c'];
const updateIndex = assoc(1, 'x', list);
const updateIndexMixed = assoc(1, 1, list);

export type Assoc_AddKey = Expect<
  Equal<Simplify<typeof addKey>, { a: number; b: number; c: number }>
>;
export type Assoc_UpdateKey = Expect<
  Equal<Simplify<typeof updateKey>, { a: string; b: number }>
>;
export type Assoc_UpdateIndex = Expect<Equal<Simplify<typeof updateIndex>, string[]>>;
export type Assoc_UpdateIndexMixed = Expect<
  Equal<Simplify<typeof updateIndexMixed>, Array<string | number>>
>;

// Generic curry inference (4-5 arity)
import curry from '../composition/curry';

const generic4 = <A, B, C, D>(a: A, b: B, c: C, d: D) => [a, b, c, d] as const;
const curried4 = curry(generic4<number, string, boolean, null>);
export const curry4Result: readonly [number, string, boolean, null] = curried4(1)('two')(true)(null);

const generic5 = <A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E) => [a, b, c, d, e] as const;
const curried5 = curry(generic5<number, string, boolean, null, undefined>);
export const curry5Result: readonly [number, string, boolean, null, undefined] =
  curried5(1)('two')(true)(null)(undefined);

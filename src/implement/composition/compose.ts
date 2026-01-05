/**
 * compose - 함수를 우→좌로 합성
 */

import type { FromFn } from './from';

type UnaryFn<A, R> = (a: A) => R;
type ZeroFn<R> = () => R;
type ComposeInput<Fns extends UnaryFn<any, any>[]> = Fns extends [...UnaryFn<any, any>[], UnaryFn<infer A, any>]
  ? A
  : never;
type ComposeOutput<Fns extends UnaryFn<any, any>[]> = Fns extends [UnaryFn<any, infer R>]
  ? R
  : Fns extends [UnaryFn<infer A, infer R>, ...infer Rest]
    ? Rest extends [UnaryFn<any, any>, ...UnaryFn<any, any>[]]
      ? ComposeOutput<Rest> extends A
        ? R
        : never
      : never
    : never;
type Compose<Fns extends UnaryFn<any, any>[]> = (input: ComposeInput<Fns>) => ComposeOutput<Fns>;
type ComposeFrom<Fns extends [...UnaryFn<any, any>[], FromFn<any>]> = (input?: ComposeInput<Fns>) => ComposeOutput<Fns>;

function compose<R>(ab: ZeroFn<R>): () => R;
function compose<B, R>(ab: UnaryFn<B, R>, bc: ZeroFn<B>): () => R;
function compose<C, B, R>(ab: UnaryFn<B, R>, bc: UnaryFn<C, B>, cd: ZeroFn<C>): () => R;
function compose<D, C, B, R>(ab: UnaryFn<B, R>, bc: UnaryFn<C, B>, cd: UnaryFn<D, C>, de: ZeroFn<D>): () => R;
function compose<E, D, C, B, R>(
  ab: UnaryFn<B, R>,
  bc: UnaryFn<C, B>,
  cd: UnaryFn<D, C>,
  de: UnaryFn<E, D>,
  ef: ZeroFn<E>
): () => R;
function compose<F, E, D, C, B, R>(
  ab: UnaryFn<B, R>,
  bc: UnaryFn<C, B>,
  cd: UnaryFn<D, C>,
  de: UnaryFn<E, D>,
  ef: UnaryFn<F, E>,
  fg: ZeroFn<F>
): () => R;
function compose<G, F, E, D, C, B, R>(
  ab: UnaryFn<B, R>,
  bc: UnaryFn<C, B>,
  cd: UnaryFn<D, C>,
  de: UnaryFn<E, D>,
  ef: UnaryFn<F, E>,
  fg: UnaryFn<G, F>,
  gh: ZeroFn<G>
): () => R;
function compose<H, G, F, E, D, C, B, R>(
  ab: UnaryFn<B, R>,
  bc: UnaryFn<C, B>,
  cd: UnaryFn<D, C>,
  de: UnaryFn<E, D>,
  ef: UnaryFn<F, E>,
  fg: UnaryFn<G, F>,
  gh: UnaryFn<H, G>,
  hi: ZeroFn<H>
): () => R;
function compose<I, H, G, F, E, D, C, B, R>(
  ab: UnaryFn<B, R>,
  bc: UnaryFn<C, B>,
  cd: UnaryFn<D, C>,
  de: UnaryFn<E, D>,
  ef: UnaryFn<F, E>,
  fg: UnaryFn<G, F>,
  gh: UnaryFn<H, G>,
  hi: UnaryFn<I, H>,
  ij: ZeroFn<I>
): () => R;
function compose<J, I, H, G, F, E, D, C, B, R>(
  ab: UnaryFn<B, R>,
  bc: UnaryFn<C, B>,
  cd: UnaryFn<D, C>,
  de: UnaryFn<E, D>,
  ef: UnaryFn<F, E>,
  fg: UnaryFn<G, F>,
  gh: UnaryFn<H, G>,
  hi: UnaryFn<I, H>,
  ij: UnaryFn<J, I>,
  jk: ZeroFn<J>
): () => R;

function compose<Fns extends [...UnaryFn<any, any>[], FromFn<any>]>(...funcs: Fns): ComposeFrom<Fns>;
function compose<A, R>(ab: UnaryFn<A, R>): (a: A) => R;
function compose<A, B, R>(ab: UnaryFn<B, R>, bc: UnaryFn<A, B>): (a: A) => R;
function compose<A, B, C, R>(ab: UnaryFn<C, R>, bc: UnaryFn<B, C>, cd: UnaryFn<A, B>): (a: A) => R;
function compose<A, B, C, D, R>(
  ab: UnaryFn<D, R>,
  bc: UnaryFn<C, D>,
  cd: UnaryFn<B, C>,
  de: UnaryFn<A, B>
): (a: A) => R;
function compose<A, B, C, D, E, R>(
  ab: UnaryFn<E, R>,
  bc: UnaryFn<D, E>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<B, C>,
  ef: UnaryFn<A, B>
): (a: A) => R;
function compose<A, B, C, D, E, F, R>(
  ab: UnaryFn<F, R>,
  bc: UnaryFn<E, F>,
  cd: UnaryFn<D, E>,
  de: UnaryFn<C, D>,
  ef: UnaryFn<B, C>,
  fg: UnaryFn<A, B>
): (a: A) => R;
function compose<A, B, C, D, E, F, G, R>(
  ab: UnaryFn<G, R>,
  bc: UnaryFn<F, G>,
  cd: UnaryFn<E, F>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<C, D>,
  fg: UnaryFn<B, C>,
  gh: UnaryFn<A, B>
): (a: A) => R;
function compose<A, B, C, D, E, F, G, H, R>(
  ab: UnaryFn<H, R>,
  bc: UnaryFn<G, H>,
  cd: UnaryFn<F, G>,
  de: UnaryFn<E, F>,
  ef: UnaryFn<D, E>,
  fg: UnaryFn<C, D>,
  gh: UnaryFn<B, C>,
  hi: UnaryFn<A, B>
): (a: A) => R;
function compose<A, B, C, D, E, F, G, H, I, R>(
  ab: UnaryFn<I, R>,
  bc: UnaryFn<H, I>,
  cd: UnaryFn<G, H>,
  de: UnaryFn<F, G>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<D, E>,
  gh: UnaryFn<C, D>,
  hi: UnaryFn<B, C>,
  ij: UnaryFn<A, B>
): (a: A) => R;
function compose<A, B, C, D, E, F, G, H, I, J, R>(
  ab: UnaryFn<J, R>,
  bc: UnaryFn<I, J>,
  cd: UnaryFn<H, I>,
  de: UnaryFn<G, H>,
  ef: UnaryFn<F, G>,
  fg: UnaryFn<E, F>,
  gh: UnaryFn<D, E>,
  hi: UnaryFn<C, D>,
  ij: UnaryFn<B, C>,
  jk: UnaryFn<A, B>
): (a: A) => R;

function compose<Fns extends [UnaryFn<any, any>, ...UnaryFn<any, any>[]]>(...funcs: Fns): Compose<Fns>;
function compose(...funcs: Array<UnaryFn<any, any>>): (input: any) => any;
function compose(...funcs: Array<(...args: any[]) => any>) {
  return (value: any) => funcs.reduceRight((acc, fn) => fn(acc), value);
}

export default compose;

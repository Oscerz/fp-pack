import SideEffect, { isSideEffect } from './sideEffect';

type MaybeSideEffect<T> = T | SideEffect<any>;
type NonSideEffect<T> = Exclude<T, SideEffect<any>>;
type UnaryFn<A, R> = (a: A) => MaybeSideEffect<R>;
type ZeroFn<R> = () => MaybeSideEffect<R>;
type PipeInput<Fns extends UnaryFn<any, any>[]> = Fns extends [UnaryFn<infer A, any>, ...UnaryFn<any, any>[]]
  ? A
  : never;
type PipeOutput<Fns extends UnaryFn<any, any>[]> = Fns extends [UnaryFn<any, infer R>]
  ? MaybeSideEffect<R>
  : Fns extends [UnaryFn<any, infer R>, ...infer Rest]
    ? Rest extends [UnaryFn<NonSideEffect<R>, any>, ...UnaryFn<any, any>[]]
      ? PipeOutput<Rest>
      : never
    : never;
type Resolve<T> = T extends infer R ? R : never;
type PipeSideEffect<Fns extends UnaryFn<any, any>[]> = (
  input: PipeInput<Fns> | SideEffect<any>
) => Resolve<PipeOutput<Fns>>;

function pipeSideEffect<R>(ab: ZeroFn<R>): () => MaybeSideEffect<R>;
function pipeSideEffect<B, R>(ab: ZeroFn<B>, bc: UnaryFn<B, R>): () => MaybeSideEffect<R>;
function pipeSideEffect<B, C, R>(ab: ZeroFn<B>, bc: UnaryFn<B, C>, cd: UnaryFn<C, R>): () => MaybeSideEffect<R>;
function pipeSideEffect<B, C, D, R>(
  ab: ZeroFn<B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, R>
): () => MaybeSideEffect<R>;
function pipeSideEffect<B, C, D, E, R>(
  ab: ZeroFn<B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, R>
): () => MaybeSideEffect<R>;
function pipeSideEffect<B, C, D, E, F, R>(
  ab: ZeroFn<B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, R>
): () => MaybeSideEffect<R>;
function pipeSideEffect<B, C, D, E, F, G, R>(
  ab: ZeroFn<B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, R>
): () => MaybeSideEffect<R>;
function pipeSideEffect<B, C, D, E, F, G, H, R>(
  ab: ZeroFn<B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, H>,
  hi: UnaryFn<H, R>
): () => MaybeSideEffect<R>;
function pipeSideEffect<B, C, D, E, F, G, H, I, R>(
  ab: ZeroFn<B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, H>,
  hi: UnaryFn<H, I>,
  ij: UnaryFn<I, R>
): () => MaybeSideEffect<R>;
function pipeSideEffect<B, C, D, E, F, G, H, I, J, R>(
  ab: ZeroFn<B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, H>,
  hi: UnaryFn<H, I>,
  ij: UnaryFn<I, J>,
  jk: UnaryFn<J, R>
): () => MaybeSideEffect<R>;
function pipeSideEffect<A, R>(ab: UnaryFn<A, R>): (a: A | SideEffect<any>) => MaybeSideEffect<R>;
function pipeSideEffect<A, B, R>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, R>
): (a: A | SideEffect<any>) => MaybeSideEffect<R>;
function pipeSideEffect<A, B, C, R>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, R>
): (a: A | SideEffect<any>) => MaybeSideEffect<R>;
function pipeSideEffect<A, B, C, D, R>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, R>
): (a: A | SideEffect<any>) => MaybeSideEffect<R>;
function pipeSideEffect<A, B, C, D, E, R>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, R>
): (a: A | SideEffect<any>) => MaybeSideEffect<R>;
function pipeSideEffect<A, B, C, D, E, F, R>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, R>
): (a: A | SideEffect<any>) => MaybeSideEffect<R>;
function pipeSideEffect<A, B, C, D, E, F, G, R>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, R>
): (a: A | SideEffect<any>) => MaybeSideEffect<R>;
function pipeSideEffect<A, B, C, D, E, F, G, H, R>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, H>,
  hi: UnaryFn<H, R>
): (a: A | SideEffect<any>) => MaybeSideEffect<R>;
function pipeSideEffect<A, B, C, D, E, F, G, H, I, R>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, H>,
  hi: UnaryFn<H, I>,
  ij: UnaryFn<I, R>
): (a: A | SideEffect<any>) => MaybeSideEffect<R>;
function pipeSideEffect<A, B, C, D, E, F, G, H, I, J, R>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<B, C>,
  cd: UnaryFn<C, D>,
  de: UnaryFn<D, E>,
  ef: UnaryFn<E, F>,
  fg: UnaryFn<F, G>,
  gh: UnaryFn<G, H>,
  hi: UnaryFn<H, I>,
  ij: UnaryFn<I, J>,
  jk: UnaryFn<J, R>
): (a: A | SideEffect<any>) => MaybeSideEffect<R>;

function pipeSideEffect<Fns extends [UnaryFn<any, any>, ...UnaryFn<any, any>[]]>(...funcs: Fns): PipeSideEffect<Fns>;
function pipeSideEffect(...funcs: Array<UnaryFn<any, any>>): (input: any) => any;
function pipeSideEffect(...funcs: Array<(input: any) => any>) {
  return (init: any) => {
    let acc = init;
    for (const fn of funcs) {
      if (isSideEffect(acc)) {
        return acc;
      }
      acc = fn(acc);
    }
    return acc;
  };
}

export default pipeSideEffect;

import type { FromFn } from './from';
import SideEffect, { isSideEffect } from './sideEffect';

type AnyFn = (...args: any[]) => any;
type MaybeSideEffect<T> = T | SideEffect<any>;
type NonSideEffect<T> = Exclude<T, SideEffect<any>>;
type UnaryFn<A, R> = (a: A) => MaybeSideEffect<R>;
type ZeroFn<R> = () => MaybeSideEffect<R>;
type PipeError<From, To> = { __pipe_side_effect_error: ['pipeSideEffect', From, '->', To] };
type FnInput<F> = F extends (a: infer A) => any ? A : never;
type FnValue<F> = F extends (...args: any[]) => infer R ? NonSideEffect<R> : never;
type PipeCheckResult<Fns extends [AnyFn, ...AnyFn[]]> =
  Fns extends [infer F, infer G, ...infer Rest]
    ? F extends AnyFn
      ? G extends AnyFn
        ? [FnValue<F>] extends [FnInput<G>]
          ? Rest extends AnyFn[]
            ? PipeCheckResult<[G, ...Rest]>
            : true
          : PipeError<FnValue<F>, FnInput<G>>
        : PipeError<FnValue<F>, FnInput<G>>
      : PipeError<unknown, unknown>
    : true;
type PipeCheck<Fns extends [AnyFn, ...AnyFn[]]> =
  Fns & (PipeCheckResult<Fns> extends true ? unknown : PipeCheckResult<Fns>);
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
type PipeSideEffectFrom<Fns extends [FromFn<any>, ...UnaryFn<any, any>[]]> = (
  input?: PipeInput<Fns> | SideEffect<any>
) => Resolve<PipeOutput<Fns>>;

function pipeSideEffect<R>(...funcs: PipeCheck<[ZeroFn<R>]>): () => MaybeSideEffect<R>;
function pipeSideEffect<B, R>(...funcs: PipeCheck<[ZeroFn<B>, UnaryFn<B, R>]>): () => MaybeSideEffect<R>;
function pipeSideEffect<B, C, R>(
  ...funcs: PipeCheck<[ZeroFn<B>, UnaryFn<B, C>, UnaryFn<C, R>]>
): () => MaybeSideEffect<R>;
function pipeSideEffect<B, C, D, R>(
  ...funcs: PipeCheck<[ZeroFn<B>, UnaryFn<B, C>, UnaryFn<C, D>, UnaryFn<D, R>]>
): () => MaybeSideEffect<R>;
function pipeSideEffect<B, C, D, E, R>(
  ...funcs: PipeCheck<[ZeroFn<B>, UnaryFn<B, C>, UnaryFn<C, D>, UnaryFn<D, E>, UnaryFn<E, R>]>
): () => MaybeSideEffect<R>;
function pipeSideEffect<B, C, D, E, F, R>(
  ...funcs: PipeCheck<[ZeroFn<B>, UnaryFn<B, C>, UnaryFn<C, D>, UnaryFn<D, E>, UnaryFn<E, F>, UnaryFn<F, R>]>
): () => MaybeSideEffect<R>;
function pipeSideEffect<B, C, D, E, F, G, R>(
  ...funcs: PipeCheck<[
    ZeroFn<B>,
    UnaryFn<B, C>,
    UnaryFn<C, D>,
    UnaryFn<D, E>,
    UnaryFn<E, F>,
    UnaryFn<F, G>,
    UnaryFn<G, R>
  ]>
): () => MaybeSideEffect<R>;
function pipeSideEffect<B, C, D, E, F, G, H, R>(
  ...funcs: PipeCheck<[
    ZeroFn<B>,
    UnaryFn<B, C>,
    UnaryFn<C, D>,
    UnaryFn<D, E>,
    UnaryFn<E, F>,
    UnaryFn<F, G>,
    UnaryFn<G, H>,
    UnaryFn<H, R>
  ]>
): () => MaybeSideEffect<R>;
function pipeSideEffect<B, C, D, E, F, G, H, I, R>(
  ...funcs: PipeCheck<[
    ZeroFn<B>,
    UnaryFn<B, C>,
    UnaryFn<C, D>,
    UnaryFn<D, E>,
    UnaryFn<E, F>,
    UnaryFn<F, G>,
    UnaryFn<G, H>,
    UnaryFn<H, I>,
    UnaryFn<I, R>
  ]>
): () => MaybeSideEffect<R>;
function pipeSideEffect<B, C, D, E, F, G, H, I, J, R>(
  ...funcs: PipeCheck<[
    ZeroFn<B>,
    UnaryFn<B, C>,
    UnaryFn<C, D>,
    UnaryFn<D, E>,
    UnaryFn<E, F>,
    UnaryFn<F, G>,
    UnaryFn<G, H>,
    UnaryFn<H, I>,
    UnaryFn<I, J>,
    UnaryFn<J, R>
  ]>
): () => MaybeSideEffect<R>;
function pipeSideEffect<Fns extends [FromFn<any>, ...UnaryFn<any, any>[]]>(
  ...funcs: PipeCheck<Fns>
): PipeSideEffectFrom<Fns>;
function pipeSideEffect<A, R>(...funcs: PipeCheck<[UnaryFn<A, R>]>): (a: A | SideEffect<any>) => MaybeSideEffect<R>;
function pipeSideEffect<A, B, R>(
  ...funcs: PipeCheck<[UnaryFn<A, B>, UnaryFn<B, R>]>
): (a: A | SideEffect<any>) => MaybeSideEffect<R>;
function pipeSideEffect<A, B, C, R>(
  ...funcs: PipeCheck<[UnaryFn<A, B>, UnaryFn<B, C>, UnaryFn<C, R>]>
): (a: A | SideEffect<any>) => MaybeSideEffect<R>;
function pipeSideEffect<A, B, C, D, R>(
  ...funcs: PipeCheck<[UnaryFn<A, B>, UnaryFn<B, C>, UnaryFn<C, D>, UnaryFn<D, R>]>
): (a: A | SideEffect<any>) => MaybeSideEffect<R>;
function pipeSideEffect<A, B, C, D, E, R>(
  ...funcs: PipeCheck<[UnaryFn<A, B>, UnaryFn<B, C>, UnaryFn<C, D>, UnaryFn<D, E>, UnaryFn<E, R>]>
): (a: A | SideEffect<any>) => MaybeSideEffect<R>;
function pipeSideEffect<A, B, C, D, E, F, R>(
  ...funcs: PipeCheck<[UnaryFn<A, B>, UnaryFn<B, C>, UnaryFn<C, D>, UnaryFn<D, E>, UnaryFn<E, F>, UnaryFn<F, R>]>
): (a: A | SideEffect<any>) => MaybeSideEffect<R>;
function pipeSideEffect<A, B, C, D, E, F, G, R>(
  ...funcs: PipeCheck<[
    UnaryFn<A, B>,
    UnaryFn<B, C>,
    UnaryFn<C, D>,
    UnaryFn<D, E>,
    UnaryFn<E, F>,
    UnaryFn<F, G>,
    UnaryFn<G, R>
  ]>
): (a: A | SideEffect<any>) => MaybeSideEffect<R>;
function pipeSideEffect<A, B, C, D, E, F, G, H, R>(
  ...funcs: PipeCheck<[
    UnaryFn<A, B>,
    UnaryFn<B, C>,
    UnaryFn<C, D>,
    UnaryFn<D, E>,
    UnaryFn<E, F>,
    UnaryFn<F, G>,
    UnaryFn<G, H>,
    UnaryFn<H, R>
  ]>
): (a: A | SideEffect<any>) => MaybeSideEffect<R>;
function pipeSideEffect<A, B, C, D, E, F, G, H, I, R>(
  ...funcs: PipeCheck<[
    UnaryFn<A, B>,
    UnaryFn<B, C>,
    UnaryFn<C, D>,
    UnaryFn<D, E>,
    UnaryFn<E, F>,
    UnaryFn<F, G>,
    UnaryFn<G, H>,
    UnaryFn<H, I>,
    UnaryFn<I, R>
  ]>
): (a: A | SideEffect<any>) => MaybeSideEffect<R>;
function pipeSideEffect<A, B, C, D, E, F, G, H, I, J, R>(
  ...funcs: PipeCheck<[
    UnaryFn<A, B>,
    UnaryFn<B, C>,
    UnaryFn<C, D>,
    UnaryFn<D, E>,
    UnaryFn<E, F>,
    UnaryFn<F, G>,
    UnaryFn<G, H>,
    UnaryFn<H, I>,
    UnaryFn<I, J>,
    UnaryFn<J, R>
  ]>
): (a: A | SideEffect<any>) => MaybeSideEffect<R>;

function pipeSideEffect<Fns extends [UnaryFn<any, any>, ...UnaryFn<any, any>[]]>(
  ...funcs: PipeCheck<Fns>
): PipeSideEffect<Fns>;
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

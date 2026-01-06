import type { FromFn } from '../composition/from';
import SideEffect, { isSideEffect } from '../composition/sideEffect';

/** pipeAsyncSideEffect - SideEffect를 허용하는 비동기 함수 합성 */
type AnyFn = (...args: any[]) => any;
type MaybeSideEffect<T> = T | SideEffect<any>;
type NonSideEffect<T> = Exclude<T, SideEffect<any>>;
type AsyncOrSync<A, R> = (a: A) => MaybeSideEffect<R> | Promise<MaybeSideEffect<R>>;
type FirstAsyncOrSync<A, R> = AsyncOrSync<A, R> & { __from?: never };
type ZeroFn<R> = () => MaybeSideEffect<R> | Promise<MaybeSideEffect<R>>;
type PipeError<From, To> = { __pipe_async_side_effect_error: ['pipeAsyncSideEffect', From, '->', To] };
type FnInput<F> = F extends (a: infer A) => any ? A : never;
type FnValue<F> = F extends (...args: any[]) => infer R ? NonSideEffect<Awaited<R>> : never;
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
type PipeInput<Fns extends AsyncOrSync<any, any>[]> = Fns extends [
  AsyncOrSync<infer A, any>,
  ...AsyncOrSync<any, any>[]
]
  ? A
  : never;
type PipeOutput<Fns extends AsyncOrSync<any, any>[]> = Fns extends [AsyncOrSync<any, infer R>]
  ? MaybeSideEffect<Awaited<R>>
  : Fns extends [AsyncOrSync<any, infer R>, ...infer Rest]
    ? Rest extends [AsyncOrSync<Awaited<NonSideEffect<R>>, any>, ...AsyncOrSync<any, any>[]]
      ? PipeOutput<Rest>
      : never
    : never;
type Resolve<T> = T extends infer R ? R : never;
type PipeAsyncSideEffect<Fns extends AsyncOrSync<any, any>[]> = (
  input: PipeInput<Fns> | SideEffect<any>
) => Promise<Resolve<PipeOutput<Fns>>>;
type PipeAsyncSideEffectFrom<Fns extends [FromFn<any>, ...AsyncOrSync<any, any>[]]> = (
  input?: PipeInput<Fns> | SideEffect<any>
) => Promise<Resolve<PipeOutput<Fns>>>;

function pipeAsyncSideEffect<Fns extends [FromFn<any>, ...AsyncOrSync<any, any>[]]>(
  ...funcs: PipeCheck<Fns>
): PipeAsyncSideEffectFrom<Fns>;
function pipeAsyncSideEffect<R>(...funcs: PipeCheck<[ZeroFn<R>]>): () => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<B, R>(
  ...funcs: PipeCheck<[ZeroFn<B>, AsyncOrSync<Awaited<B>, R>]>
): () => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<B, C, R>(
  ...funcs: PipeCheck<[ZeroFn<B>, AsyncOrSync<Awaited<B>, C>, AsyncOrSync<Awaited<C>, R>]>
): () => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<B, C, D, R>(
  ...funcs: PipeCheck<[ZeroFn<B>, AsyncOrSync<Awaited<B>, C>, AsyncOrSync<Awaited<C>, D>, AsyncOrSync<Awaited<D>, R>]>
): () => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<B, C, D, E, R>(
  ...funcs: PipeCheck<[
    ZeroFn<B>,
    AsyncOrSync<Awaited<B>, C>,
    AsyncOrSync<Awaited<C>, D>,
    AsyncOrSync<Awaited<D>, E>,
    AsyncOrSync<Awaited<E>, R>
  ]>
): () => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<B, C, D, E, F, R>(
  ...funcs: PipeCheck<[
    ZeroFn<B>,
    AsyncOrSync<Awaited<B>, C>,
    AsyncOrSync<Awaited<C>, D>,
    AsyncOrSync<Awaited<D>, E>,
    AsyncOrSync<Awaited<E>, F>,
    AsyncOrSync<Awaited<F>, R>
  ]>
): () => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<B, C, D, E, F, G, R>(
  ...funcs: PipeCheck<[
    ZeroFn<B>,
    AsyncOrSync<Awaited<B>, C>,
    AsyncOrSync<Awaited<C>, D>,
    AsyncOrSync<Awaited<D>, E>,
    AsyncOrSync<Awaited<E>, F>,
    AsyncOrSync<Awaited<F>, G>,
    AsyncOrSync<Awaited<G>, R>
  ]>
): () => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<B, C, D, E, F, G, H, R>(
  ...funcs: PipeCheck<[
    ZeroFn<B>,
    AsyncOrSync<Awaited<B>, C>,
    AsyncOrSync<Awaited<C>, D>,
    AsyncOrSync<Awaited<D>, E>,
    AsyncOrSync<Awaited<E>, F>,
    AsyncOrSync<Awaited<F>, G>,
    AsyncOrSync<Awaited<G>, H>,
    AsyncOrSync<Awaited<H>, R>
  ]>
): () => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<B, C, D, E, F, G, H, I, R>(
  ...funcs: PipeCheck<[
    ZeroFn<B>,
    AsyncOrSync<Awaited<B>, C>,
    AsyncOrSync<Awaited<C>, D>,
    AsyncOrSync<Awaited<D>, E>,
    AsyncOrSync<Awaited<E>, F>,
    AsyncOrSync<Awaited<F>, G>,
    AsyncOrSync<Awaited<G>, H>,
    AsyncOrSync<Awaited<H>, I>,
    AsyncOrSync<Awaited<I>, R>
  ]>
): () => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<B, C, D, E, F, G, H, I, J, R>(
  ...funcs: PipeCheck<[
    ZeroFn<B>,
    AsyncOrSync<Awaited<B>, C>,
    AsyncOrSync<Awaited<C>, D>,
    AsyncOrSync<Awaited<D>, E>,
    AsyncOrSync<Awaited<E>, F>,
    AsyncOrSync<Awaited<F>, G>,
    AsyncOrSync<Awaited<G>, H>,
    AsyncOrSync<Awaited<H>, I>,
    AsyncOrSync<Awaited<I>, J>,
    AsyncOrSync<Awaited<J>, R>
  ]>
): () => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<A, R>(
  ...funcs: PipeCheck<[FirstAsyncOrSync<A, R>]>
): (a: A | SideEffect<any>) => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<A, B, R>(
  ...funcs: PipeCheck<[FirstAsyncOrSync<A, B>, AsyncOrSync<Awaited<B>, R>]>
): (a: A | SideEffect<any>) => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<A, B, C, R>(
  ...funcs: PipeCheck<[FirstAsyncOrSync<A, B>, AsyncOrSync<Awaited<B>, C>, AsyncOrSync<Awaited<C>, R>]>
): (a: A | SideEffect<any>) => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<A, B, C, D, R>(
  ...funcs: PipeCheck<[
    FirstAsyncOrSync<A, B>,
    AsyncOrSync<Awaited<B>, C>,
    AsyncOrSync<Awaited<C>, D>,
    AsyncOrSync<Awaited<D>, R>
  ]>
): (a: A | SideEffect<any>) => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<A, B, C, D, E, R>(
  ...funcs: PipeCheck<[
    FirstAsyncOrSync<A, B>,
    AsyncOrSync<Awaited<B>, C>,
    AsyncOrSync<Awaited<C>, D>,
    AsyncOrSync<Awaited<D>, E>,
    AsyncOrSync<Awaited<E>, R>
  ]>
): (a: A | SideEffect<any>) => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<A, B, C, D, E, F, R>(
  ...funcs: PipeCheck<[
    FirstAsyncOrSync<A, B>,
    AsyncOrSync<Awaited<B>, C>,
    AsyncOrSync<Awaited<C>, D>,
    AsyncOrSync<Awaited<D>, E>,
    AsyncOrSync<Awaited<E>, F>,
    AsyncOrSync<Awaited<F>, R>
  ]>
): (a: A | SideEffect<any>) => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<A, B, C, D, E, F, G, R>(
  ...funcs: PipeCheck<[
    FirstAsyncOrSync<A, B>,
    AsyncOrSync<Awaited<B>, C>,
    AsyncOrSync<Awaited<C>, D>,
    AsyncOrSync<Awaited<D>, E>,
    AsyncOrSync<Awaited<E>, F>,
    AsyncOrSync<Awaited<F>, G>,
    AsyncOrSync<Awaited<G>, R>
  ]>
): (a: A | SideEffect<any>) => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<A, B, C, D, E, F, G, H, R>(
  ...funcs: PipeCheck<[
    FirstAsyncOrSync<A, B>,
    AsyncOrSync<Awaited<B>, C>,
    AsyncOrSync<Awaited<C>, D>,
    AsyncOrSync<Awaited<D>, E>,
    AsyncOrSync<Awaited<E>, F>,
    AsyncOrSync<Awaited<F>, G>,
    AsyncOrSync<Awaited<G>, H>,
    AsyncOrSync<Awaited<H>, R>
  ]>
): (a: A | SideEffect<any>) => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<A, B, C, D, E, F, G, H, I, R>(
  ...funcs: PipeCheck<[
    FirstAsyncOrSync<A, B>,
    AsyncOrSync<Awaited<B>, C>,
    AsyncOrSync<Awaited<C>, D>,
    AsyncOrSync<Awaited<D>, E>,
    AsyncOrSync<Awaited<E>, F>,
    AsyncOrSync<Awaited<F>, G>,
    AsyncOrSync<Awaited<G>, H>,
    AsyncOrSync<Awaited<H>, I>,
    AsyncOrSync<Awaited<I>, R>
  ]>
): (a: A | SideEffect<any>) => Promise<MaybeSideEffect<Awaited<R>>>;
function pipeAsyncSideEffect<A, B, C, D, E, F, G, H, I, J, R>(
  ...funcs: PipeCheck<[
    FirstAsyncOrSync<A, B>,
    AsyncOrSync<Awaited<B>, C>,
    AsyncOrSync<Awaited<C>, D>,
    AsyncOrSync<Awaited<D>, E>,
    AsyncOrSync<Awaited<E>, F>,
    AsyncOrSync<Awaited<F>, G>,
    AsyncOrSync<Awaited<G>, H>,
    AsyncOrSync<Awaited<H>, I>,
    AsyncOrSync<Awaited<I>, J>,
    AsyncOrSync<Awaited<J>, R>
  ]>
): (a: A | SideEffect<any>) => Promise<MaybeSideEffect<Awaited<R>>>;

function pipeAsyncSideEffect<Fns extends [FirstAsyncOrSync<any, any>, ...AsyncOrSync<any, any>[]]>(
  ...funcs: PipeCheck<Fns>
): PipeAsyncSideEffect<Fns>;
function pipeAsyncSideEffect(...funcs: Array<AsyncOrSync<any, any>>): (value: any) => Promise<any>;
function pipeAsyncSideEffect(...funcs: Array<(arg: any) => any>) {
  return async (value: any) => {
    let acc = value;
    for (const fn of funcs) {
      if (isSideEffect(acc)) {
        return acc;
      }
      acc = await fn(acc);
    }
    return acc;
  };
}

export default pipeAsyncSideEffect;

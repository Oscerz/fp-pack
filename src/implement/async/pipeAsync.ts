import type { FromFn } from '../composition/from';

/** pipeAsync - 비동기 함수 합성 */
type AnyFn = (...args: any[]) => any;
type AsyncOrSync<A, R> = (a: A) => R | Promise<R>;
type ZeroFn<R> = () => R | Promise<R>;
type PipeError<From, To> = { __pipe_async_error: ['pipeAsync', From, '->', To] };
type FnInput<F> = F extends (a: infer A) => any ? A : never;
type FnValue<F> = F extends (...args: any[]) => infer R ? Awaited<R> : never;
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
type PipeInput<Fns extends AsyncOrSync<any, any>[]> = Fns extends [AsyncOrSync<infer A, any>, ...AsyncOrSync<any, any>[]]
  ? A
  : never;
type PipeOutput<Fns extends AsyncOrSync<any, any>[]> = Fns extends [AsyncOrSync<any, infer R>]
  ? Awaited<R>
  : Fns extends [AsyncOrSync<any, infer R>, ...infer Rest]
    ? Rest extends [AsyncOrSync<Awaited<R>, any>, ...AsyncOrSync<any, any>[]]
      ? PipeOutput<Rest>
      : never
    : never;
type PipeAsync<Fns extends AsyncOrSync<any, any>[]> = (input: PipeInput<Fns>) => Promise<PipeOutput<Fns>>;
type PipeAsyncFrom<Fns extends [FromFn<any>, ...AsyncOrSync<any, any>[]]> = (
  input?: PipeInput<Fns>
) => Promise<PipeOutput<Fns>>;

function pipeAsync<R>(...funcs: PipeCheck<[ZeroFn<R>]>): () => Promise<Awaited<R>>;
function pipeAsync<B, R>(
  ...funcs: PipeCheck<[ZeroFn<B>, AsyncOrSync<Awaited<B>, R>]>
): () => Promise<Awaited<R>>;
function pipeAsync<B, C, R>(
  ...funcs: PipeCheck<[ZeroFn<B>, AsyncOrSync<Awaited<B>, C>, AsyncOrSync<Awaited<C>, R>]>
): () => Promise<Awaited<R>>;
function pipeAsync<B, C, D, R>(
  ...funcs: PipeCheck<[ZeroFn<B>, AsyncOrSync<Awaited<B>, C>, AsyncOrSync<Awaited<C>, D>, AsyncOrSync<Awaited<D>, R>]>
): () => Promise<Awaited<R>>;
function pipeAsync<B, C, D, E, R>(
  ...funcs: PipeCheck<[
    ZeroFn<B>,
    AsyncOrSync<Awaited<B>, C>,
    AsyncOrSync<Awaited<C>, D>,
    AsyncOrSync<Awaited<D>, E>,
    AsyncOrSync<Awaited<E>, R>
  ]>
): () => Promise<Awaited<R>>;
function pipeAsync<B, C, D, E, F, R>(
  ...funcs: PipeCheck<[
    ZeroFn<B>,
    AsyncOrSync<Awaited<B>, C>,
    AsyncOrSync<Awaited<C>, D>,
    AsyncOrSync<Awaited<D>, E>,
    AsyncOrSync<Awaited<E>, F>,
    AsyncOrSync<Awaited<F>, R>
  ]>
): () => Promise<Awaited<R>>;
function pipeAsync<B, C, D, E, F, G, R>(
  ...funcs: PipeCheck<[
    ZeroFn<B>,
    AsyncOrSync<Awaited<B>, C>,
    AsyncOrSync<Awaited<C>, D>,
    AsyncOrSync<Awaited<D>, E>,
    AsyncOrSync<Awaited<E>, F>,
    AsyncOrSync<Awaited<F>, G>,
    AsyncOrSync<Awaited<G>, R>
  ]>
): () => Promise<Awaited<R>>;
function pipeAsync<B, C, D, E, F, G, H, R>(
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
): () => Promise<Awaited<R>>;
function pipeAsync<B, C, D, E, F, G, H, I, R>(
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
): () => Promise<Awaited<R>>;
function pipeAsync<B, C, D, E, F, G, H, I, J, R>(
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
): () => Promise<Awaited<R>>;
function pipeAsync<Fns extends [FromFn<any>, ...AsyncOrSync<any, any>[]]>(...funcs: PipeCheck<Fns>): PipeAsyncFrom<Fns>;
function pipeAsync<A, R>(...funcs: PipeCheck<[AsyncOrSync<A, R>]>): (a: A) => Promise<Awaited<R>>;
function pipeAsync<A, B, R>(
  ...funcs: PipeCheck<[AsyncOrSync<A, B>, AsyncOrSync<Awaited<B>, R>]>
): (a: A) => Promise<Awaited<R>>;
function pipeAsync<A, B, C, R>(
  ...funcs: PipeCheck<[AsyncOrSync<A, B>, AsyncOrSync<Awaited<B>, C>, AsyncOrSync<Awaited<C>, R>]>
): (a: A) => Promise<Awaited<R>>;
function pipeAsync<A, B, C, D, R>(
  ...funcs: PipeCheck<[AsyncOrSync<A, B>, AsyncOrSync<Awaited<B>, C>, AsyncOrSync<Awaited<C>, D>, AsyncOrSync<Awaited<D>, R>]>
): (a: A) => Promise<Awaited<R>>;
function pipeAsync<A, B, C, D, E, R>(
  ...funcs: PipeCheck<[
    AsyncOrSync<A, B>,
    AsyncOrSync<Awaited<B>, C>,
    AsyncOrSync<Awaited<C>, D>,
    AsyncOrSync<Awaited<D>, E>,
    AsyncOrSync<Awaited<E>, R>
  ]>
): (a: A) => Promise<Awaited<R>>;
function pipeAsync<A, B, C, D, E, F, R>(
  ...funcs: PipeCheck<[
    AsyncOrSync<A, B>,
    AsyncOrSync<Awaited<B>, C>,
    AsyncOrSync<Awaited<C>, D>,
    AsyncOrSync<Awaited<D>, E>,
    AsyncOrSync<Awaited<E>, F>,
    AsyncOrSync<Awaited<F>, R>
  ]>
): (a: A) => Promise<Awaited<R>>;
function pipeAsync<A, B, C, D, E, F, G, R>(
  ...funcs: PipeCheck<[
    AsyncOrSync<A, B>,
    AsyncOrSync<Awaited<B>, C>,
    AsyncOrSync<Awaited<C>, D>,
    AsyncOrSync<Awaited<D>, E>,
    AsyncOrSync<Awaited<E>, F>,
    AsyncOrSync<Awaited<F>, G>,
    AsyncOrSync<Awaited<G>, R>
  ]>
): (a: A) => Promise<Awaited<R>>;
function pipeAsync<A, B, C, D, E, F, G, H, R>(
  ...funcs: PipeCheck<[
    AsyncOrSync<A, B>,
    AsyncOrSync<Awaited<B>, C>,
    AsyncOrSync<Awaited<C>, D>,
    AsyncOrSync<Awaited<D>, E>,
    AsyncOrSync<Awaited<E>, F>,
    AsyncOrSync<Awaited<F>, G>,
    AsyncOrSync<Awaited<G>, H>,
    AsyncOrSync<Awaited<H>, R>
  ]>
): (a: A) => Promise<Awaited<R>>;
function pipeAsync<A, B, C, D, E, F, G, H, I, R>(
  ...funcs: PipeCheck<[
    AsyncOrSync<A, B>,
    AsyncOrSync<Awaited<B>, C>,
    AsyncOrSync<Awaited<C>, D>,
    AsyncOrSync<Awaited<D>, E>,
    AsyncOrSync<Awaited<E>, F>,
    AsyncOrSync<Awaited<F>, G>,
    AsyncOrSync<Awaited<G>, H>,
    AsyncOrSync<Awaited<H>, I>,
    AsyncOrSync<Awaited<I>, R>
  ]>
): (a: A) => Promise<Awaited<R>>;
function pipeAsync<A, B, C, D, E, F, G, H, I, J, R>(
  ...funcs: PipeCheck<[
    AsyncOrSync<A, B>,
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
): (a: A) => Promise<Awaited<R>>;

function pipeAsync<Fns extends [AsyncOrSync<any, any>, ...AsyncOrSync<any, any>[]]>(...funcs: PipeCheck<Fns>): PipeAsync<Fns>;
function pipeAsync(...funcs: Array<AsyncOrSync<any, any>>): (value: any) => Promise<any>;
function pipeAsync(...funcs: Array<(arg: any) => any>) {
  return async (value: any) => {
    let acc = value;
    for (const fn of funcs) {
      acc = await fn(acc);
    }
    return acc;
  };
}

export default pipeAsync;

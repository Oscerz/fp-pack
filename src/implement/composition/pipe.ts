import type { FromFn } from './from';

type AnyFn = (...args: any[]) => any;
type UnaryFn<A, R> = (a: A) => R;
type ZeroFn<R> = () => R;
type PipeError<From, To> = { __pipe_error: ['pipe', From, '->', To] };
type FnInput<F> = F extends (a: infer A) => any ? A : never;
type FnOutput<F> = F extends (...args: any[]) => infer R ? R : never;
type PipeCheckResult<Fns extends [AnyFn, ...AnyFn[]]> =
  Fns extends [infer F, infer G, ...infer Rest]
    ? F extends AnyFn
      ? G extends AnyFn
        ? [FnOutput<F>] extends [FnInput<G>]
          ? Rest extends AnyFn[]
            ? PipeCheckResult<[G, ...Rest]>
            : true
          : PipeError<FnOutput<F>, FnInput<G>>
        : PipeError<FnOutput<F>, FnInput<G>>
      : PipeError<unknown, unknown>
    : true;
type PipeCheck<Fns extends [AnyFn, ...AnyFn[]]> =
  Fns & (PipeCheckResult<Fns> extends true ? unknown : PipeCheckResult<Fns>);
type PipeInput<Fns extends UnaryFn<any, any>[]> = Fns extends [UnaryFn<infer A, any>, ...UnaryFn<any, any>[]]
  ? A
  : never;
type PipeOutput<Fns extends UnaryFn<any, any>[]> = Fns extends [UnaryFn<any, infer R>]
  ? R
  : Fns extends [UnaryFn<any, infer R>, ...infer Rest]
    ? Rest extends [UnaryFn<R, any>, ...UnaryFn<any, any>[]]
      ? PipeOutput<Rest>
      : never
    : never;
type Pipe<Fns extends UnaryFn<any, any>[]> = (input: PipeInput<Fns>) => PipeOutput<Fns>;
type PipeFrom<Fns extends [FromFn<any>, ...UnaryFn<any, any>[]]> = (input?: PipeInput<Fns>) => PipeOutput<Fns>;

function pipe<R>(...funcs: PipeCheck<[ZeroFn<R>]>): () => R;
function pipe<B, R>(...funcs: PipeCheck<[ZeroFn<B>, UnaryFn<B, R>]>): () => R;
function pipe<B, C, R>(...funcs: PipeCheck<[ZeroFn<B>, UnaryFn<B, C>, UnaryFn<C, R>]>): () => R;
function pipe<B, C, D, R>(
  ...funcs: PipeCheck<[ZeroFn<B>, UnaryFn<B, C>, UnaryFn<C, D>, UnaryFn<D, R>]>
): () => R;
function pipe<B, C, D, E, R>(
  ...funcs: PipeCheck<[ZeroFn<B>, UnaryFn<B, C>, UnaryFn<C, D>, UnaryFn<D, E>, UnaryFn<E, R>]>
): () => R;
function pipe<B, C, D, E, F, R>(
  ...funcs: PipeCheck<[ZeroFn<B>, UnaryFn<B, C>, UnaryFn<C, D>, UnaryFn<D, E>, UnaryFn<E, F>, UnaryFn<F, R>]>
): () => R;
function pipe<B, C, D, E, F, G, R>(
  ...funcs: PipeCheck<[
    ZeroFn<B>,
    UnaryFn<B, C>,
    UnaryFn<C, D>,
    UnaryFn<D, E>,
    UnaryFn<E, F>,
    UnaryFn<F, G>,
    UnaryFn<G, R>
  ]>
): () => R;
function pipe<B, C, D, E, F, G, H, R>(
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
): () => R;
function pipe<B, C, D, E, F, G, H, I, R>(
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
): () => R;
function pipe<B, C, D, E, F, G, H, I, J, R>(
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
): () => R;
function pipe<Fns extends [FromFn<any>, ...UnaryFn<any, any>[]]>(...funcs: PipeCheck<Fns>): PipeFrom<Fns>;
function pipe<A, R>(...funcs: PipeCheck<[UnaryFn<A, R>]>): (a: A) => R;
function pipe<A, B, R>(...funcs: PipeCheck<[UnaryFn<A, B>, UnaryFn<B, R>]>): (a: A) => R;
function pipe<A, B, C, R>(...funcs: PipeCheck<[UnaryFn<A, B>, UnaryFn<B, C>, UnaryFn<C, R>]>): (a: A) => R;
function pipe<A, B, C, D, R>(
  ...funcs: PipeCheck<[UnaryFn<A, B>, UnaryFn<B, C>, UnaryFn<C, D>, UnaryFn<D, R>]>
): (a: A) => R;
function pipe<A, B, C, D, E, R>(
  ...funcs: PipeCheck<[UnaryFn<A, B>, UnaryFn<B, C>, UnaryFn<C, D>, UnaryFn<D, E>, UnaryFn<E, R>]>
): (a: A) => R;
function pipe<A, B, C, D, E, F, R>(
  ...funcs: PipeCheck<[UnaryFn<A, B>, UnaryFn<B, C>, UnaryFn<C, D>, UnaryFn<D, E>, UnaryFn<E, F>, UnaryFn<F, R>]>
): (a: A) => R;
function pipe<A, B, C, D, E, F, G, R>(
  ...funcs: PipeCheck<[
    UnaryFn<A, B>,
    UnaryFn<B, C>,
    UnaryFn<C, D>,
    UnaryFn<D, E>,
    UnaryFn<E, F>,
    UnaryFn<F, G>,
    UnaryFn<G, R>
  ]>
): (a: A) => R;
function pipe<A, B, C, D, E, F, G, H, R>(
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
): (a: A) => R;
function pipe<A, B, C, D, E, F, G, H, I, R>(
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
): (a: A) => R;
function pipe<A, B, C, D, E, F, G, H, I, J, R>(
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
): (a: A) => R;

function pipe<Fns extends [UnaryFn<any, any>, ...UnaryFn<any, any>[]]>(...funcs: PipeCheck<Fns>): Pipe<Fns>;
function pipe(...funcs: Array<UnaryFn<any, any>>): (input: any) => any;
function pipe(...funcs: Array<(input: any) => any>) {
  return (init: any) => {
    return funcs.reduce((acc, fn) => fn(acc), init);
  };
}

export default pipe;

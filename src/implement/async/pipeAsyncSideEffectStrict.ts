import type { FromFn } from '../composition/from';
import SideEffect, { isSideEffect } from '../composition/sideEffect';

type AnyFn = (...args: any[]) => any;
type MaybeSideEffect<T, E> = T | SideEffect<E>;
type NonSideEffect<T> = Exclude<T, SideEffect<any>>;
type AsyncOrSync<A, R> = (a: A) => R | Promise<R>;
type ZeroFn<R> = () => R | Promise<R>;
type PipeError<From, To> = { __pipe_async_side_effect_strict_error: ['pipeAsyncSideEffectStrict', From, '->', To] };
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

type EffectOfReturn<R> = R extends SideEffect<infer E> ? E : never;
type EffectOfFn<F> = F extends (...args: any[]) => infer R ? EffectOfReturn<Awaited<R>> : never;
type EffectsOf<Fns extends AnyFn[]> = EffectOfFn<Fns[number]>;

type PipeValueOutputUnary<Fns extends AsyncOrSync<any, any>[]> = Fns extends [AsyncOrSync<any, infer R>]
  ? NonSideEffect<Awaited<R>>
  : Fns extends [AsyncOrSync<any, infer R>, ...infer Rest]
    ? Rest extends [AsyncOrSync<NonSideEffect<Awaited<R>>, any>, ...AsyncOrSync<any, any>[]]
      ? PipeValueOutputUnary<Rest>
      : never
    : never;

type PipeValueOutputStrict<Fns extends [AnyFn, ...AnyFn[]]> =
  Fns extends [ZeroFn<infer R>]
    ? NonSideEffect<Awaited<R>>
    : Fns extends [ZeroFn<infer R>, ...infer Rest]
      ? Rest extends [AsyncOrSync<NonSideEffect<Awaited<R>>, any>, ...AsyncOrSync<any, any>[]]
        ? PipeValueOutputUnary<Rest>
        : never
      : Fns extends [AsyncOrSync<any, any>, ...AsyncOrSync<any, any>[]]
        ? PipeValueOutputUnary<Fns>
        : never;

type PipeInputStrict<Fns extends [AnyFn, ...AnyFn[]]> = Fns extends [ZeroFn<any>, ...AnyFn[]]
  ? never
  : Fns extends [AsyncOrSync<infer A, any>, ...AnyFn[]]
    ? A
    : never;

type Resolve<T> = T extends infer R ? R : never;

type PipeAsyncSideEffectStrictUnary<Fns extends [AnyFn, ...AnyFn[]]> = {
  (input: PipeInputStrict<Fns>): Promise<Resolve<MaybeSideEffect<PipeValueOutputStrict<Fns>, EffectsOf<Fns>>>>;
  <EIn>(
    input: PipeInputStrict<Fns> | SideEffect<EIn>
  ): Promise<Resolve<MaybeSideEffect<PipeValueOutputStrict<Fns>, EffectsOf<Fns> | EIn>>>;
};
type PipeAsyncSideEffectStrictUnaryOptional<Fns extends [AnyFn, ...AnyFn[]]> = {
  (input?: PipeInputStrict<Fns>): Promise<Resolve<MaybeSideEffect<PipeValueOutputStrict<Fns>, EffectsOf<Fns>>>>;
  <EIn>(
    input?: PipeInputStrict<Fns> | SideEffect<EIn>
  ): Promise<Resolve<MaybeSideEffect<PipeValueOutputStrict<Fns>, EffectsOf<Fns> | EIn>>>;
};

type PipeAsyncSideEffectStrict<Fns extends [AnyFn, ...AnyFn[]]> = Fns extends [ZeroFn<any>, ...AnyFn[]]
  ? () => Promise<Resolve<MaybeSideEffect<PipeValueOutputStrict<Fns>, EffectsOf<Fns>>>>
  : PipeAsyncSideEffectStrictUnary<Fns>;

function pipeAsyncSideEffectStrict<R>(...funcs: PipeCheck<[ZeroFn<R>]>): PipeAsyncSideEffectStrict<[ZeroFn<R>]>;
function pipeAsyncSideEffectStrict<B, R>(
  ...funcs: PipeCheck<[ZeroFn<B>, AsyncOrSync<NonSideEffect<Awaited<B>>, R>]>
): PipeAsyncSideEffectStrict<[ZeroFn<B>, AsyncOrSync<NonSideEffect<Awaited<B>>, R>]>;
function pipeAsyncSideEffectStrict<B, C, R>(
  ...funcs: PipeCheck<[
    ZeroFn<B>,
    AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
    AsyncOrSync<NonSideEffect<Awaited<C>>, R>
  ]>
): PipeAsyncSideEffectStrict<[
  ZeroFn<B>,
  AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
  AsyncOrSync<NonSideEffect<Awaited<C>>, R>
]>;
function pipeAsyncSideEffectStrict<B, C, D, R>(
  ...funcs: PipeCheck<[
    ZeroFn<B>,
    AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
    AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
    AsyncOrSync<NonSideEffect<Awaited<D>>, R>
  ]>
): PipeAsyncSideEffectStrict<[
  ZeroFn<B>,
  AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
  AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
  AsyncOrSync<NonSideEffect<Awaited<D>>, R>
]>;
function pipeAsyncSideEffectStrict<B, C, D, E, R>(
  ...funcs: PipeCheck<[
    ZeroFn<B>,
    AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
    AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
    AsyncOrSync<NonSideEffect<Awaited<D>>, E>,
    AsyncOrSync<NonSideEffect<Awaited<E>>, R>
  ]>
): PipeAsyncSideEffectStrict<[
  ZeroFn<B>,
  AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
  AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
  AsyncOrSync<NonSideEffect<Awaited<D>>, E>,
  AsyncOrSync<NonSideEffect<Awaited<E>>, R>
]>;
function pipeAsyncSideEffectStrict<B, C, D, E, F, R>(
  ...funcs: PipeCheck<[
    ZeroFn<B>,
    AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
    AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
    AsyncOrSync<NonSideEffect<Awaited<D>>, E>,
    AsyncOrSync<NonSideEffect<Awaited<E>>, F>,
    AsyncOrSync<NonSideEffect<Awaited<F>>, R>
  ]>
): PipeAsyncSideEffectStrict<[
  ZeroFn<B>,
  AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
  AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
  AsyncOrSync<NonSideEffect<Awaited<D>>, E>,
  AsyncOrSync<NonSideEffect<Awaited<E>>, F>,
  AsyncOrSync<NonSideEffect<Awaited<F>>, R>
]>;
function pipeAsyncSideEffectStrict<B, C, D, E, F, G, R>(
  ...funcs: PipeCheck<[
    ZeroFn<B>,
    AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
    AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
    AsyncOrSync<NonSideEffect<Awaited<D>>, E>,
    AsyncOrSync<NonSideEffect<Awaited<E>>, F>,
    AsyncOrSync<NonSideEffect<Awaited<F>>, G>,
    AsyncOrSync<NonSideEffect<Awaited<G>>, R>
  ]>
): PipeAsyncSideEffectStrict<[
  ZeroFn<B>,
  AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
  AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
  AsyncOrSync<NonSideEffect<Awaited<D>>, E>,
  AsyncOrSync<NonSideEffect<Awaited<E>>, F>,
  AsyncOrSync<NonSideEffect<Awaited<F>>, G>,
  AsyncOrSync<NonSideEffect<Awaited<G>>, R>
]>;
function pipeAsyncSideEffectStrict<B, C, D, E, F, G, H, R>(
  ...funcs: PipeCheck<[
    ZeroFn<B>,
    AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
    AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
    AsyncOrSync<NonSideEffect<Awaited<D>>, E>,
    AsyncOrSync<NonSideEffect<Awaited<E>>, F>,
    AsyncOrSync<NonSideEffect<Awaited<F>>, G>,
    AsyncOrSync<NonSideEffect<Awaited<G>>, H>,
    AsyncOrSync<NonSideEffect<Awaited<H>>, R>
  ]>
): PipeAsyncSideEffectStrict<[
  ZeroFn<B>,
  AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
  AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
  AsyncOrSync<NonSideEffect<Awaited<D>>, E>,
  AsyncOrSync<NonSideEffect<Awaited<E>>, F>,
  AsyncOrSync<NonSideEffect<Awaited<F>>, G>,
  AsyncOrSync<NonSideEffect<Awaited<G>>, H>,
  AsyncOrSync<NonSideEffect<Awaited<H>>, R>
]>;
function pipeAsyncSideEffectStrict<B, C, D, E, F, G, H, I, R>(
  ...funcs: PipeCheck<[
    ZeroFn<B>,
    AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
    AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
    AsyncOrSync<NonSideEffect<Awaited<D>>, E>,
    AsyncOrSync<NonSideEffect<Awaited<E>>, F>,
    AsyncOrSync<NonSideEffect<Awaited<F>>, G>,
    AsyncOrSync<NonSideEffect<Awaited<G>>, H>,
    AsyncOrSync<NonSideEffect<Awaited<H>>, I>,
    AsyncOrSync<NonSideEffect<Awaited<I>>, R>
  ]>
): PipeAsyncSideEffectStrict<[
  ZeroFn<B>,
  AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
  AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
  AsyncOrSync<NonSideEffect<Awaited<D>>, E>,
  AsyncOrSync<NonSideEffect<Awaited<E>>, F>,
  AsyncOrSync<NonSideEffect<Awaited<F>>, G>,
  AsyncOrSync<NonSideEffect<Awaited<G>>, H>,
  AsyncOrSync<NonSideEffect<Awaited<H>>, I>,
  AsyncOrSync<NonSideEffect<Awaited<I>>, R>
]>;
function pipeAsyncSideEffectStrict<B, C, D, E, F, G, H, I, J, R>(
  ...funcs: PipeCheck<[
    ZeroFn<B>,
    AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
    AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
    AsyncOrSync<NonSideEffect<Awaited<D>>, E>,
    AsyncOrSync<NonSideEffect<Awaited<E>>, F>,
    AsyncOrSync<NonSideEffect<Awaited<F>>, G>,
    AsyncOrSync<NonSideEffect<Awaited<G>>, H>,
    AsyncOrSync<NonSideEffect<Awaited<H>>, I>,
    AsyncOrSync<NonSideEffect<Awaited<I>>, J>,
    AsyncOrSync<NonSideEffect<Awaited<J>>, R>
  ]>
): PipeAsyncSideEffectStrict<[
  ZeroFn<B>,
  AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
  AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
  AsyncOrSync<NonSideEffect<Awaited<D>>, E>,
  AsyncOrSync<NonSideEffect<Awaited<E>>, F>,
  AsyncOrSync<NonSideEffect<Awaited<F>>, G>,
  AsyncOrSync<NonSideEffect<Awaited<G>>, H>,
  AsyncOrSync<NonSideEffect<Awaited<H>>, I>,
  AsyncOrSync<NonSideEffect<Awaited<I>>, J>,
  AsyncOrSync<NonSideEffect<Awaited<J>>, R>
]>;
function pipeAsyncSideEffectStrict<Fns extends [FromFn<any>, ...AnyFn[]]>(
  ...funcs: PipeCheck<Fns>
): PipeAsyncSideEffectStrictUnaryOptional<Fns>;
function pipeAsyncSideEffectStrict<A, R>(
  ...funcs: PipeCheck<[AsyncOrSync<A, R>]>
): PipeAsyncSideEffectStrict<[AsyncOrSync<A, R>]>;
function pipeAsyncSideEffectStrict<A, B, R>(
  ...funcs: PipeCheck<[AsyncOrSync<A, B>, AsyncOrSync<NonSideEffect<Awaited<B>>, R>]>
): PipeAsyncSideEffectStrict<[AsyncOrSync<A, B>, AsyncOrSync<NonSideEffect<Awaited<B>>, R>]>;
function pipeAsyncSideEffectStrict<A, B, C, R>(
  ...funcs: PipeCheck<[
    AsyncOrSync<A, B>,
    AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
    AsyncOrSync<NonSideEffect<Awaited<C>>, R>
  ]>
): PipeAsyncSideEffectStrict<[
  AsyncOrSync<A, B>,
  AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
  AsyncOrSync<NonSideEffect<Awaited<C>>, R>
]>;
function pipeAsyncSideEffectStrict<A, B, C, D, R>(
  ...funcs: PipeCheck<[
    AsyncOrSync<A, B>,
    AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
    AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
    AsyncOrSync<NonSideEffect<Awaited<D>>, R>
  ]>
): PipeAsyncSideEffectStrict<[
  AsyncOrSync<A, B>,
  AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
  AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
  AsyncOrSync<NonSideEffect<Awaited<D>>, R>
]>;
function pipeAsyncSideEffectStrict<A, B, C, D, E, R>(
  ...funcs: PipeCheck<[
    AsyncOrSync<A, B>,
    AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
    AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
    AsyncOrSync<NonSideEffect<Awaited<D>>, E>,
    AsyncOrSync<NonSideEffect<Awaited<E>>, R>
  ]>
): PipeAsyncSideEffectStrict<[
  AsyncOrSync<A, B>,
  AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
  AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
  AsyncOrSync<NonSideEffect<Awaited<D>>, E>,
  AsyncOrSync<NonSideEffect<Awaited<E>>, R>
]>;
function pipeAsyncSideEffectStrict<A, B, C, D, E, F, R>(
  ...funcs: PipeCheck<[
    AsyncOrSync<A, B>,
    AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
    AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
    AsyncOrSync<NonSideEffect<Awaited<D>>, E>,
    AsyncOrSync<NonSideEffect<Awaited<E>>, F>,
    AsyncOrSync<NonSideEffect<Awaited<F>>, R>
  ]>
): PipeAsyncSideEffectStrict<[
  AsyncOrSync<A, B>,
  AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
  AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
  AsyncOrSync<NonSideEffect<Awaited<D>>, E>,
  AsyncOrSync<NonSideEffect<Awaited<E>>, F>,
  AsyncOrSync<NonSideEffect<Awaited<F>>, R>
]>;
function pipeAsyncSideEffectStrict<A, B, C, D, E, F, G, R>(
  ...funcs: PipeCheck<[
    AsyncOrSync<A, B>,
    AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
    AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
    AsyncOrSync<NonSideEffect<Awaited<D>>, E>,
    AsyncOrSync<NonSideEffect<Awaited<E>>, F>,
    AsyncOrSync<NonSideEffect<Awaited<F>>, G>,
    AsyncOrSync<NonSideEffect<Awaited<G>>, R>
  ]>
): PipeAsyncSideEffectStrict<[
  AsyncOrSync<A, B>,
  AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
  AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
  AsyncOrSync<NonSideEffect<Awaited<D>>, E>,
  AsyncOrSync<NonSideEffect<Awaited<E>>, F>,
  AsyncOrSync<NonSideEffect<Awaited<F>>, G>,
  AsyncOrSync<NonSideEffect<Awaited<G>>, R>
]>;
function pipeAsyncSideEffectStrict<A, B, C, D, E, F, G, H, R>(
  ...funcs: PipeCheck<[
    AsyncOrSync<A, B>,
    AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
    AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
    AsyncOrSync<NonSideEffect<Awaited<D>>, E>,
    AsyncOrSync<NonSideEffect<Awaited<E>>, F>,
    AsyncOrSync<NonSideEffect<Awaited<F>>, G>,
    AsyncOrSync<NonSideEffect<Awaited<G>>, H>,
    AsyncOrSync<NonSideEffect<Awaited<H>>, R>
  ]>
): PipeAsyncSideEffectStrict<[
  AsyncOrSync<A, B>,
  AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
  AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
  AsyncOrSync<NonSideEffect<Awaited<D>>, E>,
  AsyncOrSync<NonSideEffect<Awaited<E>>, F>,
  AsyncOrSync<NonSideEffect<Awaited<F>>, G>,
  AsyncOrSync<NonSideEffect<Awaited<G>>, H>,
  AsyncOrSync<NonSideEffect<Awaited<H>>, R>
]>;
function pipeAsyncSideEffectStrict<A, B, C, D, E, F, G, H, I, R>(
  ...funcs: PipeCheck<[
    AsyncOrSync<A, B>,
    AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
    AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
    AsyncOrSync<NonSideEffect<Awaited<D>>, E>,
    AsyncOrSync<NonSideEffect<Awaited<E>>, F>,
    AsyncOrSync<NonSideEffect<Awaited<F>>, G>,
    AsyncOrSync<NonSideEffect<Awaited<G>>, H>,
    AsyncOrSync<NonSideEffect<Awaited<H>>, I>,
    AsyncOrSync<NonSideEffect<Awaited<I>>, R>
  ]>
): PipeAsyncSideEffectStrict<[
  AsyncOrSync<A, B>,
  AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
  AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
  AsyncOrSync<NonSideEffect<Awaited<D>>, E>,
  AsyncOrSync<NonSideEffect<Awaited<E>>, F>,
  AsyncOrSync<NonSideEffect<Awaited<F>>, G>,
  AsyncOrSync<NonSideEffect<Awaited<G>>, H>,
  AsyncOrSync<NonSideEffect<Awaited<H>>, I>,
  AsyncOrSync<NonSideEffect<Awaited<I>>, R>
]>;
function pipeAsyncSideEffectStrict<A, B, C, D, E, F, G, H, I, J, R>(
  ...funcs: PipeCheck<[
    AsyncOrSync<A, B>,
    AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
    AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
    AsyncOrSync<NonSideEffect<Awaited<D>>, E>,
    AsyncOrSync<NonSideEffect<Awaited<E>>, F>,
    AsyncOrSync<NonSideEffect<Awaited<F>>, G>,
    AsyncOrSync<NonSideEffect<Awaited<G>>, H>,
    AsyncOrSync<NonSideEffect<Awaited<H>>, I>,
    AsyncOrSync<NonSideEffect<Awaited<I>>, J>,
    AsyncOrSync<NonSideEffect<Awaited<J>>, R>
  ]>
): PipeAsyncSideEffectStrict<[
  AsyncOrSync<A, B>,
  AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
  AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
  AsyncOrSync<NonSideEffect<Awaited<D>>, E>,
  AsyncOrSync<NonSideEffect<Awaited<E>>, F>,
  AsyncOrSync<NonSideEffect<Awaited<F>>, G>,
  AsyncOrSync<NonSideEffect<Awaited<G>>, H>,
  AsyncOrSync<NonSideEffect<Awaited<H>>, I>,
  AsyncOrSync<NonSideEffect<Awaited<I>>, J>,
  AsyncOrSync<NonSideEffect<Awaited<J>>, R>
]>;

function pipeAsyncSideEffectStrict<Fns extends [AnyFn, ...AnyFn[]]>(...funcs: PipeCheck<Fns>): PipeAsyncSideEffectStrict<Fns>;
function pipeAsyncSideEffectStrict(...funcs: Array<AsyncOrSync<any, any>>) {
  return async (value?: any) => {
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

export default pipeAsyncSideEffectStrict;

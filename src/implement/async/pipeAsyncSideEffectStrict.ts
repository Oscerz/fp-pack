import type { FromFn } from '../composition/from';
import SideEffect, { isSideEffect } from '../composition/sideEffect';

type PipeError<From, To> = { __pipe_async_side_effect_strict_error: ['pipeAsyncSideEffectStrict', From, '->', To] };
type NoInfer<T> = [T][T extends any ? 0 : never];
type AnyFn = (...args: any[]) => any;
type NonFunction<T> = T extends AnyFn ? never : T;

type MaybeSideEffect<T, E> = T | SideEffect<E>;
type NonSideEffect<T> = Exclude<T, SideEffect<any>>;
type AsyncOrSync<A, R> = (a: A) => R | Promise<R>;
type FirstAsyncOrSync<A, R> = AsyncOrSync<A, R> & { __from?: never };
type ZeroFn<R> = () => R | Promise<R>;

type FnInput<F> = F extends (a: infer A) => any ? A : never;
type FnReturn<F> = F extends (...args: any[]) => infer R ? R : never;
type FnValue<F> = NonSideEffect<Awaited<FnReturn<F>>>;

type ValidateFn<Fn extends AsyncOrSync<any, any>, Expected> =
  NoInfer<Expected> extends FnInput<Fn> ? Fn : Fn & PipeError<Expected, FnInput<Fn>>;
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
type EffectOfFn<F> = EffectOfReturn<Awaited<FnReturn<F>>>;
type EffectsOf<Fns extends AnyFn[]> = EffectOfFn<Fns[number]>;

type StrictResult<FLast, Fns extends AnyFn[]> = MaybeSideEffect<FnValue<FLast>, EffectsOf<Fns>>;
type StrictResultWithInput<FLast, Fns extends AnyFn[], EIn> = MaybeSideEffect<FnValue<FLast>, EffectsOf<Fns> | EIn>;
type StrictUnaryReturn<A, FLast, Fns extends AnyFn[]> = {
  (input: A): Promise<StrictResult<FLast, Fns>>;
  <EIn>(input: A | SideEffect<EIn>): Promise<MaybeSideEffect<FnValue<FLast>, EffectsOf<Fns> | EIn>>;
};
type StrictUnaryReturnOptional<A, FLast, Fns extends AnyFn[]> = {
  (input?: A): Promise<StrictResult<FLast, Fns>>;
  <EIn>(input?: A | SideEffect<EIn>): Promise<MaybeSideEffect<FnValue<FLast>, EffectsOf<Fns> | EIn>>;
};

type PipeInput<Fns extends AsyncOrSync<any, any>[]> = Fns extends [
  AsyncOrSync<infer A, any>,
  ...AsyncOrSync<any, any>[]
]
  ? A
  : never;
type LastFn<Fns extends AnyFn[]> = Fns extends [...any[], infer L] ? L : never;

type PipeAsyncSideEffectStrict<Fns extends [FirstAsyncOrSync<any, any>, ...AsyncOrSync<any, any>[]]> = StrictUnaryReturn<
  PipeInput<Fns>,
  LastFn<Fns>,
  Fns
>;
type PipeAsyncSideEffectStrictFrom<Fns extends [FromFn<any>, ...AsyncOrSync<any, any>[]]> = StrictUnaryReturnOptional<
  unknown,
  LastFn<Fns>,
  Fns
>;

type PipeCheckWithInput<Input, Fns extends [AnyFn, ...AnyFn[]]> =
  Fns extends [infer F, ...infer Rest]
    ? F extends AsyncOrSync<any, any>
      ? Rest extends AnyFn[]
        ? PipeCheck<[ValidateFn<F, Input>, ...Rest]>
        : PipeCheck<[ValidateFn<F, Input>]>
      : PipeError<Input, unknown>
    : PipeError<unknown, unknown>;

function pipeAsyncSideEffectStrict<A>(input: NonFunction<A>): Promise<A>;
function pipeAsyncSideEffectStrict<A, EIn>(input: NonFunction<A> | SideEffect<EIn>): Promise<A | SideEffect<EIn>>;
function pipeAsyncSideEffectStrict<A, F1 extends AsyncOrSync<A, any>>(
  input: NonFunction<A>,
  ab: ValidateFn<F1, A>
): Promise<StrictResult<F1, [F1]>>;
function pipeAsyncSideEffectStrict<A, EIn, F1 extends AsyncOrSync<A, any>>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: ValidateFn<F1, A>
): Promise<StrictResultWithInput<F1, [F1], EIn>>;
function pipeAsyncSideEffectStrict<A, F1 extends AsyncOrSync<A, any>, F2 extends AsyncOrSync<FnValue<F1>, any>>(
  input: NonFunction<A>,
  ab: ValidateFn<F1, A>,
  bc: ValidateFn<F2, FnValue<F1>>
): Promise<StrictResult<F2, [F1, F2]>>;
function pipeAsyncSideEffectStrict<
  A,
  EIn,
  F1 extends AsyncOrSync<A, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>
>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: ValidateFn<F1, A>,
  bc: ValidateFn<F2, FnValue<F1>>
): Promise<StrictResultWithInput<F2, [F1, F2], EIn>>;
function pipeAsyncSideEffectStrict<
  A,
  F1 extends AsyncOrSync<A, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>
>(
  input: NonFunction<A>,
  ab: ValidateFn<F1, A>,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>
): Promise<StrictResult<F3, [F1, F2, F3]>>;
function pipeAsyncSideEffectStrict<
  A,
  EIn,
  F1 extends AsyncOrSync<A, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>
>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: ValidateFn<F1, A>,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>
): Promise<StrictResultWithInput<F3, [F1, F2, F3], EIn>>;
function pipeAsyncSideEffectStrict<
  A,
  F1 extends AsyncOrSync<A, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>
>(
  input: NonFunction<A>,
  ab: ValidateFn<F1, A>,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>
): Promise<StrictResult<F4, [F1, F2, F3, F4]>>;
function pipeAsyncSideEffectStrict<
  A,
  EIn,
  F1 extends AsyncOrSync<A, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>
>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: ValidateFn<F1, A>,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>
): Promise<StrictResultWithInput<F4, [F1, F2, F3, F4], EIn>>;
function pipeAsyncSideEffectStrict<
  A,
  F1 extends AsyncOrSync<A, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>
>(
  input: NonFunction<A>,
  ab: ValidateFn<F1, A>,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>
): Promise<StrictResult<F5, [F1, F2, F3, F4, F5]>>;
function pipeAsyncSideEffectStrict<
  A,
  EIn,
  F1 extends AsyncOrSync<A, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>
>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: ValidateFn<F1, A>,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>
): Promise<StrictResultWithInput<F5, [F1, F2, F3, F4, F5], EIn>>;
function pipeAsyncSideEffectStrict<
  A,
  F1 extends AsyncOrSync<A, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>
>(
  input: NonFunction<A>,
  ab: ValidateFn<F1, A>,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>
): Promise<StrictResult<F6, [F1, F2, F3, F4, F5, F6]>>;
function pipeAsyncSideEffectStrict<
  A,
  EIn,
  F1 extends AsyncOrSync<A, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>
>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: ValidateFn<F1, A>,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>
): Promise<StrictResultWithInput<F6, [F1, F2, F3, F4, F5, F6], EIn>>;
function pipeAsyncSideEffectStrict<
  A,
  F1 extends AsyncOrSync<A, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>
>(
  input: NonFunction<A>,
  ab: ValidateFn<F1, A>,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>
): Promise<StrictResult<F7, [F1, F2, F3, F4, F5, F6, F7]>>;
function pipeAsyncSideEffectStrict<
  A,
  EIn,
  F1 extends AsyncOrSync<A, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>
>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: ValidateFn<F1, A>,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>
): Promise<StrictResultWithInput<F7, [F1, F2, F3, F4, F5, F6, F7], EIn>>;
function pipeAsyncSideEffectStrict<
  A,
  F1 extends AsyncOrSync<A, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>,
  F8 extends AsyncOrSync<FnValue<F7>, any>
>(
  input: NonFunction<A>,
  ab: ValidateFn<F1, A>,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>
): Promise<StrictResult<F8, [F1, F2, F3, F4, F5, F6, F7, F8]>>;
function pipeAsyncSideEffectStrict<
  A,
  EIn,
  F1 extends AsyncOrSync<A, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>,
  F8 extends AsyncOrSync<FnValue<F7>, any>
>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: ValidateFn<F1, A>,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>
): Promise<StrictResultWithInput<F8, [F1, F2, F3, F4, F5, F6, F7, F8], EIn>>;
function pipeAsyncSideEffectStrict<
  A,
  F1 extends AsyncOrSync<A, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>,
  F8 extends AsyncOrSync<FnValue<F7>, any>,
  F9 extends AsyncOrSync<FnValue<F8>, any>
>(
  input: NonFunction<A>,
  ab: ValidateFn<F1, A>,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>,
  ij: ValidateFn<F9, FnValue<F8>>
): Promise<StrictResult<F9, [F1, F2, F3, F4, F5, F6, F7, F8, F9]>>;
function pipeAsyncSideEffectStrict<
  A,
  EIn,
  F1 extends AsyncOrSync<A, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>,
  F8 extends AsyncOrSync<FnValue<F7>, any>,
  F9 extends AsyncOrSync<FnValue<F8>, any>
>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: ValidateFn<F1, A>,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>,
  ij: ValidateFn<F9, FnValue<F8>>
): Promise<StrictResultWithInput<F9, [F1, F2, F3, F4, F5, F6, F7, F8, F9], EIn>>;
function pipeAsyncSideEffectStrict<
  A,
  F1 extends AsyncOrSync<A, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>,
  F8 extends AsyncOrSync<FnValue<F7>, any>,
  F9 extends AsyncOrSync<FnValue<F8>, any>,
  F10 extends AsyncOrSync<FnValue<F9>, any>
>(
  input: NonFunction<A>,
  ab: ValidateFn<F1, A>,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>,
  ij: ValidateFn<F9, FnValue<F8>>,
  jk: ValidateFn<F10, FnValue<F9>>
): Promise<StrictResult<F10, [F1, F2, F3, F4, F5, F6, F7, F8, F9, F10]>>;
function pipeAsyncSideEffectStrict<
  A,
  EIn,
  F1 extends AsyncOrSync<A, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>,
  F8 extends AsyncOrSync<FnValue<F7>, any>,
  F9 extends AsyncOrSync<FnValue<F8>, any>,
  F10 extends AsyncOrSync<FnValue<F9>, any>
>(
  input: NonFunction<A> | SideEffect<EIn>,
  ab: ValidateFn<F1, A>,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>,
  ij: ValidateFn<F9, FnValue<F8>>,
  jk: ValidateFn<F10, FnValue<F9>>
): Promise<StrictResultWithInput<F10, [F1, F2, F3, F4, F5, F6, F7, F8, F9, F10], EIn>>;
function pipeAsyncSideEffectStrict<A, Fns extends [AsyncOrSync<any, any>, ...AsyncOrSync<any, any>[]]>(
  input: NonFunction<A>,
  ...funcs: PipeCheckWithInput<A, Fns>
): Promise<StrictResult<LastFn<Fns>, Fns>>;
function pipeAsyncSideEffectStrict<A, EIn, Fns extends [AsyncOrSync<any, any>, ...AsyncOrSync<any, any>[]]>(
  input: NonFunction<A> | SideEffect<EIn>,
  ...funcs: PipeCheckWithInput<A, Fns>
): Promise<StrictResultWithInput<LastFn<Fns>, Fns, EIn>>;

function pipeAsyncSideEffectStrict<R>(ab: ZeroFn<R>): () => Promise<StrictResult<ZeroFn<R>, [ZeroFn<R>]>>;
function pipeAsyncSideEffectStrict<B, F2 extends AsyncOrSync<FnValue<ZeroFn<B>>, any>>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, FnValue<ZeroFn<B>>>
): () => Promise<StrictResult<F2, [ZeroFn<B>, F2]>>;
function pipeAsyncSideEffectStrict<
  B,
  F2 extends AsyncOrSync<FnValue<ZeroFn<B>>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, FnValue<ZeroFn<B>>>,
  cd: ValidateFn<F3, FnValue<F2>>
): () => Promise<StrictResult<F3, [ZeroFn<B>, F2, F3]>>;
function pipeAsyncSideEffectStrict<
  B,
  F2 extends AsyncOrSync<FnValue<ZeroFn<B>>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, FnValue<ZeroFn<B>>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>
): () => Promise<StrictResult<F4, [ZeroFn<B>, F2, F3, F4]>>;
function pipeAsyncSideEffectStrict<
  B,
  F2 extends AsyncOrSync<FnValue<ZeroFn<B>>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, FnValue<ZeroFn<B>>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>
): () => Promise<StrictResult<F5, [ZeroFn<B>, F2, F3, F4, F5]>>;
function pipeAsyncSideEffectStrict<
  B,
  F2 extends AsyncOrSync<FnValue<ZeroFn<B>>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, FnValue<ZeroFn<B>>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>
): () => Promise<StrictResult<F6, [ZeroFn<B>, F2, F3, F4, F5, F6]>>;
function pipeAsyncSideEffectStrict<
  B,
  F2 extends AsyncOrSync<FnValue<ZeroFn<B>>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, FnValue<ZeroFn<B>>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>
): () => Promise<StrictResult<F7, [ZeroFn<B>, F2, F3, F4, F5, F6, F7]>>;
function pipeAsyncSideEffectStrict<
  B,
  F2 extends AsyncOrSync<FnValue<ZeroFn<B>>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>,
  F8 extends AsyncOrSync<FnValue<F7>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, FnValue<ZeroFn<B>>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>
): () => Promise<StrictResult<F8, [ZeroFn<B>, F2, F3, F4, F5, F6, F7, F8]>>;
function pipeAsyncSideEffectStrict<
  B,
  F2 extends AsyncOrSync<FnValue<ZeroFn<B>>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>,
  F8 extends AsyncOrSync<FnValue<F7>, any>,
  F9 extends AsyncOrSync<FnValue<F8>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, FnValue<ZeroFn<B>>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>,
  ij: ValidateFn<F9, FnValue<F8>>
): () => Promise<StrictResult<F9, [ZeroFn<B>, F2, F3, F4, F5, F6, F7, F8, F9]>>;
function pipeAsyncSideEffectStrict<
  B,
  F2 extends AsyncOrSync<FnValue<ZeroFn<B>>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>,
  F8 extends AsyncOrSync<FnValue<F7>, any>,
  F9 extends AsyncOrSync<FnValue<F8>, any>,
  F10 extends AsyncOrSync<FnValue<F9>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, FnValue<ZeroFn<B>>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>,
  ij: ValidateFn<F9, FnValue<F8>>,
  jk: ValidateFn<F10, FnValue<F9>>
): () => Promise<StrictResult<F10, [ZeroFn<B>, F2, F3, F4, F5, F6, F7, F8, F9, F10]>>;

function pipeAsyncSideEffectStrict<F1 extends FromFn<any>>(
  ab: F1
): StrictUnaryReturnOptional<unknown, F1, [F1]>;
function pipeAsyncSideEffectStrict<F1 extends FromFn<any>, F2 extends AsyncOrSync<FnValue<F1>, any>>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>
): StrictUnaryReturnOptional<unknown, F2, [F1, F2]>;
function pipeAsyncSideEffectStrict<
  F1 extends FromFn<any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>
): StrictUnaryReturnOptional<unknown, F3, [F1, F2, F3]>;
function pipeAsyncSideEffectStrict<
  F1 extends FromFn<any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>
): StrictUnaryReturnOptional<unknown, F4, [F1, F2, F3, F4]>;
function pipeAsyncSideEffectStrict<
  F1 extends FromFn<any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>
): StrictUnaryReturnOptional<unknown, F5, [F1, F2, F3, F4, F5]>;
function pipeAsyncSideEffectStrict<
  F1 extends FromFn<any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>
): StrictUnaryReturnOptional<unknown, F6, [F1, F2, F3, F4, F5, F6]>;
function pipeAsyncSideEffectStrict<
  F1 extends FromFn<any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>
): StrictUnaryReturnOptional<unknown, F7, [F1, F2, F3, F4, F5, F6, F7]>;
function pipeAsyncSideEffectStrict<
  F1 extends FromFn<any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>,
  F8 extends AsyncOrSync<FnValue<F7>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>
): StrictUnaryReturnOptional<unknown, F8, [F1, F2, F3, F4, F5, F6, F7, F8]>;
function pipeAsyncSideEffectStrict<
  F1 extends FromFn<any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>,
  F8 extends AsyncOrSync<FnValue<F7>, any>,
  F9 extends AsyncOrSync<FnValue<F8>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>,
  ij: ValidateFn<F9, FnValue<F8>>
): StrictUnaryReturnOptional<unknown, F9, [F1, F2, F3, F4, F5, F6, F7, F8, F9]>;
function pipeAsyncSideEffectStrict<
  F1 extends FromFn<any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>,
  F8 extends AsyncOrSync<FnValue<F7>, any>,
  F9 extends AsyncOrSync<FnValue<F8>, any>,
  F10 extends AsyncOrSync<FnValue<F9>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>,
  ij: ValidateFn<F9, FnValue<F8>>,
  jk: ValidateFn<F10, FnValue<F9>>
): StrictUnaryReturnOptional<unknown, F10, [F1, F2, F3, F4, F5, F6, F7, F8, F9, F10]>;

function pipeAsyncSideEffectStrict<F1 extends FirstAsyncOrSync<any, any>>(
  ab: F1
): StrictUnaryReturn<FnInput<F1>, F1, [F1]>;
function pipeAsyncSideEffectStrict<
  F1 extends FirstAsyncOrSync<any, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>
): StrictUnaryReturn<FnInput<F1>, F2, [F1, F2]>;
function pipeAsyncSideEffectStrict<
  F1 extends FirstAsyncOrSync<any, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>
): StrictUnaryReturn<FnInput<F1>, F3, [F1, F2, F3]>;
function pipeAsyncSideEffectStrict<
  F1 extends FirstAsyncOrSync<any, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>
): StrictUnaryReturn<FnInput<F1>, F4, [F1, F2, F3, F4]>;
function pipeAsyncSideEffectStrict<
  F1 extends FirstAsyncOrSync<any, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>
): StrictUnaryReturn<FnInput<F1>, F5, [F1, F2, F3, F4, F5]>;
function pipeAsyncSideEffectStrict<
  F1 extends FirstAsyncOrSync<any, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>
): StrictUnaryReturn<FnInput<F1>, F6, [F1, F2, F3, F4, F5, F6]>;
function pipeAsyncSideEffectStrict<
  F1 extends FirstAsyncOrSync<any, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>
): StrictUnaryReturn<FnInput<F1>, F7, [F1, F2, F3, F4, F5, F6, F7]>;
function pipeAsyncSideEffectStrict<
  F1 extends FirstAsyncOrSync<any, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>,
  F8 extends AsyncOrSync<FnValue<F7>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>
): StrictUnaryReturn<FnInput<F1>, F8, [F1, F2, F3, F4, F5, F6, F7, F8]>;
function pipeAsyncSideEffectStrict<
  F1 extends FirstAsyncOrSync<any, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>,
  F8 extends AsyncOrSync<FnValue<F7>, any>,
  F9 extends AsyncOrSync<FnValue<F8>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>,
  ij: ValidateFn<F9, FnValue<F8>>
): StrictUnaryReturn<FnInput<F1>, F9, [F1, F2, F3, F4, F5, F6, F7, F8, F9]>;
function pipeAsyncSideEffectStrict<
  F1 extends FirstAsyncOrSync<any, any>,
  F2 extends AsyncOrSync<FnValue<F1>, any>,
  F3 extends AsyncOrSync<FnValue<F2>, any>,
  F4 extends AsyncOrSync<FnValue<F3>, any>,
  F5 extends AsyncOrSync<FnValue<F4>, any>,
  F6 extends AsyncOrSync<FnValue<F5>, any>,
  F7 extends AsyncOrSync<FnValue<F6>, any>,
  F8 extends AsyncOrSync<FnValue<F7>, any>,
  F9 extends AsyncOrSync<FnValue<F8>, any>,
  F10 extends AsyncOrSync<FnValue<F9>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>,
  ij: ValidateFn<F9, FnValue<F8>>,
  jk: ValidateFn<F10, FnValue<F9>>
): StrictUnaryReturn<FnInput<F1>, F10, [F1, F2, F3, F4, F5, F6, F7, F8, F9, F10]>;

function pipeAsyncSideEffectStrict<Fns extends [FromFn<any>, ...AsyncOrSync<any, any>[]]>(
  ...funcs: PipeCheck<Fns>
): PipeAsyncSideEffectStrictFrom<Fns>;
function pipeAsyncSideEffectStrict<Fns extends [FirstAsyncOrSync<any, any>, ...AsyncOrSync<any, any>[]]>(
  ...funcs: PipeCheck<Fns>
): PipeAsyncSideEffectStrict<Fns>;
function pipeAsyncSideEffectStrict(...args: Array<any>) {
  const run = async (init: any, funcs: Array<(input: any) => any>) => {
    let acc = init;
    for (const fn of funcs) {
      if (isSideEffect(acc)) {
        return acc;
      }
      acc = await fn(acc);
    }
    return acc;
  };

  if (args.length === 0) {
    return Promise.resolve(undefined);
  }
  const [input, ...rest] = args as [any, ...Array<(input: any) => any>];
  if (typeof input === 'function') {
    const funcs = [input, ...rest];
    return (init?: any) => run(init, funcs);
  }

  return run(input, rest);
}

export default pipeAsyncSideEffectStrict;

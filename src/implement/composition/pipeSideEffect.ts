import type { FromFn } from './from';
import SideEffect, { isSideEffect } from './sideEffect';

type PipeError<From, To> = { __pipe_side_effect_error: ['pipeSideEffect', From, '->', To] };
type NoInfer<T> = [T][T extends any ? 0 : never];

type MaybeSideEffect<T> = T | SideEffect<any>;
type NonSideEffect<T> = Exclude<T, SideEffect<any>>;
type UnaryFn<A, R> = (a: A) => MaybeSideEffect<R>;
type ZeroFn<R> = () => MaybeSideEffect<R>;
type AnyFn = (...args: any[]) => any;
type NonFunction<T> = T extends AnyFn ? never : T;

type FnInput<F> = F extends (a: infer A) => any ? A : never;
type FnReturn<F> = F extends (...args: any[]) => infer R ? R : never;
type FnValue<F> = NonSideEffect<FnReturn<F>>;
type PipeResult<F> = MaybeSideEffect<FnValue<F>>;

type ValidateFn<Fn extends UnaryFn<any, any>, Expected> =
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

type PipeInput<Fns extends UnaryFn<any, any>[]> = Fns extends [UnaryFn<infer A, any>, ...UnaryFn<any, any>[]]
  ? A
  : never;
type PipeOutput<Fns extends UnaryFn<any, any>[]> = Fns extends [infer F]
  ? F extends UnaryFn<any, any>
    ? PipeResult<F>
    : never
  : Fns extends [infer F, ...infer Rest]
    ? F extends UnaryFn<any, any>
      ? Rest extends [UnaryFn<FnValue<F>, any>, ...UnaryFn<any, any>[]]
        ? PipeOutput<Rest>
        : never
      : never
    : never;

type PipeSideEffect<Fns extends UnaryFn<any, any>[]> = (input: PipeInput<Fns> | SideEffect<any>) => PipeOutput<Fns>;

type PipeSideEffectFrom<Fns extends [FromFn<any>, ...UnaryFn<any, any>[]]> = (
  input?: PipeInput<Fns> | SideEffect<any>
) => PipeOutput<Fns>;

type PipeCheckWithInput<Input, Fns extends [AnyFn, ...AnyFn[]]> =
  Fns extends [infer F, ...infer Rest]
    ? F extends UnaryFn<any, any>
      ? Rest extends AnyFn[]
        ? PipeCheck<[ValidateFn<F, Input>, ...Rest]>
        : PipeCheck<[ValidateFn<F, Input>]>
      : PipeError<Input, unknown>
    : PipeError<unknown, unknown>;

function pipeSideEffect<A>(input: NonFunction<A> | SideEffect<any>): A | SideEffect<any>;
function pipeSideEffect<A, F1 extends UnaryFn<A, any>>(
  input: NonFunction<A> | SideEffect<any>,
  ab: ValidateFn<F1, A>
): PipeResult<F1>;
function pipeSideEffect<A, F1 extends UnaryFn<A, any>, F2 extends UnaryFn<FnValue<F1>, any>>(
  input: NonFunction<A> | SideEffect<any>,
  ab: ValidateFn<F1, A>,
  bc: ValidateFn<F2, FnValue<F1>>
): PipeResult<F2>;
function pipeSideEffect<
  A,
  F1 extends UnaryFn<A, any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>
>(
  input: NonFunction<A> | SideEffect<any>,
  ab: ValidateFn<F1, A>,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>
): PipeResult<F3>;
function pipeSideEffect<
  A,
  F1 extends UnaryFn<A, any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>
>(
  input: NonFunction<A> | SideEffect<any>,
  ab: ValidateFn<F1, A>,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>
): PipeResult<F4>;
function pipeSideEffect<
  A,
  F1 extends UnaryFn<A, any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>
>(
  input: NonFunction<A> | SideEffect<any>,
  ab: ValidateFn<F1, A>,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>
): PipeResult<F5>;
function pipeSideEffect<
  A,
  F1 extends UnaryFn<A, any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>
>(
  input: NonFunction<A> | SideEffect<any>,
  ab: ValidateFn<F1, A>,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>
): PipeResult<F6>;
function pipeSideEffect<
  A,
  F1 extends UnaryFn<A, any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>,
  F7 extends UnaryFn<FnValue<F6>, any>
>(
  input: NonFunction<A> | SideEffect<any>,
  ab: ValidateFn<F1, A>,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>
): PipeResult<F7>;
function pipeSideEffect<
  A,
  F1 extends UnaryFn<A, any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>,
  F7 extends UnaryFn<FnValue<F6>, any>,
  F8 extends UnaryFn<FnValue<F7>, any>
>(
  input: NonFunction<A> | SideEffect<any>,
  ab: ValidateFn<F1, A>,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>
): PipeResult<F8>;
function pipeSideEffect<
  A,
  F1 extends UnaryFn<A, any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>,
  F7 extends UnaryFn<FnValue<F6>, any>,
  F8 extends UnaryFn<FnValue<F7>, any>,
  F9 extends UnaryFn<FnValue<F8>, any>
>(
  input: NonFunction<A> | SideEffect<any>,
  ab: ValidateFn<F1, A>,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>,
  ij: ValidateFn<F9, FnValue<F8>>
): PipeResult<F9>;
function pipeSideEffect<
  A,
  F1 extends UnaryFn<A, any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>,
  F7 extends UnaryFn<FnValue<F6>, any>,
  F8 extends UnaryFn<FnValue<F7>, any>,
  F9 extends UnaryFn<FnValue<F8>, any>,
  F10 extends UnaryFn<FnValue<F9>, any>
>(
  input: NonFunction<A> | SideEffect<any>,
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
): PipeResult<F10>;
function pipeSideEffect<A, Fns extends [UnaryFn<any, any>, ...UnaryFn<any, any>[]]>(
  input: NonFunction<A> | SideEffect<any>,
  ...funcs: PipeCheckWithInput<A, Fns>
): PipeOutput<Fns>;

function pipeSideEffect<R>(ab: ZeroFn<R>): () => PipeResult<ZeroFn<R>>;
function pipeSideEffect<B, F2 extends UnaryFn<B, any>>(ab: ZeroFn<B>, bc: ValidateFn<F2, B>): () => PipeResult<F2>;
function pipeSideEffect<B, F2 extends UnaryFn<B, any>, F3 extends UnaryFn<FnValue<F2>, any>>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, B>,
  cd: ValidateFn<F3, FnValue<F2>>
): () => PipeResult<F3>;
function pipeSideEffect<
  B,
  F2 extends UnaryFn<B, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, B>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>
): () => PipeResult<F4>;
function pipeSideEffect<
  B,
  F2 extends UnaryFn<B, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, B>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>
): () => PipeResult<F5>;
function pipeSideEffect<
  B,
  F2 extends UnaryFn<B, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, B>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>
): () => PipeResult<F6>;
function pipeSideEffect<
  B,
  F2 extends UnaryFn<B, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>,
  F7 extends UnaryFn<FnValue<F6>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, B>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>
): () => PipeResult<F7>;
function pipeSideEffect<
  B,
  F2 extends UnaryFn<B, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>,
  F7 extends UnaryFn<FnValue<F6>, any>,
  F8 extends UnaryFn<FnValue<F7>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, B>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>
): () => PipeResult<F8>;
function pipeSideEffect<
  B,
  F2 extends UnaryFn<B, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>,
  F7 extends UnaryFn<FnValue<F6>, any>,
  F8 extends UnaryFn<FnValue<F7>, any>,
  F9 extends UnaryFn<FnValue<F8>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, B>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>,
  ij: ValidateFn<F9, FnValue<F8>>
): () => PipeResult<F9>;
function pipeSideEffect<
  B,
  F2 extends UnaryFn<B, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>,
  F7 extends UnaryFn<FnValue<F6>, any>,
  F8 extends UnaryFn<FnValue<F7>, any>,
  F9 extends UnaryFn<FnValue<F8>, any>,
  F10 extends UnaryFn<FnValue<F9>, any>
>(
  ab: ZeroFn<B>,
  bc: ValidateFn<F2, B>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>,
  ij: ValidateFn<F9, FnValue<F8>>,
  jk: ValidateFn<F10, FnValue<F9>>
): () => PipeResult<F10>;

function pipeSideEffect<F1 extends FromFn<any>>(ab: F1): (input?: unknown) => PipeResult<F1>;
function pipeSideEffect<F1 extends FromFn<any>, F2 extends UnaryFn<FnValue<F1>, any>>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>
): (input?: unknown) => PipeResult<F2>;
function pipeSideEffect<
  F1 extends FromFn<any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>
): (input?: unknown) => PipeResult<F3>;
function pipeSideEffect<
  F1 extends FromFn<any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>
): (input?: unknown) => PipeResult<F4>;
function pipeSideEffect<
  F1 extends FromFn<any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>
): (input?: unknown) => PipeResult<F5>;
function pipeSideEffect<
  F1 extends FromFn<any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>
): (input?: unknown) => PipeResult<F6>;
function pipeSideEffect<
  F1 extends FromFn<any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>,
  F7 extends UnaryFn<FnValue<F6>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>
): (input?: unknown) => PipeResult<F7>;
function pipeSideEffect<
  F1 extends FromFn<any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>,
  F7 extends UnaryFn<FnValue<F6>, any>,
  F8 extends UnaryFn<FnValue<F7>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>
): (input?: unknown) => PipeResult<F8>;
function pipeSideEffect<
  F1 extends FromFn<any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>,
  F7 extends UnaryFn<FnValue<F6>, any>,
  F8 extends UnaryFn<FnValue<F7>, any>,
  F9 extends UnaryFn<FnValue<F8>, any>
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
): (input?: unknown) => PipeResult<F9>;
function pipeSideEffect<
  F1 extends FromFn<any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>,
  F7 extends UnaryFn<FnValue<F6>, any>,
  F8 extends UnaryFn<FnValue<F7>, any>,
  F9 extends UnaryFn<FnValue<F8>, any>,
  F10 extends UnaryFn<FnValue<F9>, any>
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
): (input?: unknown) => PipeResult<F10>;

function pipeSideEffect<F1 extends UnaryFn<any, any>>(
  ab: F1
): (a: FnInput<F1> | SideEffect<any>) => PipeResult<F1>;
function pipeSideEffect<F1 extends UnaryFn<any, any>, F2 extends UnaryFn<FnValue<F1>, any>>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>
): (a: FnInput<F1> | SideEffect<any>) => PipeResult<F2>;
function pipeSideEffect<
  F1 extends UnaryFn<any, any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>
): (a: FnInput<F1> | SideEffect<any>) => PipeResult<F3>;
function pipeSideEffect<
  F1 extends UnaryFn<any, any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>
): (a: FnInput<F1> | SideEffect<any>) => PipeResult<F4>;
function pipeSideEffect<
  F1 extends UnaryFn<any, any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>
): (a: FnInput<F1> | SideEffect<any>) => PipeResult<F5>;
function pipeSideEffect<
  F1 extends UnaryFn<any, any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>
): (a: FnInput<F1> | SideEffect<any>) => PipeResult<F6>;
function pipeSideEffect<
  F1 extends UnaryFn<any, any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>,
  F7 extends UnaryFn<FnValue<F6>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>
): (a: FnInput<F1> | SideEffect<any>) => PipeResult<F7>;
function pipeSideEffect<
  F1 extends UnaryFn<any, any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>,
  F7 extends UnaryFn<FnValue<F6>, any>,
  F8 extends UnaryFn<FnValue<F7>, any>
>(
  ab: F1,
  bc: ValidateFn<F2, FnValue<F1>>,
  cd: ValidateFn<F3, FnValue<F2>>,
  de: ValidateFn<F4, FnValue<F3>>,
  ef: ValidateFn<F5, FnValue<F4>>,
  fg: ValidateFn<F6, FnValue<F5>>,
  gh: ValidateFn<F7, FnValue<F6>>,
  hi: ValidateFn<F8, FnValue<F7>>
): (a: FnInput<F1> | SideEffect<any>) => PipeResult<F8>;
function pipeSideEffect<
  F1 extends UnaryFn<any, any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>,
  F7 extends UnaryFn<FnValue<F6>, any>,
  F8 extends UnaryFn<FnValue<F7>, any>,
  F9 extends UnaryFn<FnValue<F8>, any>
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
): (a: FnInput<F1> | SideEffect<any>) => PipeResult<F9>;
function pipeSideEffect<
  F1 extends UnaryFn<any, any>,
  F2 extends UnaryFn<FnValue<F1>, any>,
  F3 extends UnaryFn<FnValue<F2>, any>,
  F4 extends UnaryFn<FnValue<F3>, any>,
  F5 extends UnaryFn<FnValue<F4>, any>,
  F6 extends UnaryFn<FnValue<F5>, any>,
  F7 extends UnaryFn<FnValue<F6>, any>,
  F8 extends UnaryFn<FnValue<F7>, any>,
  F9 extends UnaryFn<FnValue<F8>, any>,
  F10 extends UnaryFn<FnValue<F9>, any>
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
): (a: FnInput<F1> | SideEffect<any>) => PipeResult<F10>;

function pipeSideEffect<Fns extends [FromFn<any>, ...UnaryFn<any, any>[]]>(...funcs: PipeCheck<Fns>): PipeSideEffectFrom<Fns>;
function pipeSideEffect<Fns extends [UnaryFn<any, any>, ...UnaryFn<any, any>[]]>(...funcs: PipeCheck<Fns>): PipeSideEffect<Fns>;
function pipeSideEffect(...args: Array<UnaryFn<any, any>>): (input: any) => any;
function pipeSideEffect(...args: Array<any>) {
  const run = (init: any, funcs: Array<(input: any) => any>) => {
    let acc = init;
    for (const fn of funcs) {
      if (isSideEffect(acc)) {
        return acc;
      }
      acc = fn(acc);
    }
    return acc;
  };

  if (args.length === 0) {
    return undefined;
  }
  const [input, ...rest] = args as [any, ...Array<(input: any) => any>];
  if (typeof input === 'function') {
    const funcs = [input, ...rest];
    return (init: any) => run(init, funcs);
  }

  return run(input, rest);
}

export default pipeSideEffect;

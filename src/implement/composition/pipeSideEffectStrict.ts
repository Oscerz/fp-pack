import SideEffect, { isSideEffect } from './sideEffect';

type AnyFn = (...args: any[]) => any;
type MaybeSideEffect<T, E> = T | SideEffect<E>;
type NonSideEffect<T> = Exclude<T, SideEffect<any>>;
type UnaryFn<A, R> = (a: A) => R;
type ZeroFn<R> = () => R;

type EffectOfReturn<R> = R extends SideEffect<infer E> ? E : never;
type EffectOfFn<F> = F extends (...args: any[]) => infer R ? EffectOfReturn<R> : never;
type EffectsOf<Fns extends AnyFn[]> = EffectOfFn<Fns[number]>;

type PipeValueOutputUnary<Fns extends UnaryFn<any, any>[]> = Fns extends [UnaryFn<any, infer R>]
  ? NonSideEffect<R>
  : Fns extends [UnaryFn<any, infer R>, ...infer Rest]
    ? Rest extends [UnaryFn<NonSideEffect<R>, any>, ...UnaryFn<any, any>[]]
      ? PipeValueOutputUnary<Rest>
      : never
    : never;

type PipeValueOutputStrict<Fns extends [AnyFn, ...AnyFn[]]> =
  Fns extends [ZeroFn<infer R>]
    ? NonSideEffect<R>
    : Fns extends [ZeroFn<infer R>, ...infer Rest]
      ? Rest extends [UnaryFn<NonSideEffect<R>, any>, ...UnaryFn<any, any>[]]
        ? PipeValueOutputUnary<Rest>
        : never
      : Fns extends [UnaryFn<any, any>, ...UnaryFn<any, any>[]]
        ? PipeValueOutputUnary<Fns>
        : never;

type PipeInputStrict<Fns extends [AnyFn, ...AnyFn[]]> = Fns extends [ZeroFn<any>, ...AnyFn[]]
  ? never
  : Fns extends [UnaryFn<infer A, any>, ...AnyFn[]]
    ? A
    : never;

type Resolve<T> = T extends infer R ? R : never;

type PipeSideEffectStrictUnary<Fns extends [AnyFn, ...AnyFn[]]> = {
  (input: PipeInputStrict<Fns>): Resolve<MaybeSideEffect<PipeValueOutputStrict<Fns>, EffectsOf<Fns>>>;
  <EIn>(
    input: PipeInputStrict<Fns> | SideEffect<EIn>
  ): Resolve<MaybeSideEffect<PipeValueOutputStrict<Fns>, EffectsOf<Fns> | EIn>>;
};

type PipeSideEffectStrict<Fns extends [AnyFn, ...AnyFn[]]> = Fns extends [ZeroFn<any>, ...AnyFn[]]
  ? () => Resolve<MaybeSideEffect<PipeValueOutputStrict<Fns>, EffectsOf<Fns>>>
  : PipeSideEffectStrictUnary<Fns>;

function pipeSideEffectStrict<R>(ab: ZeroFn<R>): PipeSideEffectStrict<[ZeroFn<R>]>;
function pipeSideEffectStrict<B, R>(
  ab: ZeroFn<B>,
  bc: UnaryFn<NonSideEffect<B>, R>
): PipeSideEffectStrict<[ZeroFn<B>, UnaryFn<NonSideEffect<B>, R>]>;
function pipeSideEffectStrict<B, C, R>(
  ab: ZeroFn<B>,
  bc: UnaryFn<NonSideEffect<B>, C>,
  cd: UnaryFn<NonSideEffect<C>, R>
): PipeSideEffectStrict<[ZeroFn<B>, UnaryFn<NonSideEffect<B>, C>, UnaryFn<NonSideEffect<C>, R>]>;
function pipeSideEffectStrict<B, C, D, R>(
  ab: ZeroFn<B>,
  bc: UnaryFn<NonSideEffect<B>, C>,
  cd: UnaryFn<NonSideEffect<C>, D>,
  de: UnaryFn<NonSideEffect<D>, R>
): PipeSideEffectStrict<[
  ZeroFn<B>,
  UnaryFn<NonSideEffect<B>, C>,
  UnaryFn<NonSideEffect<C>, D>,
  UnaryFn<NonSideEffect<D>, R>
]>;
function pipeSideEffectStrict<B, C, D, E, R>(
  ab: ZeroFn<B>,
  bc: UnaryFn<NonSideEffect<B>, C>,
  cd: UnaryFn<NonSideEffect<C>, D>,
  de: UnaryFn<NonSideEffect<D>, E>,
  ef: UnaryFn<NonSideEffect<E>, R>
): PipeSideEffectStrict<[
  ZeroFn<B>,
  UnaryFn<NonSideEffect<B>, C>,
  UnaryFn<NonSideEffect<C>, D>,
  UnaryFn<NonSideEffect<D>, E>,
  UnaryFn<NonSideEffect<E>, R>
]>;
function pipeSideEffectStrict<A, R>(ab: UnaryFn<A, R>): PipeSideEffectStrict<[UnaryFn<A, R>]>;
function pipeSideEffectStrict<A, B, R>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<NonSideEffect<B>, R>
): PipeSideEffectStrict<[UnaryFn<A, B>, UnaryFn<NonSideEffect<B>, R>]>;
function pipeSideEffectStrict<A, B, C, R>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<NonSideEffect<B>, C>,
  cd: UnaryFn<NonSideEffect<C>, R>
): PipeSideEffectStrict<[UnaryFn<A, B>, UnaryFn<NonSideEffect<B>, C>, UnaryFn<NonSideEffect<C>, R>]>;
function pipeSideEffectStrict<A, B, C, D, R>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<NonSideEffect<B>, C>,
  cd: UnaryFn<NonSideEffect<C>, D>,
  de: UnaryFn<NonSideEffect<D>, R>
): PipeSideEffectStrict<[
  UnaryFn<A, B>,
  UnaryFn<NonSideEffect<B>, C>,
  UnaryFn<NonSideEffect<C>, D>,
  UnaryFn<NonSideEffect<D>, R>
]>;
function pipeSideEffectStrict<A, B, C, D, E, R>(
  ab: UnaryFn<A, B>,
  bc: UnaryFn<NonSideEffect<B>, C>,
  cd: UnaryFn<NonSideEffect<C>, D>,
  de: UnaryFn<NonSideEffect<D>, E>,
  ef: UnaryFn<NonSideEffect<E>, R>
): PipeSideEffectStrict<[
  UnaryFn<A, B>,
  UnaryFn<NonSideEffect<B>, C>,
  UnaryFn<NonSideEffect<C>, D>,
  UnaryFn<NonSideEffect<D>, E>,
  UnaryFn<NonSideEffect<E>, R>
]>;

function pipeSideEffectStrict<Fns extends [AnyFn, ...AnyFn[]]>(...funcs: Fns): PipeSideEffectStrict<Fns>;
function pipeSideEffectStrict(...funcs: Array<(input: any) => any>) {
  return (init?: any) => {
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

export default pipeSideEffectStrict;

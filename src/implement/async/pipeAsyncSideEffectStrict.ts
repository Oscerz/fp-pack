import SideEffect, { isSideEffect } from '../composition/sideEffect';

type AnyFn = (...args: any[]) => any;
type MaybeSideEffect<T, E> = T | SideEffect<E>;
type NonSideEffect<T> = Exclude<T, SideEffect<any>>;
type AsyncOrSync<A, R> = (a: A) => R | Promise<R>;
type ZeroFn<R> = () => R | Promise<R>;

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

type PipeAsyncSideEffectStrict<Fns extends [AnyFn, ...AnyFn[]]> = Fns extends [ZeroFn<any>, ...AnyFn[]]
  ? () => Promise<Resolve<MaybeSideEffect<PipeValueOutputStrict<Fns>, EffectsOf<Fns>>>>
  : PipeAsyncSideEffectStrictUnary<Fns>;

function pipeAsyncSideEffectStrict<R>(ab: ZeroFn<R>): PipeAsyncSideEffectStrict<[ZeroFn<R>]>;
function pipeAsyncSideEffectStrict<B, R>(
  ab: ZeroFn<B>,
  bc: AsyncOrSync<NonSideEffect<Awaited<B>>, R>
): PipeAsyncSideEffectStrict<[ZeroFn<B>, AsyncOrSync<NonSideEffect<Awaited<B>>, R>]>;
function pipeAsyncSideEffectStrict<B, C, R>(
  ab: ZeroFn<B>,
  bc: AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
  cd: AsyncOrSync<NonSideEffect<Awaited<C>>, R>
): PipeAsyncSideEffectStrict<[ZeroFn<B>, AsyncOrSync<NonSideEffect<Awaited<B>>, C>, AsyncOrSync<NonSideEffect<Awaited<C>>, R>]>;
function pipeAsyncSideEffectStrict<B, C, D, R>(
  ab: ZeroFn<B>,
  bc: AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
  cd: AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
  de: AsyncOrSync<NonSideEffect<Awaited<D>>, R>
): PipeAsyncSideEffectStrict<[
  ZeroFn<B>,
  AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
  AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
  AsyncOrSync<NonSideEffect<Awaited<D>>, R>
]>;
function pipeAsyncSideEffectStrict<B, C, D, E, R>(
  ab: ZeroFn<B>,
  bc: AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
  cd: AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
  de: AsyncOrSync<NonSideEffect<Awaited<D>>, E>,
  ef: AsyncOrSync<NonSideEffect<Awaited<E>>, R>
): PipeAsyncSideEffectStrict<[
  ZeroFn<B>,
  AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
  AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
  AsyncOrSync<NonSideEffect<Awaited<D>>, E>,
  AsyncOrSync<NonSideEffect<Awaited<E>>, R>
]>;
function pipeAsyncSideEffectStrict<A, R>(
  ab: AsyncOrSync<A, R>
): PipeAsyncSideEffectStrict<[AsyncOrSync<A, R>]>;
function pipeAsyncSideEffectStrict<A, B, R>(
  ab: AsyncOrSync<A, B>,
  bc: AsyncOrSync<NonSideEffect<Awaited<B>>, R>
): PipeAsyncSideEffectStrict<[AsyncOrSync<A, B>, AsyncOrSync<NonSideEffect<Awaited<B>>, R>]>;
function pipeAsyncSideEffectStrict<A, B, C, R>(
  ab: AsyncOrSync<A, B>,
  bc: AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
  cd: AsyncOrSync<NonSideEffect<Awaited<C>>, R>
): PipeAsyncSideEffectStrict<[
  AsyncOrSync<A, B>,
  AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
  AsyncOrSync<NonSideEffect<Awaited<C>>, R>
]>;
function pipeAsyncSideEffectStrict<A, B, C, D, R>(
  ab: AsyncOrSync<A, B>,
  bc: AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
  cd: AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
  de: AsyncOrSync<NonSideEffect<Awaited<D>>, R>
): PipeAsyncSideEffectStrict<[
  AsyncOrSync<A, B>,
  AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
  AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
  AsyncOrSync<NonSideEffect<Awaited<D>>, R>
]>;
function pipeAsyncSideEffectStrict<A, B, C, D, E, R>(
  ab: AsyncOrSync<A, B>,
  bc: AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
  cd: AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
  de: AsyncOrSync<NonSideEffect<Awaited<D>>, E>,
  ef: AsyncOrSync<NonSideEffect<Awaited<E>>, R>
): PipeAsyncSideEffectStrict<[
  AsyncOrSync<A, B>,
  AsyncOrSync<NonSideEffect<Awaited<B>>, C>,
  AsyncOrSync<NonSideEffect<Awaited<C>>, D>,
  AsyncOrSync<NonSideEffect<Awaited<D>>, E>,
  AsyncOrSync<NonSideEffect<Awaited<E>>, R>
]>;

function pipeAsyncSideEffectStrict<Fns extends [AnyFn, ...AnyFn[]]>(...funcs: Fns): PipeAsyncSideEffectStrict<Fns>;
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

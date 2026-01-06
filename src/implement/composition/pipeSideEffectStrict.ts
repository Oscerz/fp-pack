import type { FromFn } from './from';
import SideEffect, { isSideEffect } from './sideEffect';

type AnyFn = (...args: any[]) => any;
type MaybeSideEffect<T, E> = T | SideEffect<E>;
type NonSideEffect<T> = Exclude<T, SideEffect<any>>;
type UnaryFn<A, R> = (a: A) => R;
type ZeroFn<R> = () => R;
type PipeError<From, To> = { __pipe_side_effect_strict_error: ['pipeSideEffectStrict', From, '->', To] };
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
type PipeSideEffectStrictUnaryOptional<Fns extends [AnyFn, ...AnyFn[]]> = {
  (input?: PipeInputStrict<Fns>): Resolve<MaybeSideEffect<PipeValueOutputStrict<Fns>, EffectsOf<Fns>>>;
  <EIn>(
    input?: PipeInputStrict<Fns> | SideEffect<EIn>
  ): Resolve<MaybeSideEffect<PipeValueOutputStrict<Fns>, EffectsOf<Fns> | EIn>>;
};

type PipeSideEffectStrict<Fns extends [AnyFn, ...AnyFn[]]> = Fns extends [ZeroFn<any>, ...AnyFn[]]
  ? () => Resolve<MaybeSideEffect<PipeValueOutputStrict<Fns>, EffectsOf<Fns>>>
  : PipeSideEffectStrictUnary<Fns>;

function pipeSideEffectStrict<R>(...funcs: PipeCheck<[ZeroFn<R>]>): PipeSideEffectStrict<[ZeroFn<R>]>;
function pipeSideEffectStrict<B, R>(
  ...funcs: PipeCheck<[ZeroFn<B>, UnaryFn<NonSideEffect<B>, R>]>
): PipeSideEffectStrict<[ZeroFn<B>, UnaryFn<NonSideEffect<B>, R>]>;
function pipeSideEffectStrict<B, C, R>(
  ...funcs: PipeCheck<[ZeroFn<B>, UnaryFn<NonSideEffect<B>, C>, UnaryFn<NonSideEffect<C>, R>]>
): PipeSideEffectStrict<[ZeroFn<B>, UnaryFn<NonSideEffect<B>, C>, UnaryFn<NonSideEffect<C>, R>]>;
function pipeSideEffectStrict<B, C, D, R>(
  ...funcs: PipeCheck<[ZeroFn<B>, UnaryFn<NonSideEffect<B>, C>, UnaryFn<NonSideEffect<C>, D>, UnaryFn<NonSideEffect<D>, R>]>
): PipeSideEffectStrict<[
  ZeroFn<B>,
  UnaryFn<NonSideEffect<B>, C>,
  UnaryFn<NonSideEffect<C>, D>,
  UnaryFn<NonSideEffect<D>, R>
]>;
function pipeSideEffectStrict<B, C, D, E, R>(
  ...funcs: PipeCheck<[
    ZeroFn<B>,
    UnaryFn<NonSideEffect<B>, C>,
    UnaryFn<NonSideEffect<C>, D>,
    UnaryFn<NonSideEffect<D>, E>,
    UnaryFn<NonSideEffect<E>, R>
  ]>
): PipeSideEffectStrict<[
  ZeroFn<B>,
  UnaryFn<NonSideEffect<B>, C>,
  UnaryFn<NonSideEffect<C>, D>,
  UnaryFn<NonSideEffect<D>, E>,
  UnaryFn<NonSideEffect<E>, R>
]>;
function pipeSideEffectStrict<B, C, D, E, F, R>(
  ...funcs: PipeCheck<[
    ZeroFn<B>,
    UnaryFn<NonSideEffect<B>, C>,
    UnaryFn<NonSideEffect<C>, D>,
    UnaryFn<NonSideEffect<D>, E>,
    UnaryFn<NonSideEffect<E>, F>,
    UnaryFn<NonSideEffect<F>, R>
  ]>
): PipeSideEffectStrict<[
  ZeroFn<B>,
  UnaryFn<NonSideEffect<B>, C>,
  UnaryFn<NonSideEffect<C>, D>,
  UnaryFn<NonSideEffect<D>, E>,
  UnaryFn<NonSideEffect<E>, F>,
  UnaryFn<NonSideEffect<F>, R>
]>;
function pipeSideEffectStrict<B, C, D, E, F, G, R>(
  ...funcs: PipeCheck<[
    ZeroFn<B>,
    UnaryFn<NonSideEffect<B>, C>,
    UnaryFn<NonSideEffect<C>, D>,
    UnaryFn<NonSideEffect<D>, E>,
    UnaryFn<NonSideEffect<E>, F>,
    UnaryFn<NonSideEffect<F>, G>,
    UnaryFn<NonSideEffect<G>, R>
  ]>
): PipeSideEffectStrict<[
  ZeroFn<B>,
  UnaryFn<NonSideEffect<B>, C>,
  UnaryFn<NonSideEffect<C>, D>,
  UnaryFn<NonSideEffect<D>, E>,
  UnaryFn<NonSideEffect<E>, F>,
  UnaryFn<NonSideEffect<F>, G>,
  UnaryFn<NonSideEffect<G>, R>
]>;
function pipeSideEffectStrict<B, C, D, E, F, G, H, R>(
  ...funcs: PipeCheck<[
    ZeroFn<B>,
    UnaryFn<NonSideEffect<B>, C>,
    UnaryFn<NonSideEffect<C>, D>,
    UnaryFn<NonSideEffect<D>, E>,
    UnaryFn<NonSideEffect<E>, F>,
    UnaryFn<NonSideEffect<F>, G>,
    UnaryFn<NonSideEffect<G>, H>,
    UnaryFn<NonSideEffect<H>, R>
  ]>
): PipeSideEffectStrict<[
  ZeroFn<B>,
  UnaryFn<NonSideEffect<B>, C>,
  UnaryFn<NonSideEffect<C>, D>,
  UnaryFn<NonSideEffect<D>, E>,
  UnaryFn<NonSideEffect<E>, F>,
  UnaryFn<NonSideEffect<F>, G>,
  UnaryFn<NonSideEffect<G>, H>,
  UnaryFn<NonSideEffect<H>, R>
]>;
function pipeSideEffectStrict<B, C, D, E, F, G, H, I, R>(
  ...funcs: PipeCheck<[
    ZeroFn<B>,
    UnaryFn<NonSideEffect<B>, C>,
    UnaryFn<NonSideEffect<C>, D>,
    UnaryFn<NonSideEffect<D>, E>,
    UnaryFn<NonSideEffect<E>, F>,
    UnaryFn<NonSideEffect<F>, G>,
    UnaryFn<NonSideEffect<G>, H>,
    UnaryFn<NonSideEffect<H>, I>,
    UnaryFn<NonSideEffect<I>, R>
  ]>
): PipeSideEffectStrict<[
  ZeroFn<B>,
  UnaryFn<NonSideEffect<B>, C>,
  UnaryFn<NonSideEffect<C>, D>,
  UnaryFn<NonSideEffect<D>, E>,
  UnaryFn<NonSideEffect<E>, F>,
  UnaryFn<NonSideEffect<F>, G>,
  UnaryFn<NonSideEffect<G>, H>,
  UnaryFn<NonSideEffect<H>, I>,
  UnaryFn<NonSideEffect<I>, R>
]>;
function pipeSideEffectStrict<B, C, D, E, F, G, H, I, J, R>(
  ...funcs: PipeCheck<[
    ZeroFn<B>,
    UnaryFn<NonSideEffect<B>, C>,
    UnaryFn<NonSideEffect<C>, D>,
    UnaryFn<NonSideEffect<D>, E>,
    UnaryFn<NonSideEffect<E>, F>,
    UnaryFn<NonSideEffect<F>, G>,
    UnaryFn<NonSideEffect<G>, H>,
    UnaryFn<NonSideEffect<H>, I>,
    UnaryFn<NonSideEffect<I>, J>,
    UnaryFn<NonSideEffect<J>, R>
  ]>
): PipeSideEffectStrict<[
  ZeroFn<B>,
  UnaryFn<NonSideEffect<B>, C>,
  UnaryFn<NonSideEffect<C>, D>,
  UnaryFn<NonSideEffect<D>, E>,
  UnaryFn<NonSideEffect<E>, F>,
  UnaryFn<NonSideEffect<F>, G>,
  UnaryFn<NonSideEffect<G>, H>,
  UnaryFn<NonSideEffect<H>, I>,
  UnaryFn<NonSideEffect<I>, J>,
  UnaryFn<NonSideEffect<J>, R>
]>;
function pipeSideEffectStrict<Fns extends [FromFn<any>, ...AnyFn[]]>(
  ...funcs: PipeCheck<Fns>
): PipeSideEffectStrictUnaryOptional<Fns>;
function pipeSideEffectStrict<A, R>(...funcs: PipeCheck<[UnaryFn<A, R>]>): PipeSideEffectStrict<[UnaryFn<A, R>]>;
function pipeSideEffectStrict<A, B, R>(
  ...funcs: PipeCheck<[UnaryFn<A, B>, UnaryFn<NonSideEffect<B>, R>]>
): PipeSideEffectStrict<[UnaryFn<A, B>, UnaryFn<NonSideEffect<B>, R>]>;
function pipeSideEffectStrict<A, B, C, R>(
  ...funcs: PipeCheck<[UnaryFn<A, B>, UnaryFn<NonSideEffect<B>, C>, UnaryFn<NonSideEffect<C>, R>]>
): PipeSideEffectStrict<[UnaryFn<A, B>, UnaryFn<NonSideEffect<B>, C>, UnaryFn<NonSideEffect<C>, R>]>;
function pipeSideEffectStrict<A, B, C, D, R>(
  ...funcs: PipeCheck<[
    UnaryFn<A, B>,
    UnaryFn<NonSideEffect<B>, C>,
    UnaryFn<NonSideEffect<C>, D>,
    UnaryFn<NonSideEffect<D>, R>
  ]>
): PipeSideEffectStrict<[
  UnaryFn<A, B>,
  UnaryFn<NonSideEffect<B>, C>,
  UnaryFn<NonSideEffect<C>, D>,
  UnaryFn<NonSideEffect<D>, R>
]>;
function pipeSideEffectStrict<A, B, C, D, E, R>(
  ...funcs: PipeCheck<[
    UnaryFn<A, B>,
    UnaryFn<NonSideEffect<B>, C>,
    UnaryFn<NonSideEffect<C>, D>,
    UnaryFn<NonSideEffect<D>, E>,
    UnaryFn<NonSideEffect<E>, R>
  ]>
): PipeSideEffectStrict<[
  UnaryFn<A, B>,
  UnaryFn<NonSideEffect<B>, C>,
  UnaryFn<NonSideEffect<C>, D>,
  UnaryFn<NonSideEffect<D>, E>,
  UnaryFn<NonSideEffect<E>, R>
]>;
function pipeSideEffectStrict<A, B, C, D, E, F, R>(
  ...funcs: PipeCheck<[
    UnaryFn<A, B>,
    UnaryFn<NonSideEffect<B>, C>,
    UnaryFn<NonSideEffect<C>, D>,
    UnaryFn<NonSideEffect<D>, E>,
    UnaryFn<NonSideEffect<E>, F>,
    UnaryFn<NonSideEffect<F>, R>
  ]>
): PipeSideEffectStrict<[
  UnaryFn<A, B>,
  UnaryFn<NonSideEffect<B>, C>,
  UnaryFn<NonSideEffect<C>, D>,
  UnaryFn<NonSideEffect<D>, E>,
  UnaryFn<NonSideEffect<E>, F>,
  UnaryFn<NonSideEffect<F>, R>
]>;
function pipeSideEffectStrict<A, B, C, D, E, F, G, R>(
  ...funcs: PipeCheck<[
    UnaryFn<A, B>,
    UnaryFn<NonSideEffect<B>, C>,
    UnaryFn<NonSideEffect<C>, D>,
    UnaryFn<NonSideEffect<D>, E>,
    UnaryFn<NonSideEffect<E>, F>,
    UnaryFn<NonSideEffect<F>, G>,
    UnaryFn<NonSideEffect<G>, R>
  ]>
): PipeSideEffectStrict<[
  UnaryFn<A, B>,
  UnaryFn<NonSideEffect<B>, C>,
  UnaryFn<NonSideEffect<C>, D>,
  UnaryFn<NonSideEffect<D>, E>,
  UnaryFn<NonSideEffect<E>, F>,
  UnaryFn<NonSideEffect<F>, G>,
  UnaryFn<NonSideEffect<G>, R>
]>;
function pipeSideEffectStrict<A, B, C, D, E, F, G, H, R>(
  ...funcs: PipeCheck<[
    UnaryFn<A, B>,
    UnaryFn<NonSideEffect<B>, C>,
    UnaryFn<NonSideEffect<C>, D>,
    UnaryFn<NonSideEffect<D>, E>,
    UnaryFn<NonSideEffect<E>, F>,
    UnaryFn<NonSideEffect<F>, G>,
    UnaryFn<NonSideEffect<G>, H>,
    UnaryFn<NonSideEffect<H>, R>
  ]>
): PipeSideEffectStrict<[
  UnaryFn<A, B>,
  UnaryFn<NonSideEffect<B>, C>,
  UnaryFn<NonSideEffect<C>, D>,
  UnaryFn<NonSideEffect<D>, E>,
  UnaryFn<NonSideEffect<E>, F>,
  UnaryFn<NonSideEffect<F>, G>,
  UnaryFn<NonSideEffect<G>, H>,
  UnaryFn<NonSideEffect<H>, R>
]>;
function pipeSideEffectStrict<A, B, C, D, E, F, G, H, I, R>(
  ...funcs: PipeCheck<[
    UnaryFn<A, B>,
    UnaryFn<NonSideEffect<B>, C>,
    UnaryFn<NonSideEffect<C>, D>,
    UnaryFn<NonSideEffect<D>, E>,
    UnaryFn<NonSideEffect<E>, F>,
    UnaryFn<NonSideEffect<F>, G>,
    UnaryFn<NonSideEffect<G>, H>,
    UnaryFn<NonSideEffect<H>, I>,
    UnaryFn<NonSideEffect<I>, R>
  ]>
): PipeSideEffectStrict<[
  UnaryFn<A, B>,
  UnaryFn<NonSideEffect<B>, C>,
  UnaryFn<NonSideEffect<C>, D>,
  UnaryFn<NonSideEffect<D>, E>,
  UnaryFn<NonSideEffect<E>, F>,
  UnaryFn<NonSideEffect<F>, G>,
  UnaryFn<NonSideEffect<G>, H>,
  UnaryFn<NonSideEffect<H>, I>,
  UnaryFn<NonSideEffect<I>, R>
]>;
function pipeSideEffectStrict<A, B, C, D, E, F, G, H, I, J, R>(
  ...funcs: PipeCheck<[
    UnaryFn<A, B>,
    UnaryFn<NonSideEffect<B>, C>,
    UnaryFn<NonSideEffect<C>, D>,
    UnaryFn<NonSideEffect<D>, E>,
    UnaryFn<NonSideEffect<E>, F>,
    UnaryFn<NonSideEffect<F>, G>,
    UnaryFn<NonSideEffect<G>, H>,
    UnaryFn<NonSideEffect<H>, I>,
    UnaryFn<NonSideEffect<I>, J>,
    UnaryFn<NonSideEffect<J>, R>
  ]>
): PipeSideEffectStrict<[
  UnaryFn<A, B>,
  UnaryFn<NonSideEffect<B>, C>,
  UnaryFn<NonSideEffect<C>, D>,
  UnaryFn<NonSideEffect<D>, E>,
  UnaryFn<NonSideEffect<E>, F>,
  UnaryFn<NonSideEffect<F>, G>,
  UnaryFn<NonSideEffect<G>, H>,
  UnaryFn<NonSideEffect<H>, I>,
  UnaryFn<NonSideEffect<I>, J>,
  UnaryFn<NonSideEffect<J>, R>
]>;

function pipeSideEffectStrict<Fns extends [AnyFn, ...AnyFn[]]>(...funcs: PipeCheck<Fns>): PipeSideEffectStrict<Fns>;
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

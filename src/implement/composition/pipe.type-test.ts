import SideEffect from './sideEffect';
import pipe from './pipe';
import pipeSideEffect from './pipeSideEffect';
import pipeSideEffectStrict from './pipeSideEffectStrict';
import pipeAsync from '../async/pipeAsync';
import pipeAsyncSideEffect from '../async/pipeAsyncSideEffect';
import pipeAsyncSideEffectStrict from '../async/pipeAsyncSideEffectStrict';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
  ? true
  : false;
type Expect<T extends true> = T;
type EffectUnion<T> = Extract<T, SideEffect<any>> extends SideEffect<infer E> ? E : never;
type ValueUnion<T> = Exclude<T, SideEffect<any>>;

export const sideEffectInput = SideEffect.of(() => 0);

export const purePipe = pipe(
  (value: number) => value + 1,
  (value) => value * 2,
  (value) => `n:${value}`
);

type PurePipeExpected = (input: number) => string;
export type PipePureIsStrict = Expect<Equal<typeof purePipe, PurePipeExpected>>;

export const purePipeSix = pipe(
  (value: number) => value + 1,
  (value) => value * 2,
  (value) => `${value}`,
  (value) => value.length,
  (value) => value + 1,
  (value) => `n:${value}`
);

type PurePipeSixExpected = (input: number) => string;
export type PipePureSixIsStrict = Expect<Equal<typeof purePipeSix, PurePipeSixExpected>>;

export const pipeWithSideEffectInput = pipeSideEffect(
  (value: number) => value + 1,
  (value) => value * 2,
  (value) => `n:${value}`
);

export const pipeWithSideEffectValue = pipeWithSideEffectInput(sideEffectInput);

type PipeExpected = (input: number | SideEffect<any>) => string | SideEffect<any>;
export type PipeAcceptsSideEffectInput = Expect<Equal<typeof pipeWithSideEffectInput, PipeExpected>>;

export const pipeSideEffectSix = pipeSideEffect(
  (value: number) => value + 1,
  (value) => value * 2,
  (value) => value + 3,
  (value) => value - 1,
  (value) => value * 2,
  (value) => `n:${value}`
);

type PipeSideEffectSixExpected = (input: number | SideEffect<any>) => string | SideEffect<any>;
export type PipeSideEffectSixIsStrict = Expect<Equal<typeof pipeSideEffectSix, PipeSideEffectSixExpected>>;

export const purePipeAsync = pipeAsync(
  (value: number) => value + 1,
  async (value) => value * 2,
  (value) => `n:${value}`
);

type PurePipeAsyncExpected = (input: number) => Promise<string>;
export type PipeAsyncPureIsStrict = Expect<Equal<typeof purePipeAsync, PurePipeAsyncExpected>>;

export const purePipeAsyncSix = pipeAsync(
  (value: number) => value + 1,
  async (value) => value * 2,
  (value) => `${value}`,
  async (value) => value.length,
  (value) => value + 3,
  async (value) => `n:${value}`
);

type PurePipeAsyncSixExpected = (input: number) => Promise<string>;
export type PipeAsyncPureSixIsStrict = Expect<Equal<typeof purePipeAsyncSix, PurePipeAsyncSixExpected>>;

export const pipeAsyncWithSideEffectInput = pipeAsyncSideEffect(
  (value: number) => value + 1,
  async (value) => value * 2,
  (value) => `n:${value}`
);

export const pipeAsyncWithSideEffectValue = pipeAsyncWithSideEffectInput(sideEffectInput);

type PipeAsyncExpected = (input: number | SideEffect<any>) => Promise<string | SideEffect<any>>;
export type PipeAsyncAcceptsSideEffectInput = Expect<
  Equal<typeof pipeAsyncWithSideEffectInput, PipeAsyncExpected>
>;

export const pipeAsyncSideEffectSix = pipeAsyncSideEffect(
  (value: number) => value + 1,
  async (value) => value * 2,
  (value) => value + 3,
  async (value) => value - 1,
  (value) => value * 2,
  async (value) => `n:${value}`
);

type PipeAsyncSideEffectSixExpected = (input: number | SideEffect<any>) => Promise<string | SideEffect<any>>;
export type PipeAsyncSideEffectSixIsStrict = Expect<
  Equal<typeof pipeAsyncSideEffectSix, PipeAsyncSideEffectSixExpected>
>;

export const strictPipeSideEffect = pipeSideEffectStrict(
  (value: number) => value + 1,
  (value) => (value > 1 ? value : SideEffect.of(() => 'LOW' as const)),
  (value) => (value > 2 ? value : SideEffect.of(() => 0 as const))
);

export const strictPipeSideEffectResult = strictPipeSideEffect(1);

type StrictSideEffectEffects = EffectUnion<typeof strictPipeSideEffectResult>;
type StrictSideEffectEffectsExpected = 'LOW' | 0;
export type PipeSideEffectStrictEffects = Expect<Equal<StrictSideEffectEffects, StrictSideEffectEffectsExpected>>;

type StrictSideEffectValue = ValueUnion<typeof strictPipeSideEffectResult>;
type StrictSideEffectValueExpected = number;
export type PipeSideEffectStrictValue = Expect<Equal<StrictSideEffectValue, StrictSideEffectValueExpected>>;

export const strictPipeSideEffectInput = strictPipeSideEffect(SideEffect.of(() => 'INPUT' as const));

type StrictSideEffectInputEffects = EffectUnion<typeof strictPipeSideEffectInput>;
type StrictSideEffectInputEffectsExpected = 'LOW' | 0 | 'INPUT';
export type PipeSideEffectStrictInputEffects = Expect<
  Equal<StrictSideEffectInputEffects, StrictSideEffectInputEffectsExpected>
>;

export const strictPipeSideEffectSix = pipeSideEffectStrict(
  (value: number) => value + 1,
  (value) => (value > 2 ? value : SideEffect.of(() => 'LOW' as const)),
  (value) => value + 1,
  (value) => (value > 10 ? value : SideEffect.of(() => 'SMALL' as const)),
  (value) => value * 2,
  (value) => (value > 40 ? value : SideEffect.of(() => 0 as const))
);

export const strictPipeSideEffectSixResult = strictPipeSideEffectSix(1);

type StrictSixEffects = EffectUnion<typeof strictPipeSideEffectSixResult>;
type StrictSixEffectsExpected = 'LOW' | 'SMALL' | 0;
export type PipeSideEffectStrictSixEffects = Expect<Equal<StrictSixEffects, StrictSixEffectsExpected>>;

type StrictSixValue = ValueUnion<typeof strictPipeSideEffectSixResult>;
type StrictSixValueExpected = number;
export type PipeSideEffectStrictSixValue = Expect<Equal<StrictSixValue, StrictSixValueExpected>>;

export const strictPipeAsyncSideEffect = pipeAsyncSideEffectStrict(
  (value: number) => value + 1,
  async (value) => (value > 1 ? value : SideEffect.of(() => 'LOW' as const)),
  (value) => (value > 2 ? value : SideEffect.of(() => 0 as const))
);

export const strictPipeAsyncSideEffectResult = strictPipeAsyncSideEffect(1);

type StrictPipeAsyncResolved = Awaited<typeof strictPipeAsyncSideEffectResult>;
type StrictPipeAsyncEffects = EffectUnion<StrictPipeAsyncResolved>;
type StrictPipeAsyncEffectsExpected = 'LOW' | 0;
export type PipeAsyncSideEffectStrictEffects = Expect<
  Equal<StrictPipeAsyncEffects, StrictPipeAsyncEffectsExpected>
>;

type StrictPipeAsyncValue = ValueUnion<StrictPipeAsyncResolved>;
type StrictPipeAsyncValueExpected = number;
export type PipeAsyncSideEffectStrictValue = Expect<
  Equal<StrictPipeAsyncValue, StrictPipeAsyncValueExpected>
>;

export const strictPipeAsyncSideEffectSix = pipeAsyncSideEffectStrict(
  (value: number) => value + 1,
  async (value) => (value > 2 ? value : SideEffect.of(() => 'LOW' as const)),
  (value) => value + 1,
  async (value) => (value > 10 ? value : SideEffect.of(() => 'SMALL' as const)),
  (value) => value * 2,
  async (value) => (value > 40 ? value : SideEffect.of(() => 0 as const))
);

export const strictPipeAsyncSideEffectSixResult = strictPipeAsyncSideEffectSix(1);

type StrictAsyncSixResolved = Awaited<typeof strictPipeAsyncSideEffectSixResult>;
type StrictAsyncSixEffects = EffectUnion<StrictAsyncSixResolved>;
type StrictAsyncSixEffectsExpected = 'LOW' | 'SMALL' | 0;
export type PipeAsyncSideEffectStrictSixEffects = Expect<
  Equal<StrictAsyncSixEffects, StrictAsyncSixEffectsExpected>
>;

type StrictAsyncSixValue = ValueUnion<StrictAsyncSixResolved>;
type StrictAsyncSixValueExpected = number;
export type PipeAsyncSideEffectStrictSixValue = Expect<
  Equal<StrictAsyncSixValue, StrictAsyncSixValueExpected>
>;

import SideEffect from './sideEffect';
import pipe from './pipe';
import pipeAsync from '../async/pipeAsync';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
  ? true
  : false;
type Expect<T extends true> = T;

export const sideEffectInput = SideEffect.of(() => 0);

export const pipeWithSideEffectInput = pipe(
  (value: number) => value + 1,
  (value) => value * 2,
  (value) => `n:${value}`
);

export const pipeWithSideEffectValue = pipeWithSideEffectInput(sideEffectInput);

type PipeExpected = (input: number | SideEffect<any>) => string | SideEffect<any>;
export type PipeAcceptsSideEffectInput = Expect<Equal<typeof pipeWithSideEffectInput, PipeExpected>>;

export const pipeAsyncWithSideEffectInput = pipeAsync(
  (value: number) => value + 1,
  async (value) => value * 2,
  (value) => `n:${value}`
);

export const pipeAsyncWithSideEffectValue = pipeAsyncWithSideEffectInput(sideEffectInput);

type PipeAsyncExpected = (input: number | SideEffect<any>) => Promise<string | SideEffect<any>>;
export type PipeAsyncAcceptsSideEffectInput = Expect<
  Equal<typeof pipeAsyncWithSideEffectInput, PipeAsyncExpected>
>;

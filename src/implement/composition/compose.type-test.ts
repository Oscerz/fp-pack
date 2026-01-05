import compose from './compose';
import from from './from';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
  ? true
  : false;
type Expect<T extends true> = T;

export const pureCompose = compose(
  (value: string) => `n:${value}`,
  (value: number) => `${value}`,
  (value: number) => value * 2,
  (value: number) => value + 1
);

type PureComposeExpected = (input: number) => string;
export type ComposePureIsStrict = Expect<Equal<typeof pureCompose, PureComposeExpected>>;

export const pureComposeSix = compose(
  (value: number) => `n:${value}`,
  (value: number) => value + 1,
  (value: string) => value.length,
  (value: number) => `${value}`,
  (value: number) => value * 2,
  (value: number) => value + 1
);

type PureComposeSixExpected = (input: number) => string;
export type ComposePureSixIsStrict = Expect<Equal<typeof pureComposeSix, PureComposeSixExpected>>;

export const pureComposeTen = compose(
  (value: string) => `n:${value}`,
  (value: string) => value.padStart(4, '0'),
  (value: number) => `${value}`,
  (value: number) => value + 1,
  (value: string) => value.length,
  (value: string) => value.padStart(3, '0'),
  (value: number) => `${value}`,
  (value: number) => value * 2,
  (value: number) => value + 1,
  (value: number) => value + 1
);

type PureComposeTenExpected = (input: number) => string;
export type ComposePureTenIsStrict = Expect<Equal<typeof pureComposeTen, PureComposeTenExpected>>;

export const composeZero = compose(
  (value: number) => value + 1,
  (value: number) => value * 2,
  () => 1
);

type ComposeZeroExpected = () => number;
export type ComposeZeroIsStrict = Expect<Equal<typeof composeZero, ComposeZeroExpected>>;

export const composeZeroValue = composeZero();

type ComposeZeroValueExpected = number;
export type ComposeZeroValueIsStrict = Expect<Equal<typeof composeZeroValue, ComposeZeroValueExpected>>;

export const composeFromNoInput = compose(from(1));

type ComposeFromNoInputExpected = (input?: unknown) => number;
export type ComposeFromNoInputIsStrict = Expect<Equal<typeof composeFromNoInput, ComposeFromNoInputExpected>>;

export const composeFromNoInputValue = composeFromNoInput();

type ComposeFromNoInputValueExpected = number;
export type ComposeFromNoInputValueIsStrict = Expect<
  Equal<typeof composeFromNoInputValue, ComposeFromNoInputValueExpected>
>;

export const composeFromNoInputValueWithArg = composeFromNoInput('input');

type ComposeFromNoInputValueWithArgExpected = number;
export type ComposeFromNoInputValueWithArgIsStrict = Expect<
  Equal<typeof composeFromNoInputValueWithArg, ComposeFromNoInputValueWithArgExpected>
>;

export const composeFromTen = compose(
  (value: string) => `n:${value}`,
  (value: string) => value.padStart(4, '0'),
  (value: number) => `${value}`,
  (value: number) => value + 1,
  (value: string) => value.length,
  (value: string) => value.padStart(3, '0'),
  (value: number) => `${value}`,
  (value: number) => value * 2,
  (value: number) => value + 1,
  from(1)
);

export const composeFromTenValue = composeFromTen('input');

type ComposeFromTenValueExpected = string;
export type ComposeFromTenValueIsStrict = Expect<Equal<typeof composeFromTenValue, ComposeFromTenValueExpected>>;

export const composeFromTenValueNoInput = composeFromTen();

type ComposeFromTenValueNoInputExpected = string;
export type ComposeFromTenValueNoInputIsStrict = Expect<
  Equal<typeof composeFromTenValueNoInput, ComposeFromTenValueNoInputExpected>
>;

// Negative cases: input required when not using from/zero-arity.
// @ts-expect-error input required for unary compose
pureCompose();
// @ts-expect-error input required for direct compose call
compose((value: number) => value + 1)();

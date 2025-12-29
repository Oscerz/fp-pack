/**
 * Curry function with stable TypeScript types.
 * Supports functions with 2-5 parameters and keeps the original call signature.
 */

type Curry2Loose<R> = {
  (a: any): (b: any) => R;
  (a: any, b: any): R;
};

type IsUnknown<T> = unknown extends T ? ([T] extends [unknown] ? true : false) : false;

type Curry3Loose<R> = {
  (a: any): (b: any) => (c: any) => R;
  (a: any, b: any): (c: any) => R;
  (a: any, b: any, c: any): R;
};

type Curry4Loose<R> = {
  (a: any): (b: any) => (c: any) => (d: any) => R;
  (a: any, b: any): (c: any) => (d: any) => R;
  (a: any, b: any, c: any): (d: any) => R;
  (a: any, b: any, c: any, d: any): R;
};

type Curry5Loose<R> = {
  (a: any): (b: any) => (c: any) => (d: any) => (e: any) => R;
  (a: any, b: any): (c: any) => (d: any) => (e: any) => R;
  (a: any, b: any, c: any): (d: any) => (e: any) => R;
  (a: any, b: any, c: any, d: any): (e: any) => R;
  (a: any, b: any, c: any, d: any, e: any): R;
};

type Curry2Strict<Fn> = Fn extends (a: infer A, b: infer B) => infer R
  ? IsUnknown<A> extends true
    ? never
    : IsUnknown<B> extends true
      ? never
      : {
          (a: A): (b: B) => R;
          (a: A, b: B): R;
        }
  : never;

type Curry2<Fn extends (...args: any[]) => any> = [Curry2Strict<Fn>] extends [never]
  ? Curry2Loose<ReturnType<Fn>>
  : Curry2Strict<Fn> & Curry2Loose<ReturnType<Fn>>;

type Curry3Strict<Fn> = Fn extends (a: infer A, b: infer B, c: infer C) => infer R
  ? IsUnknown<A> extends true
    ? never
    : IsUnknown<B> extends true
      ? never
      : IsUnknown<C> extends true
        ? never
        : {
            (a: A): (b: B) => (c: C) => R;
            (a: A, b: B): (c: C) => R;
            (a: A, b: B, c: C): R;
          }
  : never;

type Curry3<Fn extends (...args: any[]) => any> = [Curry3Strict<Fn>] extends [never]
  ? Curry3Loose<ReturnType<Fn>>
  : Curry3Strict<Fn> & Curry3Loose<ReturnType<Fn>>;

type Curry4Strict<Fn> = Fn extends (a: infer A, b: infer B, c: infer C, d: infer D) => infer R
  ? IsUnknown<A> extends true
    ? never
    : IsUnknown<B> extends true
      ? never
      : IsUnknown<C> extends true
        ? never
        : IsUnknown<D> extends true
          ? never
          : {
              (a: A): (b: B) => (c: C) => (d: D) => R;
              (a: A, b: B): (c: C) => (d: D) => R;
              (a: A, b: B, c: C): (d: D) => R;
              (a: A, b: B, c: C, d: D): R;
            }
  : never;

type Curry4<Fn extends (...args: any[]) => any> = [Curry4Strict<Fn>] extends [never]
  ? Curry4Loose<ReturnType<Fn>>
  : Curry4Strict<Fn> & Curry4Loose<ReturnType<Fn>>;

type Curry5Strict<Fn> = Fn extends (a: infer A, b: infer B, c: infer C, d: infer D, e: infer E) => infer R
  ? IsUnknown<A> extends true
    ? never
    : IsUnknown<B> extends true
      ? never
      : IsUnknown<C> extends true
        ? never
        : IsUnknown<D> extends true
          ? never
          : IsUnknown<E> extends true
            ? never
            : {
                (a: A): (b: B) => (c: C) => (d: D) => (e: E) => R;
                (a: A, b: B): (c: C) => (d: D) => (e: E) => R;
                (a: A, b: B, c: C): (d: D) => (e: E) => R;
                (a: A, b: B, c: C, d: D): (e: E) => R;
                (a: A, b: B, c: C, d: D, e: E): R;
              }
  : never;

type Curry5<Fn extends (...args: any[]) => any> = [Curry5Strict<Fn>] extends [never]
  ? Curry5Loose<ReturnType<Fn>>
  : Curry5Strict<Fn> & Curry5Loose<ReturnType<Fn>>;

type CurryVariadic<Fn extends (...args: any[]) => any> = Fn extends (...args: infer P) => infer R
  ? <T extends any[]>(
      ...args: T
    ) => T extends P ? R : P extends [...T, ...infer Rest] ? CurryVariadic<(...args: Rest) => R> : never
  : never;

type CurryByArity<Fn extends (...args: any[]) => any> = Parameters<Fn>['length'] extends 2
  ? Curry2<Fn>
  : Parameters<Fn>['length'] extends 3
    ? Curry3<Fn>
    : Parameters<Fn>['length'] extends 4
      ? Curry4<Fn>
      : Parameters<Fn>['length'] extends 5
        ? Curry5<Fn>
        : CurryVariadic<Fn>;

type Curried<Fn extends (...args: any[]) => any> = Fn & CurryByArity<Fn>;

function curry<Fn extends (...args: any[]) => any>(fn: Fn): Curried<Fn>;

// Implementation
function curry(fn: (...args: any[]) => any, ...args: any[]): any {
  const curried = (accumulated: any[]) => {
    return accumulated.length >= fn.length
      ? fn(...accumulated)
      : (...nextArgs: any[]) => curried([...accumulated, ...nextArgs]);
  };

  return args.length === 0 ? curried([]) : curried(args);
}

export default curry;

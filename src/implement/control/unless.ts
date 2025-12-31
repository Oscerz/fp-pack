import curry from '../composition/curry';

type Widen<T> = T extends string ? string : T extends number ? number : T extends boolean ? boolean : T;

type Unless = {
  <T>(...args: [predicate: (value: Widen<T>) => boolean]): (
    fn: (value: Widen<T>) => Widen<T>
  ) => (value: Widen<T>) => Widen<T>;
  <T>(
    ...args: [predicate: (value: Widen<T>) => boolean, fn: (value: Widen<T>) => Widen<T>]
  ): (value: Widen<T>) => Widen<T>;
  <T>(
    ...args: [predicate: (value: Widen<T>) => boolean, fn: (value: Widen<T>) => Widen<T>, value: Widen<T>]
  ): Widen<T>;
};

/**
 * unless - 조건이 false일 때만 적용
 */
function unless<T>(
  predicate: (value: T) => boolean,
  fn: (value: T) => T,
  value: T
): T {
  return predicate(value) ? value : fn(value);
}

const curriedUnless = curry(unless) as Unless;
export default curriedUnless;

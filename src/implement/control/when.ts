import curry from '../composition/curry';

type Widen<T> = T extends string ? string : T extends number ? number : T extends boolean ? boolean : T;

type When = {
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
 * when - 조건이 true일 때만 적용
 */
function when<T>(
  predicate: (value: T) => boolean,
  fn: (value: T) => T,
  value: T
): T {
  return predicate(value) ? fn(value) : value;
}

const curriedWhen = curry(when) as When;
export default curriedWhen;

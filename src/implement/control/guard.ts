import curry from '../composition/curry';

type Guard = {
  <T, U extends T>(
    ...args: [predicate: (value: T) => boolean]
  ): (defaultValue: U) => (value: T) => T;
  <T, U extends T>(
    ...args: [predicate: (value: T) => boolean, defaultValue: U]
  ): (value: T) => T;
  <T, U extends T>(
    ...args: [predicate: (value: T) => boolean, defaultValue: U, value: T]
  ): T;
};

/**
 * guard - 조건 불만족 시 early return
 */
function guard<T, U extends T>(
  predicate: (value: T) => boolean,
  defaultValue: U,
  value: T
): T {
  return predicate(value) ? value : defaultValue;
}

const curriedGuard = curry(guard) as Guard;
export default curriedGuard;

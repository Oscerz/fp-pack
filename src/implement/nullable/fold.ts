import curry from '../composition/curry';

type Fold = {
  <R>(...args: [onNone: () => R]): <T>(
    onSome: (value: T) => R
  ) => (value: T | null | undefined) => R;
  <T, R>(
    ...args: [onNone: () => R, onSome: (value: T) => R]
  ): (value: T | null | undefined) => R;
  <T, R>(
    ...args: [onNone: () => R, onSome: (value: T) => R, value: T | null | undefined]
  ): R;
};

/** fold - Maybe/Result 처리 */
function fold<T, R>(
  onNone: () => R,
  onSome: (value: T) => R,
  value: T | null | undefined
): R {
  if (value === null || value === undefined) {
    return onNone();
  }
  return onSome(value);
}
const curriedFold = curry(fold) as Fold;
export default curriedFold;

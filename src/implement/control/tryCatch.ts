import curry from '../composition/curry';

type TryCatch = {
  <T, R>(...args: [tryFn: (value: T) => R]): (
    catchFn: (error: Error, value: T) => R
  ) => (value: T) => R;
  <T, R>(
    ...args: [tryFn: (value: T) => R, catchFn: (error: Error, value: T) => R]
  ): (value: T) => R;
  <T, R>(
    ...args: [
      tryFn: (value: T) => R,
      catchFn: (error: Error, value: T) => R,
      value: T
    ]
  ): R;
};

/**
 * tryCatch - 예외를 함수형으로 처리
 */
function tryCatch<T, R>(
  tryFn: (value: T) => R,
  catchFn: (error: Error, value: T) => R,
  value: T
): R {
  try {
    return tryFn(value);
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    return catchFn(error, value);
  }
}

const curriedTryCatch = curry(tryCatch) as TryCatch;
export default curriedTryCatch;

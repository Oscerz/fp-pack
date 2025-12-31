import curry from '../composition/curry';

type FlatMap = {
  <T, R>(...args: [fn: (value: T) => R[]]): (arr: T[]) => R[];
  <T, R>(...args: [fn: (value: T) => R[], arr: T[]]): R[];
};

/**
 * flatMap - map 후 flatten
 */
function flatMap<T, R>(fn: (value: T) => R[], arr: T[]): R[] {
  return arr.flatMap(fn);
}

const curriedFlatMap = curry(flatMap) as FlatMap;
export default curriedFlatMap;

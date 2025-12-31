import curry from '../composition/curry';

type Every = {
  <T>(...args: [predicate: (value: T) => boolean]): (arr: T[]) => boolean;
  <T>(...args: [predicate: (value: T) => boolean, arr: T[]]): boolean;
};

/**
 * every - 조건 검사 (모두 만족)
 */
function every<T>(predicate: (value: T) => boolean, arr: T[]): boolean {
  return arr.every(predicate);
}

const curriedEvery = curry(every) as Every;
export default curriedEvery;

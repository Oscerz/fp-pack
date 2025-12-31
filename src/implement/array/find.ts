import curry from '../composition/curry';

type Find = {
  <T>(...args: [predicate: (value: T) => boolean]): (arr: T[]) => T | undefined;
  <T>(...args: [predicate: (value: T) => boolean, arr: T[]]): T | undefined;
};

/**
 * find - 조건 만족 첫 요소
 */
function find<T>(predicate: (value: T) => boolean, arr: T[]): T | undefined {
  return arr.find(predicate);
}

const curriedFind = curry(find) as Find;
export default curriedFind;

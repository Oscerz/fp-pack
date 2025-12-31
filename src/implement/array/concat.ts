import curry from '../composition/curry';

type Concat = {
  <T>(...args: [other: T[]]): (arr: T[]) => T[];
  <T>(...args: [other: T[], arr: T[]]): T[];
};

/**
 * concat - 두 배열 연결
 */
function concat<T>(other: T[], arr: T[]): T[] {
  return [...arr, ...other];
}

const curriedConcat = curry(concat) as Concat;
export default curriedConcat;

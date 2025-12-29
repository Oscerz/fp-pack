import curry from '../composition/curry';

/**
 * concat - 두 배열 연결
 */
function concat<T>(other: T[], arr: T[]): T[] {
  return [...arr, ...other];
}

export default curry(concat);

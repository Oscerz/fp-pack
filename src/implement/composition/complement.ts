/**
 * complement - 조건 함수 반전
 */
function complement<T extends any[]>(predicate: (...args: T) => boolean): (...args: T) => boolean;
function complement<T extends any[]>(predicate: (...args: T) => boolean, ...args: T): boolean;
function complement<T extends any[]>(predicate: (...args: T) => boolean, ...args: T) {
  if (args.length === 0) {
    return (...nextArgs: T) => !predicate(...nextArgs);
  }
  return !predicate(...args);
}

export default complement;

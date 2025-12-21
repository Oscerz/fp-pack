/**
 * map - 요소 변환
 */
function map<T, R>(fn: (value: T) => R, arr: T[]): R[] {
  return arr.map(fn);
}

export default map;

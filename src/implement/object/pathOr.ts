import curry from '../composition/curry';

type PathOr = {
  <D>(...args: [defaultValue: D]): <T>(pathArray: string[]) => (obj: any) => T | D;
  <D>(...args: [defaultValue: D, pathArray: string[]]): <T>(obj: any) => T | D;
  <T, D>(...args: [defaultValue: D, pathArray: string[], obj: any]): T | D;
};

/**
 * pathOr - 기본값이 있는 깊은 프로퍼티 접근
 */
function pathOr<T, D>(defaultValue: D, pathArray: string[], obj: any): T | D {
  const value = pathArray.reduce((current, key) => (current == null ? undefined : current[key]), obj) as T | undefined;
  return value == null ? defaultValue : value;
}

const curriedPathOr = curry(pathOr) as PathOr;
export default curriedPathOr;

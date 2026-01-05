import curry from '../composition/curry';
import type { PathKey } from './pathKey';

type PathOr = {
  <D>(...args: [defaultValue: D]): <T>(pathArray: PathKey[]) => (obj: any) => T | D;
  <D>(...args: [defaultValue: D, pathArray: PathKey[]]): <T>(obj: any) => T | D;
  <T, D>(...args: [defaultValue: D, pathArray: PathKey[], obj: any]): T | D;
};

/**
 * pathOr - 기본값이 있는 깊은 프로퍼티 접근
 */
function pathOr<T, D>(defaultValue: D, pathArray: PathKey[], obj: any): T | D {
  const value = pathArray.reduce((current, key) => (current == null ? undefined : current[key]), obj) as T | undefined;
  return value == null ? defaultValue : value;
}

const curriedPathOr = curry(pathOr) as PathOr;
export default curriedPathOr;
export type { PathKey };

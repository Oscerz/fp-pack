import curry from '../composition/curry';

type PropOr = {
  <D>(...args: [defaultValue: D]): <K extends PropertyKey>(
    key: K
  ) => <T extends Record<K, unknown>>(obj: T) => T[K] | D;
  <D, K extends PropertyKey>(
    ...args: [defaultValue: D, key: K]
  ): <T extends Record<K, unknown>>(obj: T) => T[K] | D;
  <T, K extends keyof T, D>(...args: [defaultValue: D, key: K, obj: T]): T[K] | D;
};

/**
 * propOr - 기본값이 있는 프로퍼티 접근
 */
function propOr<T, K extends keyof T, D>(defaultValue: D, key: K, obj: T): T[K] | D {
  const value = obj?.[key];
  return value == null ? defaultValue : value;
}

const curriedPropOr = curry(propOr) as PropOr;
export default curriedPropOr;

import curry from '../composition/curry';

type Prop = {
  <K extends PropertyKey>(...args: [key: K]): <T extends Record<K, unknown>>(obj: T) => T[K] | undefined;
  <T, K extends keyof T = keyof T>(...args: [key: K, obj: T]): T[K] | undefined;
};

/**
 * prop - 안전한 프로퍼티 접근
 */
function prop<T, K extends keyof T = keyof T>(key: K, obj: T): T[K] | undefined {
  return obj?.[key];
}

const curriedProp = curry(prop) as Prop;
export default curriedProp;

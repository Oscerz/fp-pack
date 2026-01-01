import curry from '../composition/curry';

type PropStrict = {
  <K extends PropertyKey>(...args: [key: K]): <T extends Record<K, unknown>>(obj: T) => NonNullable<T[K]>;
  <T, K extends keyof T>(...args: [key: K, obj: T]): NonNullable<T[K]>;
};

/**
 * propStrict - strict property access (throws on null/undefined)
 */
function propStrict<T, K extends keyof T = keyof T>(key: K, obj: T): NonNullable<T[K]> {
  const value = obj?.[key];
  if (value == null) {
    throw new Error(`propStrict: "${String(key)}" is null or undefined`);
  }
  return value as NonNullable<T[K]>;
}

const curriedPropStrict = curry(propStrict) as unknown as PropStrict;
export default curriedPropStrict;

import curry from '../composition/curry';

type Has = {
  <K extends PropertyKey>(...args: [key: K]): <T extends Record<K, unknown>>(obj: T) => boolean;
  <T extends object>(...args: [key: keyof T, obj: T]): boolean;
};

/**
 * has - 속성 존재 확인
 */
function has<T extends object>(key: keyof T, obj: T): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

const curriedHas = curry(has) as Has;
export default curriedHas;

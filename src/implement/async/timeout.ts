import curry from '../composition/curry';

type Timeout = {
  (ms: number): <T>(promise: Promise<T>) => Promise<T>;
  <T>(...args: [ms: number, promise: Promise<T>]): Promise<T>;
};

/** timeout - 제한 시간 내 실행 */
function timeout<T>(ms: number, promise: Promise<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms);
    promise
      .then((val) => {
        clearTimeout(timer);
        resolve(val);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}
const curriedTimeout = curry(timeout) as Timeout;
export default curriedTimeout;

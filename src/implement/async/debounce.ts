import curry from '../composition/curry';

type Debounce = {
  <T extends (...args: any[]) => any>(...args: [fn: T]): (ms: number) => T;
  <T extends (...args: any[]) => any>(...args: [fn: T, ms: number]): T;
};

/** debounce - 호출 제어 (디바운스) */
function debounce<T extends (...args: any[]) => any>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const debounced = function (this: unknown, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer);
    }
    const context = this;
    timer = setTimeout(() => {
      timer = undefined;
      fn.apply(context, args);
    }, ms);
  };

  return debounced as T;
}
const curriedDebounce = curry(debounce) as Debounce;
export default curriedDebounce;

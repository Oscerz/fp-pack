/**
 * from - 입력을 무시하고 고정 값을 반환
 */
export type FromFn<T> = {
  <I>(_input: I): T;
  readonly __from: true;
};

function from<T>(value: T): FromFn<T> {
  const fn = (_input: unknown) => value;
  Object.defineProperty(fn, '__from', { value: true });
  return fn as FromFn<T>;
}

export default from;

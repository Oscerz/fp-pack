/**
 * from - 입력을 무시하고 고정 값을 반환
 */
function from<T>(value: T) {
  return <I>(_input: I) => value;
}

export default from;

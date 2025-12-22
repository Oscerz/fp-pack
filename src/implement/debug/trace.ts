/** trace - 파이프라인 중간 값 출력 */
function trace<T>(label?: string): (value: T) => T {
  return (value: T) => {
    if (label) {
      console.log(label, value);
    } else {
      console.log(value);
    }
    return value;
  };
}
export default trace;

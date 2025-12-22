/** log - tap 기반 로깅 */
function log<T>(label?: string): (value: T) => T {
  return (value: T) => {
    if (label) {
      console.log(label, value);
    } else {
      console.log(value);
    }
    return value;
  };
}
export default log;

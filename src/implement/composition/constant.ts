/**
 * constant (always) - 항상 같은 값을 반환
 */
function constant<T>(value: T): () => T {
  return () => value;
}

export default constant;

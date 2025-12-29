/**
 * flatten - 1단계 배열 평탄화
 */
function flatten<T>(arr: T[][]): T[] {
  return arr.flat();
}

export default flatten;

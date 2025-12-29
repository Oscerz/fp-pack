/**
 * mergeAll - 객체 배열 병합 (얕은 병합)
 */
function mergeAll<T extends object>(objects: T[]): T {
  const merged = objects.reduce<Record<string, unknown>>(
    (acc, obj) => ({ ...acc, ...(obj as Record<string, unknown>) }),
    {}
  );
  return merged as T;
}

export default mergeAll;

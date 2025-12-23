/** endsWith - 끝 문자열/배열 확인 */
function endsWith(suffix: string, str: string): boolean;
function endsWith<T>(suffix: T[], arr: T[]): boolean;
function endsWith(suffix: string | any[], target: string | any[]): boolean {
  if (typeof target === 'string' && typeof suffix === 'string') {
    return target.endsWith(suffix);
  }

  if (Array.isArray(suffix) && Array.isArray(target)) {
    if (suffix.length === 0) return true;
    if (suffix.length > target.length) return false;
    for (let i = 0; i < suffix.length; i++) {
      const targetIdx = target.length - suffix.length + i;
      if (target[targetIdx] !== suffix[i]) return false;
    }
    return true;
  }

  return false;
}
export default endsWith;

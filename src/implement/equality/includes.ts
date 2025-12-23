/** includes - 동등성 기반 포함 여부 (문자열 또는 배열) */
import equals from './equals';

function includes(search: string, target: string): boolean;
function includes<T>(search: T, target: T[]): boolean;
function includes(search: any, target: any): boolean {
  if (typeof target === 'string' && typeof search === 'string') {
    return target.includes(search);
  }

  if (Array.isArray(target)) {
    for (let i = 0; i < target.length; i++) {
      if (equals(target[i], search)) return true;
    }
    return false;
  }

  return false;
}

export default includes;

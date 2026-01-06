import curry from '../composition/curry';

/** split - 문자열 분할 */
function split(separator: string | RegExp, str: string): string[] {
  return str.split(separator);
}
export default curry(split);

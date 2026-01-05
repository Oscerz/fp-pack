/**
 * tap0 - 입력 없이 side-effect 실행
 */
function tap0(fn: () => void): () => void {
  return () => {
    fn();
  };
}

export default tap0;

type PipeFn<A, R> = (input: A) => R;

/**
 * pipeHint - narrow a unary function's type for pipe composition.
 */
function pipeHint<A, R>(fn: PipeFn<A, R>): PipeFn<A, R> {
  return fn;
}

export default pipeHint;

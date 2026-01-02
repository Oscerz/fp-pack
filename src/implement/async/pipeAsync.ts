/** pipeAsync - 비동기 함수 합성 */
type AsyncOrSync<A, R> = (a: A) => R | Promise<R>;
type PipeInput<Fns extends AsyncOrSync<any, any>[]> = Fns extends [AsyncOrSync<infer A, any>, ...AsyncOrSync<any, any>[]]
  ? A
  : never;
type PipeOutput<Fns extends AsyncOrSync<any, any>[]> = Fns extends [AsyncOrSync<any, infer R>]
  ? Awaited<R>
  : Fns extends [AsyncOrSync<any, infer R>, ...infer Rest]
    ? Rest extends [AsyncOrSync<Awaited<R>, any>, ...AsyncOrSync<any, any>[]]
      ? PipeOutput<Rest>
      : never
    : never;
type PipeAsync<Fns extends AsyncOrSync<any, any>[]> = (input: PipeInput<Fns>) => Promise<PipeOutput<Fns>>;

function pipeAsync<A, R>(ab: AsyncOrSync<A, R>): (a: A) => Promise<Awaited<R>>;
function pipeAsync<A, B, R>(ab: AsyncOrSync<A, B>, bc: AsyncOrSync<Awaited<B>, R>): (a: A) => Promise<Awaited<R>>;
function pipeAsync<A, B, C, R>(
  ab: AsyncOrSync<A, B>,
  bc: AsyncOrSync<Awaited<B>, C>,
  cd: AsyncOrSync<Awaited<C>, R>
): (a: A) => Promise<Awaited<R>>;
function pipeAsync<A, B, C, D, R>(
  ab: AsyncOrSync<A, B>,
  bc: AsyncOrSync<Awaited<B>, C>,
  cd: AsyncOrSync<Awaited<C>, D>,
  de: AsyncOrSync<Awaited<D>, R>
): (a: A) => Promise<Awaited<R>>;
function pipeAsync<A, B, C, D, E, R>(
  ab: AsyncOrSync<A, B>,
  bc: AsyncOrSync<Awaited<B>, C>,
  cd: AsyncOrSync<Awaited<C>, D>,
  de: AsyncOrSync<Awaited<D>, E>,
  ef: AsyncOrSync<Awaited<E>, R>
): (a: A) => Promise<Awaited<R>>;
function pipeAsync<A, B, C, D, E, F, R>(
  ab: AsyncOrSync<A, B>,
  bc: AsyncOrSync<Awaited<B>, C>,
  cd: AsyncOrSync<Awaited<C>, D>,
  de: AsyncOrSync<Awaited<D>, E>,
  ef: AsyncOrSync<Awaited<E>, F>,
  fg: AsyncOrSync<Awaited<F>, R>
): (a: A) => Promise<Awaited<R>>;
function pipeAsync<A, B, C, D, E, F, G, R>(
  ab: AsyncOrSync<A, B>,
  bc: AsyncOrSync<Awaited<B>, C>,
  cd: AsyncOrSync<Awaited<C>, D>,
  de: AsyncOrSync<Awaited<D>, E>,
  ef: AsyncOrSync<Awaited<E>, F>,
  fg: AsyncOrSync<Awaited<F>, G>,
  gh: AsyncOrSync<Awaited<G>, R>
): (a: A) => Promise<Awaited<R>>;
function pipeAsync<A, B, C, D, E, F, G, H, R>(
  ab: AsyncOrSync<A, B>,
  bc: AsyncOrSync<Awaited<B>, C>,
  cd: AsyncOrSync<Awaited<C>, D>,
  de: AsyncOrSync<Awaited<D>, E>,
  ef: AsyncOrSync<Awaited<E>, F>,
  fg: AsyncOrSync<Awaited<F>, G>,
  gh: AsyncOrSync<Awaited<G>, H>,
  hi: AsyncOrSync<Awaited<H>, R>
): (a: A) => Promise<Awaited<R>>;
function pipeAsync<A, B, C, D, E, F, G, H, I, R>(
  ab: AsyncOrSync<A, B>,
  bc: AsyncOrSync<Awaited<B>, C>,
  cd: AsyncOrSync<Awaited<C>, D>,
  de: AsyncOrSync<Awaited<D>, E>,
  ef: AsyncOrSync<Awaited<E>, F>,
  fg: AsyncOrSync<Awaited<F>, G>,
  gh: AsyncOrSync<Awaited<G>, H>,
  hi: AsyncOrSync<Awaited<H>, I>,
  ij: AsyncOrSync<Awaited<I>, R>
): (a: A) => Promise<Awaited<R>>;
function pipeAsync<A, B, C, D, E, F, G, H, I, J, R>(
  ab: AsyncOrSync<A, B>,
  bc: AsyncOrSync<Awaited<B>, C>,
  cd: AsyncOrSync<Awaited<C>, D>,
  de: AsyncOrSync<Awaited<D>, E>,
  ef: AsyncOrSync<Awaited<E>, F>,
  fg: AsyncOrSync<Awaited<F>, G>,
  gh: AsyncOrSync<Awaited<G>, H>,
  hi: AsyncOrSync<Awaited<H>, I>,
  ij: AsyncOrSync<Awaited<I>, J>,
  jk: AsyncOrSync<Awaited<J>, R>
): (a: A) => Promise<Awaited<R>>;

function pipeAsync<Fns extends [AsyncOrSync<any, any>, ...AsyncOrSync<any, any>[]]>(...funcs: Fns): PipeAsync<Fns>;
function pipeAsync(...funcs: Array<AsyncOrSync<any, any>>): (value: any) => Promise<any>;
function pipeAsync(...funcs: Array<(arg: any) => any>) {
  return async (value: any) => {
    let acc = value;
    for (const fn of funcs) {
      acc = await fn(acc);
    }
    return acc;
  };
}

export default pipeAsync;

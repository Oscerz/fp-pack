import { CodeBlock } from '@/components/CodeBlock';

export const StreamScan_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      scan (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      누적 중간값을 지연 방출합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      stream scan 이란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        scan
      </strong>{' '}
      은 누적값을 계산하고 각 단계의 결과를 방출합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { scan } from 'fp-kit/stream';

const iter = scan((acc: number, n: number) => acc + n, 0, [1, 2, 3]);
Array.from(iter); // [1, 3, 6]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function scan<T, R>(fn: (acc: R, value: T) => R, initial: R, iterable: Iterable<T>): IterableIterator<R>;
function scan<T, R>(fn: (acc: R, value: T) => R | Promise<R>, initial: R, iterable: AnyIterableInput<PromiseLikeValue<T>>): AsyncIterableIterator<R>;
function scan<T, R>(fn: (acc: R, value: T) => R, initial: R): (iterable: Iterable<T>) => IterableIterator<R>;
function scan<T, R>(fn: (acc: R, value: T) => R | Promise<R>, initial: R): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<R>;`}
    />
  </div>
);

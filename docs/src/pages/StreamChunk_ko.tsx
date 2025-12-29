import { CodeBlock } from '@/components/CodeBlock';

export const StreamChunk_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      chunk (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Iterable 또는 AsyncIterable을 지연 평가로 일정 크기로 분할
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      stream chunk란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        chunk
      </strong>{' '}
      는 stream 모듈에서 Iterable/AsyncIterable을 순차적으로 잘라내는 지연 연산입니다.
      전체 데이터를 미리 만들지 않으므로 대용량이나 비동기 소스에 적합합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { chunk } from 'fp-kit/stream';

const iter = chunk(2, [1, 2, 3, 4]);
iter.next(); // { done: false, value: [1, 2] }
iter.next(); // { done: false, value: [3, 4] }
iter.next(); // { done: true, value: undefined }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function chunk<T>(size: number, iterable: Iterable<T>): IterableIterator<T[]>;
function chunk<T>(size: number, iterable: AsyncIterable<T> | Promise<Iterable<T> | AsyncIterable<T>>): AsyncIterableIterator<T[]>;
function chunk<T>(size: number): (iterable: Iterable<T>) => IterableIterator<T[]>;
function chunk<T>(size: number): (iterable: AsyncIterable<T> | Promise<Iterable<T> | AsyncIterable<T>>) => AsyncIterableIterator<T[]>;`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      크기는 정수로 내림됩니다. 0, 음수, 유한하지 않은 값이면 아무 청크도 생성하지 않습니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      pipeAsync와 함께 사용
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { chunk, toArray, toAsync } from 'fp-kit/stream';
import { pipeAsync } from 'fp-kit';

await pipeAsync(chunk(2), toArray)([1, 2, 3, 4]);
// [[1, 2], [3, 4]]

await pipeAsync(chunk(2), toArray)(Promise.resolve([1, 2, 3, 4]));
// [[1, 2], [3, 4]]

await pipeAsync(toAsync, chunk(2), toArray)([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
  Promise.resolve(4),
]);
// [[1, 2], [3, 4]]`}
    />
  </div>
);

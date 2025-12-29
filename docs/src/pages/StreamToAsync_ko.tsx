import { CodeBlock } from '@/components/CodeBlock';

export const StreamToAsync_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      toAsync (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Iterable 또는 AsyncIterable을 AsyncIterable로 변환
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      stream toAsync란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        toAsync
      </strong>{' '}
      는 Iterable/AsyncIterable(또는 이를 resolve하는 Promise)을 AsyncIterable로 통일합니다.
      소스에서 Promise 값을 내보내면 자동으로 기다립니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { toAsync, toArray } from 'fp-kit/stream';

const asyncIter = toAsync([Promise.resolve(1), 2, 3]);
await toArray(asyncIter);
// [1, 2, 3]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function toAsync<T>(input: Iterable<T> | AsyncIterable<T> | Promise<Iterable<T> | AsyncIterable<T>>): AsyncIterable<T>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      pipeAsync와 함께 사용
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { chunk, toArray, toAsync } from 'fp-kit/stream';
import { pipeAsync } from 'fp-kit';

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

import { CodeBlock } from '@/components/CodeBlock';

export const StreamToAsync = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      toAsync (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Convert Iterable or AsyncIterable into AsyncIterable
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is stream toAsync?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        toAsync
      </strong>{' '}
      normalizes any Iterable/AsyncIterable (or a Promise that resolves to one)
      into an AsyncIterable. Promise-like values yielded by the source are
      automatically awaited.
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
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function toAsync<T>(input: Iterable<T> | AsyncIterable<T> | Promise<Iterable<T> | AsyncIterable<T>>): AsyncIterable<T>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      With pipeAsync
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

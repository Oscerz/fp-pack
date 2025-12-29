import { CodeBlock } from '@/components/CodeBlock';

export const StreamChunk = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      chunk (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Lazily split an Iterable or AsyncIterable into fixed-size chunks
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is stream chunk?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        chunk
      </strong>{' '}
      in the stream module produces chunks lazily from an Iterable or AsyncIterable.
      It does not materialize the whole input, which is useful for large datasets or
      async sources.
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
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function chunk<T>(size: number, iterable: Iterable<T>): IterableIterator<T[]>;
function chunk<T>(size: number, iterable: AsyncIterable<T> | Promise<Iterable<T> | AsyncIterable<T>>): AsyncIterableIterator<T[]>;
function chunk<T>(size: number): (iterable: Iterable<T>) => IterableIterator<T[]>;
function chunk<T>(size: number): (iterable: AsyncIterable<T> | Promise<Iterable<T> | AsyncIterable<T>>) => AsyncIterableIterator<T[]>;`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      The size is floored to an integer. If size is 0, negative, or not finite,
      the iterator completes without yielding any chunks.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      With pipeAsync
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

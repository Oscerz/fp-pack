import { CodeBlock } from '@/components/CodeBlock';

export const StreamToArray = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      toArray (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Collect an Iterable or AsyncIterable into an array
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is stream toArray?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        toArray
      </strong>{' '}
      materializes an Iterable or AsyncIterable into a concrete array. It also
      awaits promise-like values yielded from async sources.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { toArray } from 'fp-kit/stream';

await toArray([1, 2, 3]);
// [1, 2, 3]

async function* gen() {
  yield 1;
  yield Promise.resolve(2);
}

await toArray(gen());
// [1, 2]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function toArray<T>(input: Iterable<T> | AsyncIterable<T> | Promise<Iterable<T> | AsyncIterable<T>>): Promise<T[]>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      With pipeAsync
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { chunk, toArray } from 'fp-kit/stream';
import { pipeAsync } from 'fp-kit';

await pipeAsync(chunk(2), toArray)([1, 2, 3, 4]);
// [[1, 2], [3, 4]]`}
    />
  </div>
);

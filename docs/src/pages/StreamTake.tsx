import { CodeBlock } from '@/components/CodeBlock';

export const StreamTake = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      take (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Lazily take the first N values
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is stream take?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        take
      </strong>{' '}
      stops after emitting the first N values, making it ideal for short-circuiting.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { take } from 'fp-kit/stream';

const iter = take(2, [1, 2, 3]);
Array.from(iter); // [1, 2]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function take<T>(count: number, iterable: Iterable<T>): IterableIterator<T>;
function take<T>(count: number, iterable: AnyIterableInput<PromiseLikeValue<T>>): AsyncIterableIterator<T>;
function take<T>(count: number): (iterable: Iterable<T>) => IterableIterator<T>;
function take<T>(count: number): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      With Async Inputs
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { take, toArray } from 'fp-kit/stream';

const result = await toArray(take(2, Promise.resolve([1, 2, 3])));
// [1, 2]`}
    />
  </div>
);

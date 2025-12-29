import { CodeBlock } from '@/components/CodeBlock';

export const StreamFilter = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      filter (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Lazily keep values that pass a predicate
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is stream filter?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        filter
      </strong>{' '}
      yields only the values that satisfy the predicate and does so lazily.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { filter } from 'fp-kit/stream';

const iter = filter((n: number) => n % 2 === 0, [1, 2, 3, 4]);
Array.from(iter); // [2, 4]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function filter<T>(predicate: (value: T) => boolean, iterable: Iterable<T>): IterableIterator<T>;
function filter<T>(predicate: (value: T) => boolean | Promise<boolean>, iterable: AnyIterableInput<PromiseLikeValue<T>>): AsyncIterableIterator<T>;
function filter<T>(predicate: (value: T) => boolean): (iterable: Iterable<T>) => IterableIterator<T>;
function filter<T>(predicate: (value: T) => boolean | Promise<boolean>): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      With Async Inputs
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { filter, toArray } from 'fp-kit/stream';

const result = await toArray(
  filter(async (n: number) => n > 1, Promise.resolve([1, 2, 3]))
);
// [2, 3]`}
    />
  </div>
);

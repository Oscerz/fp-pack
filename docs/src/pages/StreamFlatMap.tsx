import { CodeBlock } from '@/components/CodeBlock';

export const StreamFlatMap = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      flatMap (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Lazily map and flatten nested iterables
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is stream flatMap?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        flatMap
      </strong>{' '}
      maps each value to an Iterable and flattens it lazily.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatMap } from 'fp-kit/stream';

const iter = flatMap((n: number) => [n, n + 1], [1, 2]);
Array.from(iter); // [1, 2, 2, 3]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function flatMap<T, R>(fn: (value: T) => Iterable<R>, iterable: Iterable<T>): IterableIterator<R>;
function flatMap<T, R>(fn: (value: T) => Iterable<R> | Promise<Iterable<R>>, iterable: AnyIterableInput<PromiseLikeValue<T>>): AsyncIterableIterator<R>;
function flatMap<T, R>(fn: (value: T) => Iterable<R>): (iterable: Iterable<T>) => IterableIterator<R>;
function flatMap<T, R>(fn: (value: T) => Iterable<R> | Promise<Iterable<R>>): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<R>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      With Async Inputs
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { flatMap, toArray } from 'fp-kit/stream';

const result = await toArray(
  flatMap(async (n: number) => [n, n * 2], Promise.resolve([1, 2]))
);
// [1, 2, 2, 4]`}
    />
  </div>
);

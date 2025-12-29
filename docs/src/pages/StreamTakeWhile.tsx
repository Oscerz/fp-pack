import { CodeBlock } from '@/components/CodeBlock';

export const StreamTakeWhile = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      takeWhile (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Lazily take values while a predicate holds
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is stream takeWhile?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        takeWhile
      </strong>{' '}
      stops as soon as the predicate fails.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { takeWhile } from 'fp-kit/stream';

const iter = takeWhile((n: number) => n < 3, [1, 2, 3, 1]);
Array.from(iter); // [1, 2]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function takeWhile<T>(predicate: (value: T) => boolean, iterable: Iterable<T>): IterableIterator<T>;
function takeWhile<T>(predicate: (value: T) => boolean | Promise<boolean>, iterable: AnyIterableInput<PromiseLikeValue<T>>): AsyncIterableIterator<T>;
function takeWhile<T>(predicate: (value: T) => boolean): (iterable: Iterable<T>) => IterableIterator<T>;
function takeWhile<T>(predicate: (value: T) => boolean | Promise<boolean>): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;`}
    />
  </div>
);

import { CodeBlock } from '@/components/CodeBlock';

export const StreamDropWhile = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      dropWhile (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Lazily drop values while a predicate holds
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is stream dropWhile?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        dropWhile
      </strong>{' '}
      skips values until the predicate fails.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { dropWhile } from 'fp-kit/stream';

const iter = dropWhile((n: number) => n < 3, [1, 2, 3, 2]);
Array.from(iter); // [3, 2]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function dropWhile<T>(predicate: (value: T) => boolean, iterable: Iterable<T>): IterableIterator<T>;
function dropWhile<T>(predicate: (value: T) => boolean | Promise<boolean>, iterable: AnyIterableInput<PromiseLikeValue<T>>): AsyncIterableIterator<T>;
function dropWhile<T>(predicate: (value: T) => boolean): (iterable: Iterable<T>) => IterableIterator<T>;
function dropWhile<T>(predicate: (value: T) => boolean | Promise<boolean>): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;`}
    />
  </div>
);

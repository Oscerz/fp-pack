import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamScan = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      scan (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Emit each accumulated value lazily
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is stream scan?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        scan
      </strong>{' '}
      folds values and yields each intermediate accumulator.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { scan } from 'fp-kit/stream';

const iter = scan((acc: number, n: number) => acc + n, 0, [1, 2, 3]);
Array.from(iter); // [1, 3, 6]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function scan<T, R>(fn: (acc: R, value: T) => R, initial: R, iterable: Iterable<T>): IterableIterator<R>;
function scan<T, R>(fn: (acc: R, value: T) => R | Promise<R>, initial: R, iterable: AnyIterableInput<PromiseLikeValue<T>>): AsyncIterableIterator<R>;
function scan<T, R>(fn: (acc: R, value: T) => R, initial: R): (iterable: Iterable<T>) => IterableIterator<R>;
function scan<T, R>(fn: (acc: R, value: T) => R | Promise<R>, initial: R): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<R>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Related Functions
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/reduce');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          reduce
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Reduce an iterable to a single value
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/map');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          map
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Transform values lazily
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/filter');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          filter
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Filter values by a predicate
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipe');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          pipe
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Compose multiple transformations into a pipeline
        </p>
      </div>
    </div>
  </div>
);

import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamSome = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      some (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Lazily check if any value matches
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is stream some?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        some
      </strong>{' '}
      returns as soon as it finds a matching value.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { some } from 'fp-kit/stream';

const result = some((n: number) => n > 2, [1, 2, 3]);
// true`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function some<T>(predicate: (value: T) => boolean, iterable: Iterable<T>): boolean;
function some<T>(predicate: (value: T) => boolean | Promise<boolean>, iterable: AnyIterableInput<PromiseLikeValue<T>>): Promise<boolean>;
function some<T>(predicate: (value: T) => boolean): (iterable: Iterable<T>) => boolean;
function some<T>(predicate: (value: T) => boolean | Promise<boolean>): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => Promise<boolean>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      With Async Inputs
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { some } from 'fp-kit/stream';

const result = await some(async (n: number) => n === 2, Promise.resolve([1, 2, 3]));
// true`}
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
          navigateTo('/stream/every');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          every
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Check if all values match the predicate
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
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
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/find');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          find
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Find the first matching value
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
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
    </div>
  </div>
);

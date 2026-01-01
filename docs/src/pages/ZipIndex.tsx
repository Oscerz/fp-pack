import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const ZipIndex = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      zipIndex
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Pair each element with its index
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is zipIndex?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        zipIndex
      </strong>{' '}
      returns an array of <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">[index, value]</code> pairs.
      It is a simple, explicit way to work with indices while keeping array utilities value-focused.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { zipIndex } from 'fp-kit';

zipIndex(['a', 'b', 'c']);
// [[0, 'a'], [1, 'b'], [2, 'c']]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function zipIndex<T>(arr: T[]): Array<[number, T]>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Map with Index
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { zipIndex, map } from 'fp-kit';

const pairs = zipIndex([10, 20]);
const labels = map(([i, v]) => \`\${i}:\${v}\`, pairs);
// ['0:10', '1:20']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Filter by Position
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { zipIndex, filter, map } from 'fp-kit';

const pairs = zipIndex(['a', 'b', 'c', 'd']);
const evenIndexed = filter(([i]) => i % 2 === 0, pairs);
const values = map(([, v]) => v, evenIndexed);
// ['a', 'c']`}
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
          navigateTo('/array/zip');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          zip
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Combine two arrays into pairs
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/unzip');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          unzip
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Split pairs back into two arrays
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/zipWith');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          zipWith
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Combine with a function
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/map');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          map
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Transform values before pairing
        </p>
      </div>
    </div>

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/array/map"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/map');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          map →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Transform each element in an array.
        </p>
      </a>

      <a
        href="/array/filter"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/filter');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          filter →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Keep only the elements that match a predicate.
        </p>
      </a>
    </div>
  </div>
);

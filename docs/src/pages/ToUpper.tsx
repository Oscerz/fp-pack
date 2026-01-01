import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const ToUpper = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      toUpper
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Convert a string to uppercase
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is toUpper?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        toUpper
      </strong>{' '}
      returns an uppercase version of the input string. Useful for normalization, formatting, and case-insensitive
      comparisons.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { toUpper } from 'fp-kit';

toUpper('Hello');   // 'HELLO'
toUpper('fp-kit');  // 'FP-KIT'`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Formatting labels
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { toUpper } from 'fp-kit';

const labels = ['draft', 'published', 'archived'];
const display = labels.map(toUpper);
// ['DRAFT', 'PUBLISHED', 'ARCHIVED']`}
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
          navigateTo('/string/toLower');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          toLower
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Convert a string to lowercase
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/string/trim');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          trim
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Remove whitespace from both ends
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/string/replace');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          replace
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Replace occurrences in a string
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/string/match');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          match
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Run a RegExp match against a string
        </p>
      </div>
    </div>
  </div>
);

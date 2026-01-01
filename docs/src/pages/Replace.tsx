import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Replace = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      replace
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Replace occurrences in a string (non-curried)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is replace?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        replace
      </strong>{' '}
      wraps <code>String.prototype.replace</code> with a data-last, non-curried call: <code>replace(pattern, replacement, str)</code>.
      Supports both string and RegExp patterns. Use a global regex to replace all occurrences.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { replace } from 'fp-kit';

replace('foo', 'bar', 'foo foo');       // 'bar foo' (first only)
replace(/foo/g, 'bar', 'foo foo');      // 'bar bar' (global)
replace(/a./g, 'x', 'abcdab');          // 'xcdx'`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Simple substitutions
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { replace } from 'fp-kit';

replace('http:', 'https:', 'http://example.com'); // 'https://example.com'`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Pattern-based
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { replace } from 'fp-kit';

const snakeToDash = (input: string) => replace(/_/g, '-', input);

snakeToDash('hello_world'); // 'hello-world'`}
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

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/string/split');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          split
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Split a string by a separator
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
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
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
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
    </div>
  </div>
);

import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StartsWith = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      startsWith
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Check if a string starts with a given prefix
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is startsWith?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        startsWith
      </strong>{' '}
      checks whether a string or array starts with the given prefix. Useful for routing guards, command parsing,
      and quick prefix checks in pipelines. Works with both strings and arrays.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { startsWith } from 'fp-kit';

startsWith('a', 'abc');  // true
startsWith('b', 'abc');  // false

startsWith([1, 2], [1, 2, 3]);  // true
startsWith([2], [1, 2, 3]);     // false`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Routing guards
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { startsWith } from 'fp-kit';

const paths = ['/admin/users', '/public', '/admin/settings'];

const adminRoutes = paths.filter(path => startsWith('/admin', path));
// ['/admin/users', '/admin/settings']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Command parsing
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { startsWith } from 'fp-kit';

const args = ['--help', '--verbose', 'input.txt'];

const flags = args.filter(arg => startsWith('--', arg));
// ['--help', '--verbose']`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
      Need the opposite check? See{' '}
      <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">endsWith</code>.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Related Functions
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/string/endsWith');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          endsWith
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Check if a string ends with a suffix
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
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
    </div>
  </div>
);

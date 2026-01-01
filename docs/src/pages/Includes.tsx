import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Includes = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      includes
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Check whether a string contains a substring or an array contains a value (using deep equality)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is includes?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        includes
      </strong>{' '}
      checks containment for both strings and arrays. For arrays, it uses fp-kit&apos;s <code>equals</code> for deep
      structural comparison, so objects/arrays are matched by value, not by reference.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { includes } from 'fp-kit';

includes(3, [1, 2, 3]); // true
includes(4, [1, 2, 3]); // false
includes({ name: 'Fred' }, [{ name: 'Fred' }]); // true
includes([42], [[42]]); // true

includes('ba', 'banana'); // true
includes('ac', 'banana'); // false`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Deep equality in arrays
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { includes } from 'fp-kit';

const users = [{ id: 1, name: 'Amy' }, { id: 2, name: 'Bob' }];

includes({ id: 1, name: 'Amy' }, users); // true
includes({ id: 3, name: 'Cara' }, users); // false`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Strings remain fast
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { includes } from 'fp-kit';

includes('/api', '/v1/api/users'); // true
includes('auth', '/v1/api/users'); // false`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
      For identity/structure checks, see <code>equals</code>. For other comparisons, see <code>gt</code>,{' '}
      <code>gte</code>, <code>lt</code>, <code>lte</code>.
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
          navigateTo('/equality/equals');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          equals
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Deep equality comparison for structured data
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/equality/isNil');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          isNil
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Check for null or undefined
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/equality/isEmpty');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          isEmpty
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Check for empty arrays, strings, or objects
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/equality/isType');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          isType
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Check a value's runtime type
        </p>
      </div>
    </div>
  </div>
);

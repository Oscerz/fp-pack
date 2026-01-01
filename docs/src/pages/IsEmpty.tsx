import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const IsEmpty = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      isEmpty
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Check if a value has no contents (null/undefined, length 0, or no own keys)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is isEmpty?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        isEmpty
      </strong>{' '}
      returns <code>true</code> for <code>null</code>/<code>undefined</code>, empty strings/arrays, empty objects, and empty Map/Set.
      It returns <code>false</code> for numbers, booleans, non-empty collections, and objects with keys.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { isEmpty } from 'fp-kit';

isEmpty(null);                 // true
isEmpty('');                   // true
isEmpty([]);                   // true
isEmpty({});                   // true
isEmpty(new Map());            // true
isEmpty(new Set());            // true

isEmpty([1]);                  // false
isEmpty({ a: 1 });             // false
isEmpty('text');               // false`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Safe guards
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { isEmpty } from 'fp-kit';

function printFirst(items: string[]) {
  if (isEmpty(items)) return;
  console.log(items[0]);
}

printFirst([]);          // nothing
printFirst(['hello']);   // logs 'hello'`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Cleaning data
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { isEmpty } from 'fp-kit';

const inputs = ['hi', '', ' ', null, [], ['x']];

const nonEmpty = inputs.filter(v => !isEmpty(v));
// ['hi', ' ', ['x']]`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
      Need to specifically detect <code>null</code>/<code>undefined</code>? See{' '}
      <a
        class="text-blue-600 dark:text-blue-300 underline cursor-pointer"
        onClick={() => navigateTo('/equality/isNil')}
      >
        isNil
      </a>.
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
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
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

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
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
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/equality/includes');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          includes
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Check containment using deep equality
        </p>
      </div>
    </div>
  </div>
);

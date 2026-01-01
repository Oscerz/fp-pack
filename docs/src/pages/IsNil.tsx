import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const IsNil = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      isNil
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Check if a value is <code>null</code> or <code>undefined</code>
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is isNil?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        isNil
      </strong>{' '}
      returns <code>true</code> only when the input is <code>null</code> or <code>undefined</code>. It helps make
      optional checks explicit and keeps falsy-but-valid values (like <code>0</code> or empty strings) intact.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { isNil } from 'fp-kit';

isNil(null);        // true
isNil(undefined);   // true
isNil(0);           // false
isNil('');          // false
isNil(false);       // false`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Optional values
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { isNil } from 'fp-kit';

const maybeName: string | undefined = getUser()?.name;

if (isNil(maybeName)) {
  // handle missing name
} else {
  console.log(maybeName.toUpperCase());
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      With Array helpers
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { isNil } from 'fp-kit';

const values = ['ok', null, 'hi', undefined];

// remove only null/undefined, keep empty strings or zeros
const cleaned = values.filter(v => !isNil(v));
// ['ok', 'hi']`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
      Looking for emptiness checks? See{' '}
      <a
        class="text-blue-600 dark:text-blue-300 underline cursor-pointer"
        onClick={() => navigateTo('/equality/isEmpty')}
      >
        isEmpty
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

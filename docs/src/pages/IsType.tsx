import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const IsType = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      isType
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Check a value&apos;s runtime type by name (supports primitives, null/undefined, and common objects)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is isType?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        isType
      </strong>{' '}
      creates a predicate that returns <code>true</code> when a value matches the given runtime type name. It recognizes
      primitives (<code>string</code>, <code>number</code>, <code>boolean</code>, <code>symbol</code>, <code>bigint</code>),
      <code>null</code>/<code>undefined</code>, and common objects like <code>array</code>, <code>date</code>, <code>map</code>, <code>set</code>.
      The type name match is case-insensitive.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { isType } from 'fp-kit';

const isArray = isType('array');
const isDate = isType('Date');
const isMap = isType('map');

isArray([]);           // true
isArray({});           // false
isDate(new Date());    // true
isMap(new Map());      // true
isMap(new Set());      // false`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Filtering by type
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { isType } from 'fp-kit';

const mixed = [1, 'hi', null, new Date(), [], new Map()];

const onlyArrays = mixed.filter(isType('array') as (v: unknown) => v is unknown[]);
// [ [] ]

const onlyDates = mixed.filter(isType('date'));
// [ Date(...) ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Handling null/undefined explicitly
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { isType } from 'fp-kit';

const data: Array<string | null | undefined> = ['a', null, 'b', undefined];

const cleaned = data.filter(v => !isType('null')(v) && !isType('undefined')(v));
// ['a', 'b']`}
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

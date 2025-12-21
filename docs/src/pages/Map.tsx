import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Map = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      map
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Transform each element in an array
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is map?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        map
      </strong>{' '}
      creates a new array by applying a function to each element of the input array.
      It’s a core building block for data transformation and does not mutate the original array.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { map } from 'fp-kit';

map((n: number) => n * 2, [1, 2, 3]);
// [2, 4, 6]

map((s: string) => s.toUpperCase(), ['fp', 'kit']);
// ['FP', 'KIT']`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function map<T, R>(fn: (value: T) => R, arr: T[]): R[];`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Extract Fields
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { map } from 'fp-kit';

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

const names = map((u: { name: string }) => u.name, users);
// ['Alice', 'Bob']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Format Values
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { map } from 'fp-kit';

const prices = [10, 25, 100];
const formatted = map((p: number) => \`$\${p.toFixed(2)}\`, prices);
// ['$10.00', '$25.00', '$100.00']`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/array/filter"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/filter');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          filter →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Keep only the elements that match a predicate.
        </p>
      </a>

      <a
        href="/array/reduce"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/reduce');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          reduce →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Fold an array into a single value.
        </p>
      </a>
    </div>
  </div>
);

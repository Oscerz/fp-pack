import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Max = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      max
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Get the maximum number in an array (returns -Infinity for empty arrays)
    </p>

    <CodeBlock
      language="typescript"
      code={`import { max } from 'fp-kit';

max([1, 5, 3]);      // 5
max([-10, -5, -7]);  // -5
max([]);             // -Infinity`}
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
          navigateTo('/math/min');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          min
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Find the minimum value
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/math/mean');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          mean
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Average of a list of numbers
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/math/sum');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          sum
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Sum a list of numbers
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/equality/clamp');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          clamp
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Restrict values to a range
        </p>
      </div>
    </div>
  </div>
);

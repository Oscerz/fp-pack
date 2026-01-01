import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Mean = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      mean
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Calculate the average of numbers
    </p>

    <CodeBlock
      language="typescript"
      code={`import { mean } from 'fp-kit';

mean([1, 2, 3, 4]); // 2.5
mean([]);          // NaN`}
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
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
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
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/math/max');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          max
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Find the maximum value
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/math/round');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          round
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Round to the nearest integer
        </p>
      </div>
    </div>
  </div>
);

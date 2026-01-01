import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const RandomInt = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      randomInt
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Get a random integer between two numbers (inclusive)
    </p>

    <CodeBlock
      language="typescript"
      code={`import { randomInt } from 'fp-kit';

randomInt(1, 5);    // 1..5
randomInt(1.2, 3);  // 2..3 (bounds are rounded)`}
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

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/math/floor');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          floor
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Round down to the nearest integer
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/math/ceil');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          ceil
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Round up to the nearest integer
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
          Keep a value within a range
        </p>
      </div>
    </div>
  </div>
);

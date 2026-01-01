import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Mul_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      mul
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      두 수를 곱합니다
    </p>

    <CodeBlock
      language="typescript"
      code={`import { mul } from 'fp-kit';

mul(2, 3);   // 6
mul(-1, 5);  // -5`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      관련 함수
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/math/add');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          add
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          두 수를 더합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/math/sub');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          sub
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          두 수를 뺍니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/math/div');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          div
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          두 수를 나눕니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/math/sum');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          sum
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          숫자 배열의 합을 구합니다
        </p>
      </div>
    </div>
  </div>
);

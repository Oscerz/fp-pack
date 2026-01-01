import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const MapValues_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      mapValues
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      키를 유지한 채 값만 변환합니다
    </p>

    <CodeBlock
      language="typescript"
      code={`import { mapValues } from 'fp-kit';

const input = { a: 1, b: 2 };
const doubled = mapValues((v: number) => v * 2, input);
// { a: 2, b: 4 }`}
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
          navigateTo('/object/entries');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          entries
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          키/값 쌍을 가져옵니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/values');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          values
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          객체 값 배열을 가져옵니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/keys');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          keys
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          객체 키 배열을 가져옵니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/evolve');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          evolve
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          키별로 값을 변환합니다
        </p>
      </div>
    </div>
  </div>
);

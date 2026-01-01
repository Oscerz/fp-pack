import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Values_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      values
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      객체의 열거 가능한 자체 값들을 배열로 반환합니다
    </p>

    <CodeBlock
      language="typescript"
      code={`import { values } from 'fp-kit';

const user = { id: 1, name: 'Ada' };
values(user); // [1, 'Ada']`}
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
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
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
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/mapValues');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          mapValues
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          객체 값을 변환합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/pick');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          pick
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          필요한 키만 선택합니다
        </p>
      </div>
    </div>
  </div>
);

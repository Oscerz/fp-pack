import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Ceil_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      ceil
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      숫자를 올림하여 가장 가까운 정수로 변환합니다
    </p>

    <CodeBlock
      language="typescript"
      code={`import { ceil } from 'fp-kit';

ceil(1.1);  // 2
ceil(-1.1); // -1
ceil(2);    // 2`}
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
          navigateTo('/math/floor');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          floor
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          내림하여 정수로 만듭니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/math/round');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          round
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          가장 가까운 정수로 반올림합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/math/mean');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          mean
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          숫자 배열의 평균을 구합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/math/randomInt');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          randomInt
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          범위 내 랜덤 정수를 생성합니다
        </p>
      </div>
    </div>
  </div>
);

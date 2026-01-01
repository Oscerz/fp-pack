import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Fold_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      fold
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      null/undefined 값은 기본값으로 처리하고, 값이 있으면 변환합니다
    </p>

    <CodeBlock
      language="typescript"
      code={`import { fold } from 'fp-kit';

const format = fold(
  () => 'N/A',
  (value: number) => \`value:\${value}\`
);

format(null);   // "N/A"
format(3);      // "value:3"`}
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
          navigateTo('/nullable/maybe');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          maybe
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          nullable 값을 안전하게 변환합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/nullable/getOrElse');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          getOrElse
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          값이 없을 때 기본값을 제공합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/nullable/mapMaybe');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          mapMaybe
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          null/undefined 결과를 제거합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/nullable/result');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          result
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          성공/실패를 감싸서 반환합니다
        </p>
      </div>
    </div>
  </div>
);

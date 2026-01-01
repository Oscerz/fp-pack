import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const AssocPath_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      assocPath
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      중첩 경로에 값을 불변으로 설정합니다
    </p>

    <CodeBlock
      language="typescript"
      code={`import { assocPath } from 'fp-kit';

assocPath(['a', 'b', 'c'], 42, { a: { b: { c: 0 } } });
// { a: { b: { c: 42 } } }

assocPath(['a', 'b', 'c'], 42, { a: 5 });
// { a: { b: { c: 42 } } }

assocPath(['a', 1, 'c'], 42, { a: [] });
// { a: [undefined, { c: 42 }] }

assocPath(['a', -1], 42, { a: [1, 2] });
// { a: [1, 42] }`}
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
          navigateTo('/object/assoc');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          assoc
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          최상위 키를 불변으로 설정합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/dissocPath');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          dissocPath
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          중첩 경로를 불변으로 제거합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/path');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          path
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          중첩 경로를 안전하게 읽습니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/pathOr');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          pathOr
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          기본값과 함께 중첩 경로를 읽습니다
        </p>
      </div>
    </div>
  </div>
);

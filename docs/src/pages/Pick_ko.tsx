import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Pick_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      pick
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      지정한 키만 가진 새 객체를 만듭니다 (얕은, 불변)
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pick } from 'fp-kit';

const user = { id: 1, name: 'Ada', active: true };

pick(['id', 'name'], user);
// { id: 1, name: 'Ada' }`}
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
          navigateTo('/object/omit');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          omit
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          특정 키를 제거합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/prop');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          prop
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          단일 속성을 읽습니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/has');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          has
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          키 존재 여부를 확인합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/dissoc');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          dissoc
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          키를 불변으로 제거합니다
        </p>
      </div>
    </div>
  </div>
);

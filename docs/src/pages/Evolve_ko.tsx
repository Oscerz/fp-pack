import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Evolve_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      evolve
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      스키마 함수를 이용해 객체 값을 변환합니다
    </p>

    <CodeBlock
      language="typescript"
      code={`import { evolve } from 'fp-kit';

const user = { id: 1, name: 'A' };
const updated = evolve({
  id: (value: number) => value + 1,
  name: (value: string) => value.toLowerCase(),
}, user);

// { id: 2, name: "a" }`}
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
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/mergeDeep');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          mergeDeep
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          중첩 객체를 깊게 병합합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/assoc');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          assoc
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          키를 불변으로 설정합니다
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

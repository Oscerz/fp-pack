import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Merge_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      merge
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      객체를 얕게 병합합니다 (두 번째 객체가 첫 번째 속성을 덮어씀)
    </p>

    <CodeBlock
      language="typescript"
      code={`import { merge } from 'fp-kit';

const a = { id: 1, name: 'Ada' };
const b = { name: 'Lovelace', active: true };

merge(a, b);
// { id: 1, name: 'Lovelace', active: true }`}
    />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      깊은 병합이 필요하다면?
    </h2>
    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
      중첩 객체를 병합하려면 <code>mergeDeep</code>을 사용하세요. <code>merge</code>는 얕은 병합만 수행합니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      관련 함수
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
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
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/mergeAll');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          mergeAll
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          여러 객체를 한 번에 병합합니다
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

import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Match_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      match
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      정규식을 문자열에 매칭합니다 (커링 없음)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      match란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        match
      </strong>{' '}
      는 <code>RegExp</code>를 문자열에 적용해 <code>String.prototype.match</code>와 같은 결과를 반환합니다. 호출 형태는
      <code>match(pattern, str)</code>이며, 매치 배열이나 <code>null</code>을 돌려줍니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { match } from 'fp-kit';

match(/ba./g, 'banana'); // ['ban']
match(/xyz/, 'banana');  // null`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      전역 매치
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { match } from 'fp-kit';

match(/\\d+/g, 'a1b22c333'); // ['1', '22', '333']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      선택적 매치
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { match } from 'fp-kit';

const res = match(/foo/, 'bar');
if (res) {
  // res[0] 사용
}`}
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
          navigateTo('/string/replace');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          replace
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          문자열 일부를 치환합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/string/split');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          split
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          문자열을 구분자로 나눕니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/string/startsWith');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          startsWith
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          문자열이 접두사로 시작하는지 확인합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/string/endsWith');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          endsWith
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          문자열이 접미사로 끝나는지 확인합니다
        </p>
      </div>
    </div>
  </div>
);

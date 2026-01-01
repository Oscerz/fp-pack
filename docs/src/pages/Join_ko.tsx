import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Join_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      join
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      문자열 배열을 구분자로 결합해 하나의 문자열로 만듭니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      join이란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        join
      </strong>{' '}
      은 문자열 배열을 주어진 구분자로 연결해 하나의 문자열을 반환합니다. 빈 배열이면 빈 문자열을 반환하고, 요소가 하나라면
      그대로 반환합니다. 호출 형태는 <code>join(separator, array)</code>입니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { join } from 'fp-kit';

join(',', ['a', 'b', 'c']);       // 'a,b,c'
join(' / ', ['one', 'two']);      // 'one / two'
join('-', []);                    // ''`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      출력 포맷팅
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { join } from 'fp-kit';

const tags = ['fp', 'typescript', 'utilities'];
const tagString = join(', ', tags);
// 'fp, typescript, utilities'`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      안전한 기본값
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { join } from 'fp-kit';

function renderBreadcrumb(parts: string[]) {
  const path = join(' / ', parts);
  return path || 'Home';
}

renderBreadcrumb([]); // 'Home'
renderBreadcrumb(['Home', 'Docs', 'Join']); // 'Home / Docs / Join'`}
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
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
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
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/string/trim');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          trim
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          문자열 양끝 공백을 제거합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/string/toLower');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          toLower
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          문자열을 소문자로 변환합니다
        </p>
      </div>
    </div>
  </div>
);

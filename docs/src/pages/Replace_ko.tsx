import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Replace_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      replace
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      문자열의 일부를 교체합니다 (커링 없음)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      replace란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        replace
      </strong>{' '}
      는 <code>String.prototype.replace</code>를 데이터-마지막 비커링 형태로 감싼 함수입니다: <code>replace(pattern, replacement, str)</code>.
      문자열/정규식 패턴을 모두 지원하며, 모든 발생을 바꾸려면 전역 정규식을 사용하세요.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { replace } from 'fp-kit';

replace('foo', 'bar', 'foo foo');       // 'bar foo' (첫 번째만)
replace(/foo/g, 'bar', 'foo foo');      // 'bar bar' (전역)
replace(/a./g, 'x', 'abcdab');          // 'xcdx'`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      단순 치환
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { replace } from 'fp-kit';

replace('http:', 'https:', 'http://example.com'); // 'https://example.com'`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      패턴 기반 치환
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { replace } from 'fp-kit';

const snakeToDash = (input: string) => replace(/_/g, '-', input);

snakeToDash('hello_world'); // 'hello-world'`}
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
          navigateTo('/string/match');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          match
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          정규식으로 문자열을 매칭합니다
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

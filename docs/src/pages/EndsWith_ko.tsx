import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const EndsWith_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      endsWith
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      문자열이 주어진 접미사로 끝나는지 확인합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      endsWith란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        endsWith
      </strong>{' '}
      는 문자열 또는 배열이 특정 접미사로 끝나는지 확인합니다. 파일 확장자, 라우트 패스, 간단한 패턴 검증 등에 유용하며 문자열/배열 모두 지원합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { endsWith } from 'fp-kit';

endsWith('c', 'abc');  // true
endsWith('b', 'abc');  // false

endsWith(['c'], ['a', 'b', 'c']);  // true
endsWith(['b'], ['a', 'b', 'c']);  // false`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      파일 이름 필터링
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { endsWith } from 'fp-kit';

const files = ['main.js', 'styles.css', 'utils.ts', 'index.js'];

const jsFiles = files.filter(name => endsWith('.js', name));
// ['main.js', 'index.js']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      라우팅 헬퍼
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { endsWith } from 'fp-kit';

['/users', '/v1/api', '/about'].filter(path => endsWith('/api', path));
// ['/v1/api']`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
      반대 방향이 필요하다면{' '}
      <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">startsWith</code>를 확인하세요.
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
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
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
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
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
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
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
    </div>
  </div>
);

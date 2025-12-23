import { CodeBlock } from '@/components/CodeBlock';

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
  </div>
);

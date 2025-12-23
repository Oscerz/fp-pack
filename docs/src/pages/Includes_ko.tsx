import { CodeBlock } from '@/components/CodeBlock';

export const Includes_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      includes
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      문자열에 부분 문자열이 포함되었는지, 배열에 값이 포함되었는지 확인합니다 (배열은 깊은 동등성 검사)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      includes란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        includes
      </strong>{' '}
      는 문자열과 배열 모두에 대해 포함 여부를 확인합니다. 배열 비교 시 fp-kit의 <code>equals</code>를 사용해 참조가 아니라
      값(구조)으로 비교하므로, 객체나 배열도 내용이 같으면 포함된 것으로 간주합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { includes } from 'fp-kit';

includes(3, [1, 2, 3]); // true
includes(4, [1, 2, 3]); // false
includes({ name: 'Fred' }, [{ name: 'Fred' }]); // true
includes([42], [[42]]); // true

includes('ba', 'banana'); // true
includes('ac', 'banana'); // false`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      배열에서 깊은 비교
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { includes } from 'fp-kit';

const users = [{ id: 1, name: 'Amy' }, { id: 2, name: 'Bob' }];

includes({ id: 1, name: 'Amy' }, users); // true
includes({ id: 3, name: 'Cara' }, users); // false`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      문자열에서는 기존처럼
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { includes } from 'fp-kit';

includes('/api', '/v1/api/users'); // true
includes('auth', '/v1/api/users'); // false`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
      동일성/구조 비교는 <code>equals</code>를 참고하세요. 다른 비교 연산은 <code>gt</code>, <code>gte</code>,{' '}
      <code>lt</code>, <code>lte</code>를 확인하세요.
    </p>
  </div>
);

import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const IsEmpty_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      isEmpty
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      값이 비어 있는지 확인합니다 (null/undefined, 길이 0, 키 없음)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      isEmpty란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        isEmpty
      </strong>{' '}
      는 <code>null</code>/<code>undefined</code>, 빈 문자열·배열, 빈 객체, 빈 Map/Set에 대해 <code>true</code>를 반환합니다.
      숫자, 불리언, 길이가 있는 문자열/배열, 키가 있는 객체에는 <code>false</code>를 반환합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { isEmpty } from 'fp-kit';

isEmpty(null);                 // true
isEmpty('');                   // true
isEmpty([]);                   // true
isEmpty({});                   // true
isEmpty(new Map());            // true
isEmpty(new Set());            // true

isEmpty([1]);                  // false
isEmpty({ a: 1 });             // false
isEmpty('text');               // false`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      안전 가드
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { isEmpty } from 'fp-kit';

function printFirst(items: string[]) {
  if (isEmpty(items)) return;
  console.log(items[0]);
}

printFirst([]);          // 아무것도 출력 안 함
printFirst(['hello']);   // 'hello'`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      데이터 정리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { isEmpty } from 'fp-kit';

const inputs = ['hi', '', ' ', null, [], ['x']];

const nonEmpty = inputs.filter(v => !isEmpty(v));
// ['hi', ' ', ['x']]`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
      <code>null</code>/<code>undefined</code>만 구분하고 싶다면{' '}
      <a
        class="text-blue-600 dark:text-blue-300 underline cursor-pointer"
        onClick={() => navigateTo('/equality/isNil')}
      >
        isNil
      </a>{' '}
      문서를 참고하세요.
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
          navigateTo('/ko/equality/isNil');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          isNil
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          null 또는 undefined인지 확인합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/equality/isType');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          isType
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          런타임 타입을 확인합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/equality/equals');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          equals
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          구조적 데이터를 깊게 비교합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/equality/includes');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          includes
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          깊은 동등성으로 포함 여부를 확인합니다
        </p>
      </div>
    </div>
  </div>
);

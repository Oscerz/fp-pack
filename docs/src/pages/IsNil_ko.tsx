import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const IsNil_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      isNil
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      값이 <code>null</code> 또는 <code>undefined</code>인지 확인합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      isNil 이란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        isNil
      </strong>{' '}
      은 입력이 <code>null</code> 또는 <code>undefined</code>일 때만 <code>true</code>를 반환합니다.
      <br />
      <br />
      <code>0</code>, 빈 문자열, <code>false</code>처럼 “falsy지만 유효한 값”을 그대로 인정하고, 정말로 값이 없는 경우만
      구분하고 싶을 때 유용합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { isNil } from 'fp-kit';

isNil(null);        // true
isNil(undefined);   // true
isNil(0);           // false
isNil('');          // false
isNil(false);       // false`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      선택적 값 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { isNil } from 'fp-kit';

const maybeName: string | undefined = getUser()?.name;

if (isNil(maybeName)) {
  // 이름이 없을 때 처리
} else {
  console.log(maybeName.toUpperCase());
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      배열과 함께 사용
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { isNil } from 'fp-kit';

const values = ['ok', null, 'hi', undefined];

// null/undefined만 제거 (빈 문자열, 0 등은 유지)
const cleaned = values.filter(v => !isNil(v));
// ['ok', 'hi']`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
      빈 값 여부가 궁금하다면{' '}
      <a
        class="text-blue-600 dark:text-blue-300 underline cursor-pointer"
        onClick={() => navigateTo('/equality/isEmpty')}
      >
        isEmpty
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
          navigateTo('/ko/equality/isEmpty');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          isEmpty
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          배열/문자열/객체가 비었는지 확인합니다
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

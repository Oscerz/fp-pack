import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const IsType_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      isType
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      런타임 타입 이름으로 값을 검사합니다 (기본형, null/undefined, Array/Date/Map/Set 등)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      isType 이란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        isType
      </strong>{' '}
      은 주어진 타입 이름과 값의 런타임 타입이 일치하면 <code>true</code>를 반환하는 프레디케이트를 생성합니다.
      <br />
      <br />
      기본형(<code>string</code>, <code>number</code>, <code>boolean</code>, <code>symbol</code>, <code>bigint</code>)과{' '}
      <code>null</code>/<code>undefined</code>, 그리고 <code>array</code>, <code>date</code>, <code>map</code>, <code>set</code> 같은
      일반 객체를 인식합니다. 타입 이름 대소문자는 구분하지 않습니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { isType } from 'fp-kit';

const isArray = isType('array');
const isDate = isType('Date');
const isMap = isType('map');

isArray([]);           // true
isArray({});           // false
isDate(new Date());    // true
isMap(new Map());      // true
isMap(new Set());      // false`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      타입으로 필터링
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { isType } from 'fp-kit';

const mixed = [1, 'hi', null, new Date(), [], new Map()];

const onlyArrays = mixed.filter(isType('array') as (v: unknown) => v is unknown[]);
// [ [] ]

const onlyDates = mixed.filter(isType('date'));
// [ Date(...) ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      null/undefined 명시 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { isType } from 'fp-kit';

const data: Array<string | null | undefined> = ['a', null, 'b', undefined];

const cleaned = data.filter(v => !isType('null')(v) && !isType('undefined')(v));
// ['a', 'b']`}
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

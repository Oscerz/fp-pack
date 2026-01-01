import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const ZipIndex_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      zipIndex
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      각 요소를 인덱스와 짝짓기
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      zipIndex란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        zipIndex
      </strong>{' '}
      는 배열을 <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">[index, value]</code> 쌍으로 변환합니다.
      인덱스를 명시적으로 다루고 싶을 때 가장 단순하고 안전한 패턴입니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { zipIndex } from 'fp-kit';

zipIndex(['a', 'b', 'c']);
// [[0, 'a'], [1, 'b'], [2, 'c']]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function zipIndex<T>(arr: T[]): Array<[number, T]>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      인덱스와 함께 map
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { zipIndex, map } from 'fp-kit';

const pairs = zipIndex([10, 20]);
const labels = map(([i, v]) => \`\${i}:\${v}\`, pairs);
// ['0:10', '1:20']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      위치 기준 필터링
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { zipIndex, filter, map } from 'fp-kit';

const pairs = zipIndex(['a', 'b', 'c', 'd']);
const evenIndexed = filter(([i]) => i % 2 === 0, pairs);
const values = map(([, v]) => v, evenIndexed);
// ['a', 'c']`}
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
          navigateTo('/ko/array/zip');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          zip
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          두 배열을 쌍으로 묶습니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/array/unzip');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          unzip
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          쌍 배열을 다시 분리합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/array/zipWith');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          zipWith
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          함수로 결합합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/array/map');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          map
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          묶기 전에 값을 변환합니다
        </p>
      </div>
    </div>

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다음 단계
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/array/map"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/map');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          map →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          배열의 각 요소를 변환합니다.
        </p>
      </a>

      <a
        href="/array/filter"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/filter');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          filter →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          조건을 만족하는 요소만 남깁니다.
        </p>
      </a>
    </div>
  </div>
);

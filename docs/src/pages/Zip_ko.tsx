import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Zip_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      zip
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      두 배열을 짝으로 묶기
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      zip이란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        zip
      </strong>{' '}
      는 두 배열의 요소를 순서대로 짝지어 튜플 배열을 만듭니다. 짝짓기는 더 짧은 배열 길이에 맞춰 멈춥니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { zip } from 'fp-kit';

zip(['a', 'b'], [1, 2, 3]);
// [[1, 'a'], [2, 'b']]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function zip<T, U>(arr2: U[], arr1: T[]): Array<[T, U]>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      키와 값 짝짓기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { zip } from 'fp-kit';

const keys = ['id', 'name', 'price'];
const values = [1, 'Keyboard', 75];

const entries = zip(values, keys);
// [[ 'id', 1 ], [ 'name', 'Keyboard' ], [ 'price', 75 ]]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      인덱스와 값 짝짓기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { zip, zipIndex } from 'fp-kit';

const values = ['a', 'b', 'c'];
const indices = zipIndex(values).map(([i]) => i);

zip(values, indices);
// [[0, 'a'], [1, 'b'], [2, 'c']]`}
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
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
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
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/array/zipIndex');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          zipIndex
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          값과 인덱스를 묶습니다
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
          묶인 값을 변환합니다
        </p>
      </div>
    </div>

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다음 단계
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/array/unzip"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/unzip');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          unzip →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          튜플을 다시 두 배열로 분리합니다.
        </p>
      </a>

      <a
        href="/array/zipIndex"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/zipIndex');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          zipIndex →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          각 요소를 인덱스와 함께 묶습니다.
        </p>
      </a>
    </div>
  </div>
);

import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamZipWith_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      zipWith (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      두 입력을 짝지어 함수로 변환합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      stream zipWith 란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        zipWith
      </strong>{' '}
      는 두 입력을 묶어 함수로 변환한 값을 방출합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { zipWith } from 'fp-kit/stream';

const iter = zipWith((a: number, b: number) => a + b, [10, 20], [1, 2, 3]);
Array.from(iter); // [11, 22]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function zipWith<A, B, R>(fn: (a: A, b: B) => R, other: Iterable<B>, iterable: Iterable<A>): IterableIterator<R>;
function zipWith<A, B, R>(fn: (a: A, b: B) => R | Promise<R>, other: AnyIterableInput<PromiseLikeValue<B>>, iterable: AnyIterableInput<PromiseLikeValue<A>>): AsyncIterableIterator<R>;
function zipWith<A, B, R>(fn: (a: A, b: B) => R, other: Iterable<B>): (iterable: Iterable<A>) => IterableIterator<R>;
function zipWith<A, B, R>(fn: (a: A, b: B) => R | Promise<R>, other: AnyIterableInput<PromiseLikeValue<B>>): (iterable: AnyIterableInput<PromiseLikeValue<A>>) => AsyncIterableIterator<R>;`}
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
          navigateTo('/stream/zip');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          zip
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          두 이터러블을 쌍으로 묶습니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/map');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          map
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          값을 지연 방식으로 변환합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/flatMap');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          flatMap
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          단일 작업으로 매핑하고 평탄화합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/concat');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          concat
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          이터러블을 지연 방식으로 이어 붙입니다
        </p>
      </div>
    </div>
  </div>
);

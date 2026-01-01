import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamEvery_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      every (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      모든 값이 조건을 만족하는지 지연 검사합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      stream every 란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        every
      </strong>{' '}
      는 조건에 실패하는 값을 만나면 즉시 false를 반환합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { every } from 'fp-kit/stream';

const result = every((n: number) => n > 0, [1, 2, 3]);
// true`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function every<T>(predicate: (value: T) => boolean, iterable: Iterable<T>): boolean;
function every<T>(predicate: (value: T) => boolean | Promise<boolean>, iterable: AnyIterableInput<PromiseLikeValue<T>>): Promise<boolean>;
function every<T>(predicate: (value: T) => boolean): (iterable: Iterable<T>) => boolean;
function every<T>(predicate: (value: T) => boolean | Promise<boolean>): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => Promise<boolean>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      비동기 입력
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { every } from 'fp-kit/stream';

const result = await every(async (n: number) => n < 5, Promise.resolve([1, 2, 3]));
// true`}
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
          navigateTo('/stream/some');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          some
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          조건을 만족하는 값이 하나라도 있는지 확인합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/filter');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          filter
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          조건에 맞는 값만 통과시킵니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/find');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          find
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          조건을 만족하는 첫 값을 찾습니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/reduce');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          reduce
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          이터러블을 단일 값으로 축소합니다
        </p>
      </div>
    </div>
  </div>
);

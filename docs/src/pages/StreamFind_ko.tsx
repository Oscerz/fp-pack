import { CodeBlock } from '@/components/CodeBlock';

export const StreamFind_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      find (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      조건을 만족하는 첫 값을 지연 검색합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      stream find 란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        find
      </strong>{' '}
      는 조건을 통과하는 첫 값을 즉시 반환하고 종료합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { find } from 'fp-kit/stream';

const value = find((n: number) => n > 2, [1, 2, 3]);
// 3`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function find<T>(predicate: (value: T) => boolean, iterable: Iterable<T>): T | undefined;
function find<T>(predicate: (value: T) => boolean | Promise<boolean>, iterable: AnyIterableInput<PromiseLikeValue<T>>): Promise<T | undefined>;
function find<T>(predicate: (value: T) => boolean): (iterable: Iterable<T>) => T | undefined;
function find<T>(predicate: (value: T) => boolean | Promise<boolean>): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => Promise<T | undefined>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      비동기 입력
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { find } from 'fp-kit/stream';

const result = await find(async (n: number) => n === 2, Promise.resolve([1, 2, 3]));
// 2`}
    />
  </div>
);

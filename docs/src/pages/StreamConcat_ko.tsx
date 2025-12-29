import { CodeBlock } from '@/components/CodeBlock';

export const StreamConcat_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      concat (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      두 이터러블을 지연 결합합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      stream concat 이란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        concat
      </strong>{' '}
      은 첫 번째 입력을 모두 방출한 뒤 두 번째 입력을 방출합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { concat } from 'fp-kit/stream';

const iter = concat([3, 4], [1, 2]);
Array.from(iter); // [1, 2, 3, 4]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function concat<T>(other: Iterable<T>, iterable: Iterable<T>): IterableIterator<T>;
function concat<T>(other: AnyIterableInput<PromiseLikeValue<T>>, iterable: AnyIterableInput<PromiseLikeValue<T>>): AsyncIterableIterator<T>;
function concat<T>(other: Iterable<T>): (iterable: Iterable<T>) => IterableIterator<T>;
function concat<T>(other: AnyIterableInput<PromiseLikeValue<T>>): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;`}
    />
  </div>
);

import { CodeBlock } from '@/components/CodeBlock';

export const StreamPrepend_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      prepend (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      앞에 값을 덧붙입니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      stream prepend 란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        prepend
      </strong>{' '}
      는 이터러블 값들 앞에 값을 방출합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { prepend } from 'fp-kit/stream';

const iter = prepend(0, [1, 2]);
Array.from(iter); // [0, 1, 2]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function prepend<T>(value: T, iterable: Iterable<T>): IterableIterator<T>;
function prepend<T>(value: PromiseLikeValue<T>, iterable: AnyIterableInput<PromiseLikeValue<T>>): AsyncIterableIterator<T>;
function prepend<T>(value: T): (iterable: Iterable<T>) => IterableIterator<T>;
function prepend<T>(value: PromiseLikeValue<T>): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;`}
    />
  </div>
);

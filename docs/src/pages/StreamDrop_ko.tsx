import { CodeBlock } from '@/components/CodeBlock';

export const StreamDrop_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      drop (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      앞의 N개를 건너뛰고 지연 처리합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      stream drop 이란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        drop
      </strong>{' '}
      는 처음 N개를 스킵하고 나머지를 지연 방출합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { drop } from 'fp-kit/stream';

const iter = drop(2, [1, 2, 3, 4]);
Array.from(iter); // [3, 4]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function drop<T>(count: number, iterable: Iterable<T>): IterableIterator<T>;
function drop<T>(count: number, iterable: AnyIterableInput<PromiseLikeValue<T>>): AsyncIterableIterator<T>;
function drop<T>(count: number): (iterable: Iterable<T>) => IterableIterator<T>;
function drop<T>(count: number): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      비동기 입력
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { drop, toArray } from 'fp-kit/stream';

const result = await toArray(drop(2, Promise.resolve([1, 2, 3, 4])));
// [3, 4]`}
    />
  </div>
);

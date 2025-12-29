import { CodeBlock } from '@/components/CodeBlock';

export const StreamMap_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      map (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Iterable 또는 AsyncIterable 값을 지연 변환합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      stream map 이란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        map
      </strong>{' '}
      은 입력 전체를 만들지 않고 각 값을 함수로 변환하는 지연 이터레이터를 생성합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { map } from 'fp-kit/stream';

const iter = map((n: number) => n * 2, [1, 2, 3]);
Array.from(iter); // [2, 4, 6]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function map<T, R>(fn: (value: T) => R, iterable: Iterable<T>): IterableIterator<R>;
function map<T, R>(fn: (value: T) => R | Promise<R>, iterable: AnyIterableInput<PromiseLikeValue<T>>): AsyncIterableIterator<R>;
function map<T, R>(fn: (value: T) => R): (iterable: Iterable<T>) => IterableIterator<R>;
function map<T, R>(fn: (value: T) => R | Promise<R>): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<R>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      비동기 입력
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { map, toArray } from 'fp-kit/stream';

const result = await toArray(
  map(async (n: number) => n * 3, Promise.resolve([1, 2]))
);
// [3, 6]`}
    />
  </div>
);

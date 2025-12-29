import { CodeBlock } from '@/components/CodeBlock';

export const StreamZip = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      zip (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Lazily combine two iterables into pairs
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is stream zip?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        zip
      </strong>{' '}
      pairs values from two sources and stops when either source completes.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { zip } from 'fp-kit/stream';

const iter = zip(['a', 'b'], [1, 2, 3]);
Array.from(iter); // [[1, 'a'], [2, 'b']]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function zip<A, B>(other: Iterable<B>, iterable: Iterable<A>): IterableIterator<[A, B]>;
function zip<A, B>(other: AnyIterableInput<PromiseLikeValue<B>>, iterable: AnyIterableInput<PromiseLikeValue<A>>): AsyncIterableIterator<[A, B]>;
function zip<A, B>(other: Iterable<B>): (iterable: Iterable<A>) => IterableIterator<[A, B]>;
function zip<A, B>(other: AnyIterableInput<PromiseLikeValue<B>>): (iterable: AnyIterableInput<PromiseLikeValue<A>>) => AsyncIterableIterator<[A, B]>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      With Async Inputs
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { zip, toArray } from 'fp-kit/stream';

const result = await toArray(
  zip(Promise.resolve(['x', 'y']), Promise.resolve([1, 2, 3]))
);
// [[1, 'x'], [2, 'y']]`}
    />
  </div>
);

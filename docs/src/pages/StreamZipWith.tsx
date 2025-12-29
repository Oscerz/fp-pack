import { CodeBlock } from '@/components/CodeBlock';

export const StreamZipWith = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      zipWith (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Lazily combine two iterables with a function
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is stream zipWith?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        zipWith
      </strong>{' '}
      pairs values from two inputs and maps each pair with a function.
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
  </div>
);

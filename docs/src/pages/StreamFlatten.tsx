import { CodeBlock } from '@/components/CodeBlock';

export const StreamFlatten = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      flatten (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Lazily flatten an iterable of iterables
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is stream flatten?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        flatten
      </strong>{' '}
      iterates nested iterables without materializing the full result.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatten } from 'fp-kit/stream';

const iter = flatten([[1, 2], [3]]);
Array.from(iter); // [1, 2, 3]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function flatten<T>(iterable: Iterable<Iterable<T>>): IterableIterator<T>;
function flatten<T>(iterable: AnyIterableInput<PromiseLikeValue<Iterable<T>>>): AsyncIterableIterator<T>;`}
    />
  </div>
);

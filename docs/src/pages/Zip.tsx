import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Zip = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      zip
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Combine two arrays into pairs
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is zip?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        zip
      </strong>{' '}
      pairs elements from two arrays into a single array of tuples. Pairing stops at the shorter length,
      so no out-of-range access occurs.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { zip } from 'fp-kit';

zip(['a', 'b'], [1, 2, 3]);
// [[1, 'a'], [2, 'b']]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function zip<T, U>(arr2: U[], arr1: T[]): Array<[T, U]>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Pair Keys and Values
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { zip } from 'fp-kit';

const keys = ['id', 'name', 'price'];
const values = [1, 'Keyboard', 75];

const entries = zip(values, keys);
// [[ 'id', 1 ], [ 'name', 'Keyboard' ], [ 'price', 75 ]]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Zip Index with Values
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { zip, zipIndex } from 'fp-kit';

const values = ['a', 'b', 'c'];
const indices = zipIndex(values).map(([i]) => i);

zip(values, indices);
// [[0, 'a'], [1, 'b'], [2, 'c']]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/array/unzip"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/unzip');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          unzip →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Split paired tuples back into two arrays.
        </p>
      </a>

      <a
        href="/array/zipIndex"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/zipIndex');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          zipIndex →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Pair each element with its index.
        </p>
      </a>
    </div>
  </div>
);


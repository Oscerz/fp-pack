import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Reduce = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      reduce
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Reduce an array to a single value
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is reduce?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        reduce
      </strong>{' '}
      folds an array into a single value by iteratively combining an accumulator with each element.
      This utility always requires an initial value.
      <br />
      <br />
      Use it for <strong>sums</strong>, <strong>aggregation</strong>,{' '}
      <strong>building maps/objects</strong>, and <strong>grouping/counting</strong>.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { reduce } from 'fp-kit';

reduce((acc: number, n: number) => acc + n, 0, [1, 2, 3, 4]);
// 10

reduce(
  (acc: Record<string, number>, n: number) => {
    acc[String(n)] = n * 10;
    return acc;
  },
  {},
  [1, 2]
);
// { '1': 10, '2': 20 }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function reduce<T, R>(
  fn: (acc: R, value: T) => R,
  initial: R,
  arr: T[]
): R;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Count Occurrences
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { reduce } from 'fp-kit';

const words = ['a', 'b', 'a', 'c', 'b', 'a'];

const counts = reduce(
  (acc: Record<string, number>, w: string) => {
    acc[w] = (acc[w] ?? 0) + 1;
    return acc;
  },
  {},
  words
);
// { a: 3, b: 2, c: 1 }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Derive a Summary
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { reduce } from 'fp-kit';

type Item = { price: number; inStock: boolean };
const items: Item[] = [
  { price: 10, inStock: true },
  { price: 20, inStock: false },
  { price: 5, inStock: true },
];

const summary = reduce(
  (acc: { total: number; available: number }, item: Item) => {
    acc.total += item.price;
    if (item.inStock) acc.available += 1;
    return acc;
  },
  { total: 0, available: 0 },
  items
);
// { total: 35, available: 2 }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Related Functions
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/array/map"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/map');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          map →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Transform elements before reducing.
        </p>
      </a>

      <a
        href="/array/filter"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/filter');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          filter →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Select elements before reducing.
        </p>
      </a>

      <a
        href="/array/groupBy"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/groupBy');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          groupBy →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Group elements by key - specialized reduce.
        </p>
      </a>
    </div>
  </div>
);

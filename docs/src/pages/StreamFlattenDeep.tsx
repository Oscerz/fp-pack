import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamFlattenDeep = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      stream/flattenDeep
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Lazily flatten nested iterables of any depth
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is stream/flattenDeep?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/20 px-2 py-1 rounded">
        flattenDeep
      </strong>{' '}
      recursively flattens nested iterables to any depth, producing a lazy stream of all leaf values.
      Unlike <code class="text-sm">flatten</code> which only flattens one level, <code class="text-sm">flattenDeep</code>{' '}
      continues recursively until all nesting is removed.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      This is particularly useful when:
    </p>

    <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li>You have deeply nested data structures from APIs or tree traversals</li>
      <li>The nesting depth is unknown or varies</li>
      <li>You need to collect all leaf values regardless of structure</li>
      <li>Memory efficiency matters for large nested datasets</li>
    </ul>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';
import { flattenDeep, toArray } from 'fp-kit/stream';

const deeplyNested = [1, [2, [3, [4, [5]]]]];

const result = pipe(
  flattenDeep,
  toArray
)(deeplyNested);
// [1, 2, 3, 4, 5]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function flattenDeep<T>(
  iterable: Iterable<unknown>
): IterableIterator<T>;

function flattenDeep<T>(
  iterable: AnyIterableInput<PromiseLikeValue<unknown>>
): AsyncIterableIterator<T>;`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      The function supports both synchronous and asynchronous iterables, automatically detecting
      the input type and returning the appropriate iterator.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      flatten vs flattenDeep
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Understanding when to use <code class="text-sm">flatten</code> vs <code class="text-sm">flattenDeep</code>:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatten, flattenDeep, toArray } from 'fp-kit/stream';

const nested = [1, [2, [3, 4]], 5];

// flatten - only one level
const oneLevel = toArray(flatten(nested));
// [1, 2, [3, 4], 5]

// flattenDeep - all levels
const allLevels = toArray(flattenDeep(nested));
// [1, 2, 3, 4, 5]`}
    />

    <div class="bg-blue-50 dark:bg-blue-900/20 p-4 mb-6 rounded border border-blue-200 dark:border-blue-800 mt-6">
      <p class="text-sm md:text-base text-blue-800 dark:text-blue-200 leading-relaxed">
        <span class="font-medium">💡 When to use which?</span>
        <br />
        <br />
        Use <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">flatten</code> when you know the structure has only one level of nesting and you want precise control.
        <br />
        <br />
        Use <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">flattenDeep</code> when the nesting depth is unknown, varies, or you need all leaf values regardless of structure.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Tree Structure to Flat List
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';
import { flattenDeep, toArray } from 'fp-kit/stream';

interface TreeNode {
  value: number;
  children?: TreeNode[];
}

const tree: TreeNode = {
  value: 1,
  children: [
    { value: 2, children: [{ value: 4 }, { value: 5 }] },
    { value: 3, children: [{ value: 6 }] }
  ]
};

// Extract all values from tree
const extractValues = (node: TreeNode): any[] => [
  node.value,
  ...(node.children?.map(extractValues) || [])
];

const allValues = pipe(
  extractValues,
  flattenDeep,
  toArray
)(tree);
// [1, 2, 4, 5, 3, 6]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Collect Nested Tags
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';
import { flattenDeep, toArray } from 'fp-kit/stream';

const categories = [
  { name: 'Frontend', tags: [['React', 'Vue'], ['CSS']] },
  { name: 'Backend', tags: [['Node.js', ['Express', 'Fastify']]] },
  { name: 'DevOps', tags: ['Docker'] }
];

const allTags = pipe(
  (cats) => cats.map(c => c.tags),
  flattenDeep,
  toArray
)(categories);
// ['React', 'Vue', 'CSS', 'Node.js', 'Express', 'Fastify', 'Docker']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Process Async Nested Data
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';
import { flattenDeep, toArray } from 'fp-kit/stream';

// API returns nested structure
const fetchNestedData = async () =>
  Promise.resolve([
    1,
    Promise.resolve([2, [3]]),
    [[Promise.resolve(4)]]
  ]);

const result = await pipe(
  fetchNestedData,
  flattenDeep,
  toArray
)();
// [1, 2, 3, 4]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Combine with Other Stream Functions
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';
import { flattenDeep, filter, map, take, toArray } from 'fp-kit/stream';

const nestedNumbers = [
  [1, 2],
  [[3, 4], [5]],
  [[[6, 7, 8]]]
];

const result = pipe(
  flattenDeep,
  filter((n: number) => n % 2 === 0),  // Only even numbers
  map((n: number) => n * 2),            // Double them
  take(3),                               // First 3
  toArray
)(nestedNumbers);
// [4, 8, 12]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Performance Considerations
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">flattenDeep</code> is lazy and memory-efficient:
    </p>

    <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li><strong>Lazy evaluation:</strong> Values are flattened on-demand as you iterate</li>
      <li><strong>Memory efficient:</strong> Doesn't create intermediate arrays for each nesting level</li>
      <li><strong>Early termination:</strong> Combine with <code class="text-sm">take</code> to stop early</li>
      <li><strong>Large datasets:</strong> Works well with deeply nested structures that don't fit in memory</li>
    </ul>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';
import { flattenDeep, take, toArray } from 'fp-kit/stream';

// Generate deeply nested structure
const deepNesting = (depth: number): any =>
  depth === 0 ? 1 : [2, deepNesting(depth - 1)];

const hugeNested = deepNesting(1000);

// Only processes what's needed - stops after 5 items
const first5 = pipe(
  flattenDeep,
  take(5),
  toArray
)(hugeNested);
// [2, 2, 2, 2, 2]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Related Functions
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/stream/flatten"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/flatten');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          flatten →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Flatten only one level of nesting lazily.
        </p>
      </a>

      <a
        href="/stream/flatMap"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/flatMap');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          flatMap →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Map values and flatten one level lazily.
        </p>
      </a>

      <a
        href="/stream/map"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/map');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          map →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Transform each value lazily.
        </p>
      </a>

      <a
        href="/stream/filter"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/filter');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          filter →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Filter values lazily based on a predicate.
        </p>
      </a>
    </div>
  </div>
);

import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamTakeWhile = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      stream/takeWhile
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Lazily take values while a condition remains true
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is stream/takeWhile?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        takeWhile
      </strong>{' '}
      creates a lazy iterator that yields values from an iterable as long as a predicate function
      returns <code class="text-sm">true</code>. The moment the predicate returns <code class="text-sm">false</code>,
      iteration stops immediately, and no further values are checked.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      This is particularly useful when:
    </p>

    <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li>Processing ordered data until a boundary condition is met</li>
      <li>Collecting items from a sorted stream until a threshold</li>
      <li>Reading data until a sentinel or terminator value appears</li>
      <li>Early termination based on dynamic conditions</li>
    </ul>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';
import { takeWhile, toArray } from 'fp-kit/stream';

// Take numbers while they're less than 5
const result = pipe(
  takeWhile((n: number) => n < 5),
  toArray
)([1, 2, 3, 4, 5, 6, 7]);
// [1, 2, 3, 4]

// Stops at first false, doesn't continue checking
const stopEarly = pipe(
  takeWhile((n: number) => n < 3),
  toArray
)([1, 2, 3, 1, 2]);
// [1, 2] - stops at 3, doesn't see the 1, 2 after it`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function takeWhile<T>(
  predicate: (value: T) => boolean,
  iterable: Iterable<T>
): IterableIterator<T>;

function takeWhile<T>(
  predicate: (value: T) => boolean | Promise<boolean>,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): AsyncIterableIterator<T>;

function takeWhile<T>(
  predicate: (value: T) => boolean
): (iterable: Iterable<T>) => IterableIterator<T>;

function takeWhile<T>(
  predicate: (value: T) => boolean | Promise<boolean>
): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      The function supports both curried and direct call styles. The predicate can be synchronous or
      asynchronous. Iteration stops immediately upon the first <code class="text-sm">false</code> result,
      preventing unnecessary evaluation.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      takeWhile vs take vs filter
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Understanding the differences between these related functions:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { take, takeWhile, filter, toArray } from 'fp-kit/stream';

const data = [1, 2, 3, 4, 1, 2];

// take: Fixed count, regardless of values
toArray(take(3, data));
// [1, 2, 3]

// takeWhile: Until condition fails (stops iteration)
toArray(takeWhile((n: number) => n < 4, data));
// [1, 2, 3] - stops when it sees 4

// filter: All matching values (continues iteration)
toArray(filter((n: number) => n < 4, data));
// [1, 2, 3, 1, 2] - processes entire array`}
    />

    <div class="bg-purple-50 dark:bg-purple-900/20 p-4 mb-6 rounded border border-purple-200 dark:border-purple-800 mt-6">
      <p class="text-sm md:text-base text-purple-800 dark:text-purple-200 leading-relaxed">
        <span class="font-medium">💡 Key Difference</span>
        <br />
        <br />
        <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">takeWhile</code> stops iteration
        at the first false value, while <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">filter</code>{' '}
        continues checking all values. Use <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">takeWhile</code>{' '}
        when your data is ordered and you want early termination.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Process Until Boundary
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';
import { takeWhile, toArray } from 'fp-kit/stream';

// Read log lines until error appears
const logs = [
  { level: 'info', message: 'Starting' },
  { level: 'info', message: 'Processing' },
  { level: 'warn', message: 'Slow response' },
  { level: 'error', message: 'Failed' },
  { level: 'info', message: 'Recovering' }
];

const beforeError = pipe(
  takeWhile((log) => log.level !== 'error'),
  toArray
)(logs);
// [
//   { level: 'info', message: 'Starting' },
//   { level: 'info', message: 'Processing' },
//   { level: 'warn', message: 'Slow response' }
// ]

// Take timestamps before a cutoff date
const events = [
  { time: new Date('2024-01-01'), event: 'A' },
  { time: new Date('2024-01-02'), event: 'B' },
  { time: new Date('2024-01-05'), event: 'C' },
  { time: new Date('2024-01-10'), event: 'D' }
];

const cutoff = new Date('2024-01-05');
const beforeCutoff = pipe(
  takeWhile((e) => e.time < cutoff),
  toArray
)(events);
// [
//   { time: 2024-01-01, event: 'A' },
//   { time: 2024-01-02, event: 'B' }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Sorted Data Processing
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';
import { takeWhile, map, toArray } from 'fp-kit/stream';

// Get all items below a price threshold (assuming sorted)
interface Product {
  name: string;
  price: number;
}

const sortedProducts: Product[] = [
  { name: 'Pen', price: 5 },
  { name: 'Notebook', price: 10 },
  { name: 'Backpack', price: 50 },
  { name: 'Laptop', price: 1000 }
];

const affordable = pipe(
  takeWhile((p: Product) => p.price <= 50),
  map((p: Product) => p.name),
  toArray
)(sortedProducts);
// ['Pen', 'Notebook', 'Backpack']

// Get scores until first failure
const testScores = [85, 92, 78, 88, 55, 90, 95];
const passingGrade = 60;

const beforeFailure = pipe(
  takeWhile((score: number) => score >= passingGrade),
  toArray
)(testScores);
// [85, 92, 78, 88] - stops at 55`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Batch Collection with Limit
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';
import { takeWhile, toArray } from 'fp-kit/stream';

// Collect items until batch size limit
interface Item {
  name: string;
  size: number;
}

const items: Item[] = [
  { name: 'A', size: 10 },
  { name: 'B', size: 15 },
  { name: 'C', size: 20 },
  { name: 'D', size: 30 },
  { name: 'E', size: 5 }
];

const maxBatchSize = 50;
let currentSize = 0;

const batch = pipe(
  takeWhile((item: Item) => {
    if (currentSize + item.size <= maxBatchSize) {
      currentSize += item.size;
      return true;
    }
    return false;
  }),
  toArray
)(items);
// [
//   { name: 'A', size: 10 },
//   { name: 'B', size: 15 },
//   { name: 'C', size: 20 }
// ] - total: 45, next would exceed 50`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      String Processing Until Marker
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';
import { takeWhile, toArray } from 'fp-kit/stream';

// Read lines until delimiter
const lines = [
  'Header: Data',
  'Content: More data',
  'Body: Information',
  '---',
  'Footer: End'
];

const beforeDelimiter = pipe(
  takeWhile((line: string) => line !== '---'),
  toArray
)(lines);
// ['Header: Data', 'Content: More data', 'Body: Information']

// Parse config until end marker
const config = [
  'setting1=value1',
  'setting2=value2',
  'setting3=value3',
  '[END]',
  'ignored=data'
];

const settings = pipe(
  takeWhile((line: string) => !line.startsWith('[END]')),
  map((line: string) => {
    const [key, value] = line.split('=');
    return { key, value };
  }),
  toArray
)(config);
// [
//   { key: 'setting1', value: 'value1' },
//   { key: 'setting2', value: 'value2' },
//   { key: 'setting3', value: 'value3' }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Async Stream Processing
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';
import { takeWhile, toArray } from 'fp-kit/stream';

// Process async stream until condition
async function* fetchPages() {
  let page = 1;
  while (true) {
    const response = await fetch(\`/api/data?page=\${page}\`);
    const data = await response.json();

    if (data.items.length === 0) break;

    for (const item of data.items) {
      yield item;
    }
    page++;
  }
}

// Collect items until we find a specific one
const untilTarget = await pipe(
  takeWhile((item: any) => item.id !== 'target-id'),
  toArray
)(fetchPages());

// Process with async predicate
const messages = [
  { id: 1, content: 'Hello' },
  { id: 2, content: 'World' },
  { id: 3, content: 'Spam' },
  { id: 4, content: 'Test' }
];

const beforeSpam = await pipe(
  takeWhile(async (msg: any) => {
    const isSpam = await checkSpam(msg.content);
    return !isSpam;
  }),
  toArray
)(messages);
// Stops at first spam message`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Stateful Conditions
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';
import { takeWhile, toArray } from 'fp-kit/stream';

// Keep running total until threshold
const numbers = [5, 10, 15, 20, 25, 30];
let sum = 0;
const threshold = 50;

const beforeThreshold = pipe(
  takeWhile((n: number) => {
    sum += n;
    return sum <= threshold;
  }),
  toArray
)(numbers);
// [5, 10, 15, 20] - sum is 50, next would exceed

// Take consecutive duplicates
const values = [1, 1, 1, 2, 2, 3, 3, 3];
let expected = values[0];

const firstGroup = pipe(
  takeWhile((n: number) => n === expected),
  toArray
)(values);
// [1, 1, 1]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Performance Considerations
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">takeWhile</code> provides efficient early termination:
    </p>

    <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li><strong>Lazy evaluation:</strong> Only processes items until the condition fails</li>
      <li><strong>Immediate termination:</strong> Stops at the first false predicate result</li>
      <li><strong>No post-processing:</strong> Doesn't check remaining items after stopping</li>
      <li><strong>Ideal for sorted data:</strong> Most efficient when condition has clear boundary</li>
    </ul>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';
import { takeWhile, filter, toArray } from 'fp-kit/stream';

const largeSortedArray = Array.from({ length: 1000000 }, (_, i) => i);

// ✅ Efficient: stops after checking ~1000 items
const takeWhileResult = pipe(
  takeWhile((n: number) => n < 1000),
  toArray
)(largeSortedArray);

// ❌ Inefficient: checks all 1M items
const filterResult = pipe(
  filter((n: number) => n < 1000),
  toArray
)(largeSortedArray);

// Both produce [0, 1, 2, ..., 999]
// But takeWhile stops at 1000, filter checks all 1M items`}
    />

    <div class="bg-green-50 dark:bg-green-900/20 p-4 mb-6 rounded border border-green-200 dark:border-green-800 mt-6">
      <p class="text-sm md:text-base text-green-800 dark:text-green-200 leading-relaxed">
        <span class="font-medium">💡 Performance Tip</span>
        <br />
        <br />
        Use <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">takeWhile</code> when your data
        is ordered and you have a boundary condition. It will stop iteration immediately, unlike{' '}
        <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">filter</code> which must check every item.
        This can provide massive performance improvements on large datasets.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Related Functions
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/stream/take"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/take');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          take →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Take a fixed number of values (count-based take).
        </p>
      </a>

      <a
        href="/stream/dropWhile"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/dropWhile');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          dropWhile →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Skip values while a condition is true (opposite of takeWhile).
        </p>
      </a>

      <a
        href="/stream/filter"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/filter');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          filter →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Filter all values based on a predicate (continues iteration).
        </p>
      </a>

      <a
        href="/stream/drop"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/drop');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          drop →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Skip the first N values and yield the rest.
        </p>
      </a>
    </div>
  </div>
);

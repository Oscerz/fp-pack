import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamPrepend = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      prepend (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Lazily prepend a value to the beginning of an iterable
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is stream prepend?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        prepend
      </strong>{' '}
      adds a single value to the beginning of an iterable, creating a new iterable that yields the prepended value first, followed by all original values. The operation is lazy—values are generated on-demand as you iterate, making it memory-efficient even with large or infinite sequences.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Unlike array methods like <code class="text-pink-600 dark:text-pink-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">unshift</code> or spread syntax that create immediate copies, prepend works with any iterable and processes values only when needed. This makes it ideal for data pipelines, event streams, and functional compositions where you need to add a header, prefix, or initial value without materializing the entire sequence.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`// Sync version - prepend value to sync iterable
function prepend<T>(value: T, iterable: Iterable<T>): IterableIterator<T>;

// Async version - prepend value to async iterable
function prepend<T>(
  value: PromiseLikeValue<T>,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): AsyncIterableIterator<T>;

// Curried sync version - returns function that prepends value
function prepend<T>(value: T): (iterable: Iterable<T>) => IterableIterator<T>;

// Curried async version - returns function that prepends value
function prepend<T>(
  value: PromiseLikeValue<T>
): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      Simple Prepend
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { prepend } from 'fp-kit/stream';

// Prepend a single value to an array
const numbers = prepend(0, [1, 2, 3]);
console.log(Array.from(numbers));
// Output: [0, 1, 2, 3]

// Works with any iterable
function* countFrom2() {
  yield 2;
  yield 3;
  yield 4;
}

const withOne = prepend(1, countFrom2());
console.log(Array.from(withOne));
// Output: [1, 2, 3, 4]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      Curried Form for Composition
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { prepend } from 'fp-kit/stream';
import { pipe } from 'fp-kit/composition';
import { map } from 'fp-kit/stream';

// Create reusable prepend functions
const addHeader = prepend('=== Report Header ===');
const addTimestamp = prepend(\`Generated: \${new Date().toISOString()}\`);

// Use in functional pipelines
const processItems = pipe(
  map((item: string) => \`  \${item}\`),
  addHeader
);

const items = ['Item 1', 'Item 2', 'Item 3'];
console.log(Array.from(processItems(items)));
// Output:
// === Report Header ===
//   Item 1
//   Item 2
//   Item 3`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      1. Adding Headers to Data Streams
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { prepend } from 'fp-kit/stream';

// Add CSV header to data rows
async function* fetchDataRows() {
  yield 'John,30,Engineer';
  yield 'Jane,28,Designer';
  yield 'Bob,35,Manager';
}

const csvWithHeader = prepend(
  'Name,Age,Position',
  fetchDataRows()
);

for await (const row of csvWithHeader) {
  console.log(row);
}
// Output:
// Name,Age,Position
// John,30,Engineer
// Jane,28,Designer
// Bob,35,Manager`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      2. File Processing with Metadata
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { prepend } from 'fp-kit/stream';
import { pipe } from 'fp-kit/composition';

interface FileChunk {
  type: 'metadata' | 'content';
  data: string;
}

async function* readFileContent(filename: string) {
  // Simulate reading file content
  yield { type: 'content' as const, data: 'Line 1 content' };
  yield { type: 'content' as const, data: 'Line 2 content' };
  yield { type: 'content' as const, data: 'Line 3 content' };
}

// Add file metadata at the beginning
const withMetadata = prepend(
  {
    type: 'metadata' as const,
    data: JSON.stringify({
      filename: 'data.txt',
      timestamp: Date.now(),
      encoding: 'utf-8'
    })
  },
  readFileContent('data.txt')
);

for await (const chunk of withMetadata) {
  if (chunk.type === 'metadata') {
    console.log('File Info:', JSON.parse(chunk.data));
  } else {
    console.log('Content:', chunk.data);
  }
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      3. Event Stream with Initialization Event
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { prepend } from 'fp-kit/stream';

interface StreamEvent {
  type: 'init' | 'data' | 'update';
  timestamp: number;
  payload?: any;
}

async function* captureEvents() {
  await new Promise(resolve => setTimeout(resolve, 100));
  yield {
    type: 'data' as const,
    timestamp: Date.now(),
    payload: { value: 1 }
  };

  await new Promise(resolve => setTimeout(resolve, 100));
  yield {
    type: 'update' as const,
    timestamp: Date.now(),
    payload: { value: 2 }
  };
}

// Add initialization event at the start
const eventsWithInit = prepend(
  {
    type: 'init' as const,
    timestamp: Date.now(),
    payload: { version: '1.0.0' }
  },
  captureEvents()
);

for await (const event of eventsWithInit) {
  console.log(\`[\${event.type}] at \${event.timestamp}:, event.payload);
}
// Output:
// [init] at 1234567890: { version: '1.0.0' }
// [data] at 1234567991: { value: 1 }
// [update] at 1234568091: { value: 2 }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      4. API Response with Cache Indicator
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { prepend } from 'fp-kit/stream';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CacheInfo {
  cached: boolean;
  timestamp: number;
}

async function* fetchProducts(): AsyncIterableIterator<Product> {
  const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 29 },
    { id: 3, name: 'Keyboard', price: 79 }
  ];

  for (const product of products) {
    yield product;
  }
}

// Add cache information as first item
const productsWithCacheInfo = (async function*() {
  const cacheInfo: CacheInfo = {
    cached: true,
    timestamp: Date.now()
  };

  // Type assertion for the first yield
  yield cacheInfo as any;

  // Then yield all products
  for await (const product of fetchProducts()) {
    yield product as any;
  }
})();

for await (const item of productsWithCacheInfo) {
  if ('cached' in item) {
    console.log(\`Cache: \${item.cached}, Time: \${item.timestamp}\`);
  } else {
    console.log(\`Product: \${item.name} - $\${item.price}\`);
  }
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      5. Log Stream with Banner
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { prepend } from 'fp-kit/stream';
import { pipe } from 'fp-kit/composition';

function* generateLogs() {
  yield '[INFO] Service started';
  yield '[WARN] Configuration missing';
  yield '[ERROR] Database connection failed';
}

const banner = \`
╔════════════════════════════════╗
║     Application Log Stream     ║
║   \${new Date().toISOString()}   ║
╚════════════════════════════════╝
\`.trim();

const logsWithBanner = prepend(banner, generateLogs());

for (const line of logsWithBanner) {
  console.log(line);
}
// Output:
// ╔════════════════════════════════╗
// ║     Application Log Stream     ║
// ║   2025-12-31T10:00:00.000Z   ║
// ╚════════════════════════════════╝
// [INFO] Service started
// [WARN] Configuration missing
// [ERROR] Database connection failed`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      6. Default Value for Empty Sequences
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { prepend } from 'fp-kit/stream';
import { filter } from 'fp-kit/stream';
import { pipe } from 'fp-kit/composition';

function* getNumbers() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
}

// Filter for numbers greater than 10 (will be empty)
const largeNumbers = pipe(
  filter((n: number) => n > 10),
  // Prepend a default value
  prepend(-1)
);

const result = Array.from(largeNumbers(getNumbers()));
console.log(result);
// Output: [-1] (only the default value, as no numbers > 10)

// With numbers that match
const evenNumbers = pipe(
  filter((n: number) => n % 2 === 0),
  prepend(0) // Add 0 as the first even number
);

const result2 = Array.from(evenNumbers(getNumbers()));
console.log(result2);
// Output: [0, 2, 4]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use prepend?
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      <div class="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5">
        <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          Lazy Evaluation
        </h3>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          Values are generated on-demand without creating intermediate arrays. Works efficiently with infinite sequences and large datasets.
        </p>
      </div>

      <div class="border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-5">
        <h3 class="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
          Composable Design
        </h3>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          Curried interface integrates seamlessly with pipe and other functional utilities for building declarative data transformation pipelines.
        </p>
      </div>

      <div class="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-lg p-5">
        <h3 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
          Memory Efficient
        </h3>
        <p class="text-sm text-green-800 dark:text-green-200">
          No array copying or materialization required. Processes one value at a time, making it suitable for streaming large files or real-time data.
        </p>
      </div>

      <div class="border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20 rounded-lg p-5">
        <h3 class="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2">
          Universal Compatibility
        </h3>
        <p class="text-sm text-orange-800 dark:text-orange-200">
          Works with any iterable (arrays, generators, async iterables, sets, maps) and automatically handles both sync and async contexts.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      The prepend function creates a new iterable that first yields the prepended value, then yields all values from the input iterable. Here's a simplified implementation:
    </p>

    <CodeBlock
      language="typescript"
      code={`// Simplified sync implementation
function* prepend<T>(
  value: T,
  iterable: Iterable<T>
): IterableIterator<T> {
  // First, yield the prepended value
  yield value;

  // Then yield all values from the original iterable
  for (const item of iterable) {
    yield item;
  }
}

// Async version works the same way
async function* prependAsync<T>(
  value: T | Promise<T>,
  iterable: AsyncIterable<T> | Iterable<T>
): AsyncIterableIterator<T> {
  // Yield the prepended value (await if it's a promise)
  yield await value;

  // Then yield all values from the original iterable
  for await (const item of iterable) {
    yield item;
  }
}`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
      The key characteristics:
    </p>

    <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-2 ml-4">
      <li><strong>Lazy execution</strong>: Values are only generated when iterated</li>
      <li><strong>Single-pass iteration</strong>: Each value from the source is yielded once</li>
      <li><strong>Preserves order</strong>: Prepended value comes first, then all original values</li>
      <li><strong>No mutation</strong>: Original iterable remains unchanged</li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Related Functions
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/append');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          append
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Add a value to the end of an iterable instead of the beginning
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/concat');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          concat
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Combine multiple iterables into a single sequence
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/map');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          map
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Transform each value in an iterable with a mapping function
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/filter');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          filter
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Filter values in an iterable based on a predicate function
        </p>
      </div>
    </div>
  </div>
);

import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Constant = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      constant
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Always return the same value
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is constant?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        constant
      </strong>{' '}
      creates a function that always returns the same value, regardless of what arguments
      it receives (or even if it receives any).
      <br />
      <br />
      This simple utility is surprisingly useful in functional programming for{' '}
      <strong>providing default values</strong>, <strong>ignoring function arguments</strong>,
      and <strong>creating placeholder functions</strong>.
      <br />
      <br />
      Also known as <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">always</code> in
      some functional programming libraries.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { constant } from 'fp-kit';

const alwaysTrue = constant(true);
const alwaysFive = constant(5);
const alwaysHello = constant('hello');

alwaysTrue();       // true
alwaysTrue(false);  // true (argument ignored)
alwaysTrue(1, 2, 3); // true (all arguments ignored)

alwaysFive();       // 5
alwaysHello();      // "hello"`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function constant<T>(value: T): () => T;

// Takes any value
// Returns a function that always returns that value`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      The returned function ignores all arguments and always returns the same value with
      preserved reference identity.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Simple Examples
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { constant } from 'fp-kit';

// Primitive values
const alwaysZero = constant(0);
const alwaysEmpty = constant('');
const alwaysNull = constant(null);

alwaysZero();   // 0
alwaysEmpty();  // ""
alwaysNull();   // null

// Objects and arrays
const defaultUser = constant({ id: 0, name: 'Guest' });
const emptyArray = constant([]);

defaultUser();   // { id: 0, name: 'Guest' }
emptyArray();    // []

// Same reference every time
const arr1 = emptyArray();
const arr2 = emptyArray();
console.log(arr1 === arr2);  // true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Ignoring Arguments
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { constant } from 'fp-kit';

const alwaysSuccess = constant({ status: 'success' });

// Works with any number of arguments
alwaysSuccess();                    // { status: 'success' }
alwaysSuccess('ignored');           // { status: 'success' }
alwaysSuccess(1, 2, 3, 'ignored');  // { status: 'success' }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Default Values and Fallbacks
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { constant } from 'fp-kit';

interface Config {
  apiUrl: string;
  timeout: number;
  retries: number;
}

const defaultConfig = constant<Config>({
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
});

// Use as a factory for default values
function createClient(config?: Config) {
  const finalConfig = config || defaultConfig();
  // ...
}

// Or with nullish coalescing
function getConfig(userConfig?: Config): Config {
  return userConfig ?? defaultConfig();
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Array.map with Constant Values
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { constant } from 'fp-kit';

// Replace all values with a constant
const numbers = [1, 2, 3, 4, 5];
const allZeros = numbers.map(constant(0));
// [0, 0, 0, 0, 0]

const allTrue = numbers.map(constant(true));
// [true, true, true, true, true]

// Create an array of default objects
const users = ['Alice', 'Bob', 'Carol'];
const guestUsers = users.map(constant({ role: 'guest', active: false }));
// [
//   { role: 'guest', active: false },
//   { role: 'guest', active: false },
//   { role: 'guest', active: false }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Conditional Logic and Ternary
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { constant } from 'fp-kit';

// Instead of:
const getValue = (condition: boolean) => {
  return condition ? () => 'yes' : () => 'no';
};

// Use constant:
const getValueBetter = (condition: boolean) => {
  return condition ? constant('yes') : constant('no');
};

// In higher-order functions
function createHandler(isEnabled: boolean) {
  return isEnabled
    ? (data: any) => processData(data)
    : constant(null);  // Always return null when disabled
}

const handler = createHandler(false);
handler({ important: 'data' });  // null (data ignored)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Event Handlers and Callbacks
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { constant } from 'fp-kit';

// Simple event handler that always returns the same action
const createClickHandler = (action: string) => {
  return constant({ type: action, timestamp: Date.now() });
};

const handleSubmit = createClickHandler('FORM_SUBMIT');
const handleCancel = createClickHandler('FORM_CANCEL');

// Use in React/UI frameworks
function Button({ disabled }: { disabled: boolean }) {
  const onClick = disabled
    ? constant(undefined)  // Do nothing when disabled
    : () => console.log('Clicked!');

  return <button onClick={onClick}>Click me</button>;
}

// Promise callbacks
Promise.resolve()
  .then(constant('success'))  // Always resolve with 'success'
  .then(value => console.log(value));  // "success"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Default Function Arguments
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { constant } from 'fp-kit';

// Provide default transformer functions
function processItems<T, U>(
  items: T[],
  transform: (item: T) => U = constant(null) as any
): U[] {
  return items.map(transform);
}

// With default (returns nulls)
processItems([1, 2, 3]);
// [null, null, null]

// With custom transformer
processItems([1, 2, 3], x => x * 2);
// [2, 4, 6]

// Default error handler
function fetchData(
  url: string,
  onError: (error: Error) => void = constant(undefined)
) {
  return fetch(url).catch(onError);
}

// Silent failure (error ignored)
fetchData('/api/data');

// Custom error handling
fetchData('/api/data', err => console.error(err));`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Mocking and Testing
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { constant } from 'fp-kit';

// Mock functions in tests
const mockGetUser = constant({
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
});

// Always returns the same mock data
expect(mockGetUser()).toEqual({ id: 1, name: 'Test User', ... });

// Mock API responses
const mockFetch = constant(
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: [] }),
  })
);

// Stub functions
const noop = constant(undefined);
const stub = {
  log: noop,
  error: noop,
  warn: noop
};`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Functional Programming Patterns
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { constant, pipe } from 'fp-kit';

// Use in pipe for conditional logic
const processValue = (shouldDouble: boolean) => pipe(
  (n: number) => n + 10,
  shouldDouble
    ? (n: number) => n * 2
    : constant  // Pass through unchanged (always returns input)
);

// K combinator pattern (return first argument, ignore second)
const K = <T>(x: T) => constant(x);

const first = K(1)(999);  // 1 (999 ignored)
const name = K('Alice')('Bob');  // 'Alice' ('Bob' ignored)

// Creating placeholder/dummy implementations
interface DataService {
  fetch: () => Promise<any>;
  save: (data: any) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

const mockService: DataService = {
  fetch: constant(Promise.resolve([])),
  save: constant(Promise.resolve()),
  delete: constant(Promise.resolve()),
};`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use constant?
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          1. Clarity of Intent
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          Using <code class="px-1 py-0.5 bg-pink-200 dark:bg-pink-800 rounded text-xs">constant(value)</code> clearly
          communicates "this always returns the same value" better than a lambda like{' '}
          <code class="px-1 py-0.5 bg-pink-200 dark:bg-pink-800 rounded text-xs">() =&gt; value</code>.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. Type Safety
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          Provides better type inference than manually written functions, especially with
          complex types.
        </p>
      </div>

      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          3. Composability
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          Works seamlessly with higher-order functions like map, filter, and functional
          composition patterns.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          4. Reference Stability
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          The same value instance is returned every time, which is useful for React deps
          arrays and equality checks.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      constant vs identity
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          constant - Returns Fixed Value
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200 mb-2">
          Always returns the same value, ignoring all arguments.
        </p>
        <CodeBlock
          language="typescript"
          code={`const fn = constant(5);
fn();       // 5
fn(10);     // 5 (10 ignored)
fn(100);    // 5 (100 ignored)`}
        />
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          identity - Returns Input
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200 mb-2">
          Returns whatever value it receives as an argument.
        </p>
        <CodeBlock
          language="typescript"
          code={`const fn = identity;
fn(5);      // 5
fn(10);     // 10
fn(100);    // 100`}
        />
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      constant is elegantly simple - it captures the value in a closure:
    </p>

    <CodeBlock
      language="typescript"
      code={`function constant<T>(value: T): () => T {
  return () => value;
}`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      The value is captured by the closure, so the same reference is returned every time
      the function is called. This is memory-efficient and maintains reference equality.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/composition/identity"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/identity');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          identity →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Learn about identity, which returns its input unchanged instead of a constant value.
        </p>
      </a>

      <a
        href="/composition/curry"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/curry');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          curry →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Discover curry for creating flexible, partially applicable functions.
        </p>
      </a>
    </div>
  </div>
);

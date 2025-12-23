import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Equals = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      equals
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Perform deep equality comparison between two values
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is equals?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        equals
      </strong>{' '}
      performs a deep equality comparison between two values, checking if they are structurally equal.
      <br />
      <br />
      Unlike JavaScript's <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">===</code> operator
      which only checks reference equality for objects, <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">equals</code> recursively
      compares the contents of objects and arrays. It properly handles special cases like NaN, Date objects,
      and circular references.
      <br />
      <br />
      This is essential for comparing complex data structures, validating API responses, testing
      state equality, and implementing value-based comparisons in functional programming.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { equals } from 'fp-kit';

equals(1, 1);                    // true
equals([1, 2], [1, 2]);          // true
equals({ a: 1 }, { a: 1 });      // true
equals([1, 2], [1, 3]);          // false`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Primitive Values
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { equals } from 'fp-kit';

// Numbers
equals(42, 42);        // true
equals(42, 43);        // false

// Strings
equals('hello', 'hello');  // true
equals('hello', 'world');  // false

// Booleans
equals(true, true);    // true
equals(true, false);   // false

// Special case: NaN (unlike === operator)
equals(NaN, NaN);      // true
NaN === NaN;           // false (standard JavaScript behavior)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Arrays
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { equals } from 'fp-kit';

// Shallow arrays
equals([1, 2, 3], [1, 2, 3]);           // true
equals([1, 2, 3], [1, 2, 4]);           // false
equals([1, 2], [1, 2, 3]);              // false (different lengths)

// Nested arrays (deep comparison)
equals([1, [2, 3]], [1, [2, 3]]);       // true
equals([1, [2, 3]], [1, [2, 4]]);       // false

// Empty arrays
equals([], []);                          // true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Objects
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { equals } from 'fp-kit';

// Simple objects
equals({ a: 1, b: 2 }, { a: 1, b: 2 });     // true
equals({ a: 1, b: 2 }, { a: 1, b: 3 });     // false
equals({ a: 1 }, { a: 1, b: 2 });           // false (different keys)

// Nested objects (deep comparison)
equals(
  { user: { name: 'Alice', age: 30 } },
  { user: { name: 'Alice', age: 30 } }
);  // true

equals(
  { user: { name: 'Alice', age: 30 } },
  { user: { name: 'Alice', age: 31 } }
);  // false

// Empty objects
equals({}, {});                              // true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Date Objects
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { equals } from 'fp-kit';

const date1 = new Date('2024-01-01');
const date2 = new Date('2024-01-01');
const date3 = new Date('2024-01-02');

equals(date1, date2);  // true (same timestamp)
equals(date1, date3);  // false (different timestamp)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Real-World Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      State Comparison in React
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { equals } from 'fp-kit';

interface UserState {
  id: number;
  name: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
}

function shouldUpdateUser(
  prevState: UserState,
  newState: UserState
): boolean {
  // Avoid unnecessary re-renders by checking deep equality
  return !equals(prevState, newState);
}

const state1 = {
  id: 1,
  name: 'Alice',
  preferences: { theme: 'dark', notifications: true }
};

const state2 = {
  id: 1,
  name: 'Alice',
  preferences: { theme: 'dark', notifications: true }
};

const state3 = {
  id: 1,
  name: 'Alice',
  preferences: { theme: 'light', notifications: true }
};

shouldUpdateUser(state1, state2);  // false (no update needed)
shouldUpdateUser(state1, state3);  // true (update needed)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      API Response Validation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { equals } from 'fp-kit';

interface ApiResponse {
  status: number;
  data: {
    users: Array<{ id: number; name: string }>;
  };
}

function validateResponse(
  received: ApiResponse,
  expected: ApiResponse
): boolean {
  return equals(received, expected);
}

const expected = {
  status: 200,
  data: {
    users: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ]
  }
};

const received = {
  status: 200,
  data: {
    users: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ]
  }
};

validateResponse(received, expected);  // true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Array Deduplication
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { equals } from 'fp-kit';

interface Product {
  id: number;
  name: string;
  price: number;
}

function deduplicateProducts(products: Product[]): Product[] {
  return products.filter((product, index) =>
    products.findIndex(p => equals(p, product)) === index
  );
}

const products = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Mouse', price: 29 },
  { id: 1, name: 'Laptop', price: 999 },  // Duplicate
  { id: 3, name: 'Keyboard', price: 79 }
];

deduplicateProducts(products);
// [
//   { id: 1, name: 'Laptop', price: 999 },
//   { id: 2, name: 'Mouse', price: 29 },
//   { id: 3, name: 'Keyboard', price: 79 }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Form Change Detection
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { equals } from 'fp-kit';

interface FormData {
  username: string;
  email: string;
  settings: {
    newsletter: boolean;
    notifications: boolean;
  };
}

class FormManager {
  private initialData: FormData;
  private currentData: FormData;

  constructor(data: FormData) {
    this.initialData = data;
    this.currentData = { ...data };
  }

  hasChanges(): boolean {
    return !equals(this.initialData, this.currentData);
  }

  updateField(field: keyof FormData, value: any) {
    this.currentData = { ...this.currentData, [field]: value };
  }

  canSave(): boolean {
    return this.hasChanges();
  }
}

const form = new FormManager({
  username: 'alice',
  email: 'alice@example.com',
  settings: { newsletter: true, notifications: false }
});

form.hasChanges();  // false (no changes yet)

form.updateField('email', 'alice@newdomain.com');
form.hasChanges();  // true (email changed)
form.canSave();     // true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Memoization Cache Key
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { equals } from 'fp-kit';

interface CacheEntry<T> {
  args: any[];
  result: T;
}

function memoizeDeep<T extends (...args: any[]) => any>(
  fn: T
): T {
  const cache: CacheEntry<ReturnType<T>>[] = [];

  return ((...args: any[]) => {
    // Find cached result with deep equality
    const cached = cache.find(entry => equals(entry.args, args));

    if (cached) {
      return cached.result;
    }

    const result = fn(...args);
    cache.push({ args, result });
    return result;
  }) as T;
}

const expensiveOperation = memoizeDeep(
  (config: { filters: string[]; sort: string }) => {
    console.log('Computing...');
    return \`Result for \${config.filters.join(',')} sorted by \${config.sort}\`;
  }
);

expensiveOperation({ filters: ['active', 'premium'], sort: 'date' });
// Logs: "Computing..."

expensiveOperation({ filters: ['active', 'premium'], sort: 'date' });
// No log - returns cached result (deep equality match)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Test Assertions
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { equals } from 'fp-kit';

function assertDeepEqual<T>(actual: T, expected: T, message?: string) {
  if (!equals(actual, expected)) {
    throw new Error(
      message || \`Expected \${JSON.stringify(expected)} but got \${JSON.stringify(actual)}\`
    );
  }
}

// Usage in tests
const userService = {
  getUser: (id: number) => ({
    id,
    name: 'Alice',
    roles: ['admin', 'user']
  })
};

assertDeepEqual(
  userService.getUser(1),
  { id: 1, name: 'Alice', roles: ['admin', 'user'] }
);  // Passes

assertDeepEqual(
  userService.getUser(1),
  { id: 1, name: 'Bob', roles: ['admin', 'user'] }
);  // Throws error`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Circular References
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { equals } from 'fp-kit';

// Handle circular references safely
const obj1: any = { name: 'Alice', age: 30 };
obj1.self = obj1;

const obj2: any = { name: 'Alice', age: 30 };
obj2.self = obj2;

equals(obj1, obj2);  // true (handles circular references)

// Different circular references
const obj3: any = { name: 'Bob', age: 25 };
obj3.self = obj3;

equals(obj1, obj3);  // false (different values)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Key Characteristics
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          1. Deep Comparison
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          Recursively compares nested objects and arrays, unlike === which only checks references.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. NaN Handling
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          Correctly treats NaN as equal to NaN, unlike the standard === operator.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          3. Date Support
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          Compares Date objects by their timestamp value using getTime().
        </p>
      </div>

      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          4. Circular Reference Safe
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          Uses WeakMap to track visited objects and safely handle circular references
          without infinite loops.
        </p>
      </div>

      <div class="border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
          5. Structural Equality
        </h4>
        <p class="text-sm text-yellow-800 dark:text-yellow-200">
          Compares values by their structure and content, not by reference.
          Two different objects with identical properties are considered equal.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/equality/clamp"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/equality/clamp');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          clamp →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Restrict values to a specified range.
        </p>
      </a>

      <a
        href="/array/filter"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/filter');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          filter →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Use equals with filter for deep equality filtering.
        </p>
      </a>
    </div>
  </div>
);

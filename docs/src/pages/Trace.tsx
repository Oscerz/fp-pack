import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Trace = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      trace
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Trace intermediate values in transformation pipelines
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is trace?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        trace
      </strong>{' '}
      outputs intermediate values in a pipeline to the console and passes them through unchanged.
      It's specifically designed for tracing data transformations, making it easy to see how data flows and changes
      through each step of your pipeline.
      <br />
      <br />
      This is useful for <strong>pipeline debugging</strong>, <strong>transformation tracking</strong>,
      <strong>data flow visualization</strong>, and <strong>development diagnostics</strong>.
      <br />
      <br />
      Think of it as "show me how this data transforms at each step."
    </p>

    <CodeBlock
      language="typescript"
      code={`import { trace, pipe } from 'fp-kit';

const transformData = pipe(
  (x: number) => x * 2,
  trace('step 1: doubled'),    // Traces: "step 1: doubled 10"
  (x) => x + 5,
  trace('step 2: added 5'),    // Traces: "step 2: added 5 15"
  (x) => x / 3,
  trace('step 3: divided'),    // Traces: "step 3: divided 5"
);

transformData(5);  // Returns: 5`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function trace<T>(label?: string): (value: T) => T;

// Takes an optional label string
// Returns a function that logs the value and returns it unchanged`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Simple Tracing
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { trace } from 'fp-kit';

// Trace without label
const traceValue = trace<number>();
traceValue(42);  // Logs: 42, Returns: 42

// Trace with label
const traceWithLabel = trace<string>('current value');
traceWithLabel('hello');  // Logs: "current value hello", Returns: "hello"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      In Transformation Pipelines
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { trace, pipe } from 'fp-kit';

const calculate = pipe(
  (x: number) => x + 10,
  trace('after addition'),
  (x) => x * 2,
  trace('after multiplication'),
  (x) => x - 5,
  trace('final result')
);

calculate(5);
// Traces: "after addition 15"
// Traces: "after multiplication 30"
// Traces: "final result 25"
// Returns: 25`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Debugging Complex Transformations
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { trace, pipe, map, filter, reduce } from 'fp-kit';

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 1000, inStock: true },
  { id: 2, name: 'Mouse', price: 20, inStock: false },
  { id: 3, name: 'Keyboard', price: 80, inStock: true },
];

const getTotalPrice = pipe(
  trace<Product[]>('input products'),
  filter((p: Product) => p.inStock),
  trace('filtered in-stock products'),
  map((p: Product) => p.price),
  trace('extracted prices'),
  reduce((sum: number, price: number) => sum + price, 0),
  trace('total price')
);

getTotalPrice(products);
// Traces each transformation step
// Returns: 1080`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      String Processing Pipeline
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { trace, pipe } from 'fp-kit';

const sanitizeInput = pipe(
  trace<string>('raw input'),
  (s) => s.trim(),
  trace('trimmed'),
  (s) => s.toLowerCase(),
  trace('lowercased'),
  (s) => s.replace(/[^a-z0-9]/g, ''),
  trace('sanitized'),
  (s) => s.slice(0, 20),
  trace('truncated')
);

sanitizeInput('  Hello World! 123  ');
// Traces: "raw input   Hello World! 123  "
// Traces: "trimmed Hello World! 123"
// Traces: "lowercased hello world! 123"
// Traces: "sanitized helloworld123"
// Traces: "truncated helloworld123"
// Returns: "helloworld123"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Data Normalization
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { trace, pipe } from 'fp-kit';

interface UserInput {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
}

interface NormalizedUser {
  fullName: string;
  email: string;
  age: number;
}

const normalizeUser = pipe(
  trace<UserInput>('raw user input'),
  (user) => ({
    ...user,
    firstName: user.firstName.trim(),
    lastName: user.lastName.trim(),
    email: user.email.trim().toLowerCase(),
  }),
  trace('trimmed fields'),
  (user) => ({
    fullName: \`\${user.firstName} \${user.lastName}\`,
    email: user.email,
    age: parseInt(user.age, 10),
  }),
  trace('normalized user')
);

normalizeUser({
  firstName: '  John  ',
  lastName: '  Doe  ',
  email: '  JOHN@EXAMPLE.COM  ',
  age: '25',
});
// Traces each normalization step
// Returns: { fullName: 'John Doe', email: 'john@example.com', age: 25 }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Multi-Stage Data Processing
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { trace, pipe, groupBy } from 'fp-kit';

interface Transaction {
  id: number;
  userId: number;
  amount: number;
  type: 'debit' | 'credit';
}

const transactions: Transaction[] = [
  { id: 1, userId: 1, amount: 100, type: 'credit' },
  { id: 2, userId: 1, amount: 50, type: 'debit' },
  { id: 3, userId: 2, amount: 200, type: 'credit' },
  { id: 4, userId: 2, amount: 75, type: 'debit' },
];

const calculateBalances = pipe(
  trace<Transaction[]>('all transactions'),
  groupBy((t: Transaction) => t.userId),
  trace('grouped by user'),
  (grouped) => Object.entries(grouped).map(([userId, txns]) => ({
    userId: parseInt(userId, 10),
    balance: txns.reduce((sum, t) => {
      return t.type === 'credit' ? sum + t.amount : sum - t.amount;
    }, 0),
  })),
  trace('calculated balances')
);

calculateBalances(transactions);
// Traces: "all transactions [...]"
// Traces: "grouped by user {...}"
// Traces: "calculated balances [...]"
// Returns: [{ userId: 1, balance: 50 }, { userId: 2, balance: 125 }]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Error Debugging
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { trace, pipe } from 'fp-kit';

const riskyOperation = pipe(
  trace<string>('input'),
  (s) => s.toUpperCase(),
  trace('uppercase'),
  (s) => s.split(''),
  trace('split into chars'),
  (arr) => arr.reverse(),
  trace('reversed'),
  (arr) => arr.join(''),
  trace('joined back')
);

try {
  riskyOperation('hello');
  // Traces each step, helping identify where errors occur
} catch (error) {
  // The traces show exactly where the pipeline failed
  console.error('Pipeline failed:', error);
}`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use trace?
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. Pipeline Visibility
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          See exactly how data transforms at each step of your pipeline, making debugging trivial.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. Zero Impact on Logic
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Add or remove trace calls without changing any business logic or data flow.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. Development Aid
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Perfect for development and debugging, can be easily removed or disabled in production.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          4. Clear Step Labels
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Label each transformation step to make trace output immediately understandable.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <CodeBlock
      language="typescript"
      code={`function trace<T>(label?: string): (value: T) => T {
  return (value: T) => {
    if (label) {
      console.log(label, value);
    } else {
      console.log(value);
    }
    return value;
  };
}`}
    />

    <div class="mt-6 space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>How it works:</strong>
      </p>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>Takes an optional label string to identify the trace point</li>
        <li>Returns a function that accepts a value</li>
        <li>Logs the value to console (with label if provided)</li>
        <li>Returns the value unchanged, maintaining pipeline flow</li>
        <li>Identical to log, but semantically used for pipeline tracing</li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
    </h2>

    <div class="space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        Try these related debugging and utility functions:
      </p>
      <ul class="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/debug/log');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            log
          </a>{' '}
          - Similar to trace, for general logging in pipelines
        </li>
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/composition/tap');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            tap
          </a>{' '}
          - Execute side effects in a pipeline (trace is built on tap pattern)
        </li>
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/composition/pipe');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            pipe
          </a>{' '}
          - Compose functions left-to-right (where trace is most useful)
        </li>
      </ul>
    </div>
  </div>
);

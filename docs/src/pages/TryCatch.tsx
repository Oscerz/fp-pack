import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const TryCatch = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      tryCatch
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Handle exceptions in a functional way
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is tryCatch?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        tryCatch
      </strong>{' '}
      creates a function that safely executes a potentially throwing operation and handles errors gracefully.
      It wraps try-catch logic in a functional interface, executing the try function on success
      and the catch function on error.
      <br />
      <br />
      This converts <strong>throwing code</strong> into <strong>safe, predictable functions</strong>,
      making it ideal for <strong>error handling</strong>, <strong>parsing operations</strong>,
      <strong>API calls</strong>, and <strong>data validation</strong>.
      <br />
      <br />
      Think of it as "try this operation, but if it fails, handle it this way."
    </p>

    <CodeBlock
      language="typescript"
      code={`import { tryCatch } from 'fp-kit';

// Safely parse JSON
const safeJsonParse = tryCatch(
  (json: string) => JSON.parse(json),
  (error, json) => ({ error: error.message, input: json })
);

safeJsonParse('{"valid": true}');
// { valid: true }

safeJsonParse('invalid json');
// { error: 'Unexpected token...', input: 'invalid json' }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function tryCatch<T, R>(
  tryFn: (value: T) => R,
  catchFn: (error: Error, value: T) => R
): (value: T) => R;

// Takes a function to try and a function to handle errors
// Returns a safe function that never throws
// Both branches return the same type R`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Safe Parsing
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { tryCatch } from 'fp-kit';

// Safe JSON parsing with default
const parseJsonSafe = tryCatch(
  (json: string) => JSON.parse(json),
  () => null
);

parseJsonSafe('{"name": "John"}');  // { name: 'John' }
parseJsonSafe('invalid');            // null

// Parse with error details
const parseWithError = tryCatch(
  (json: string) => ({ success: true, data: JSON.parse(json) }),
  (error) => ({ success: false, error: error.message })
);

parseWithError('{"valid": true}');
// { success: true, data: { valid: true } }

parseWithError('not json');
// { success: false, error: 'Unexpected token...' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Safe Number Conversion
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { tryCatch } from 'fp-kit';

// Convert string to number with default
const toNumber = tryCatch(
  (str: string) => {
    const num = Number(str);
    if (isNaN(num)) throw new Error('Not a number');
    return num;
  },
  () => 0
);

toNumber('42');      // 42
toNumber('abc');     // 0
toNumber('3.14');    // 3.14

// Division with error handling
const safeDivide = tryCatch(
  ([a, b]: [number, number]) => {
    if (b === 0) throw new Error('Division by zero');
    return a / b;
  },
  (error) => ({ error: error.message, result: Infinity })
);

safeDivide([10, 2]);  // 5
safeDivide([10, 0]);  // { error: 'Division by zero', result: Infinity }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      API Response Handling
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { tryCatch } from 'fp-kit';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Success {
  success: true;
  user: User;
}

interface Failure {
  success: false;
  error: string;
}

type Result = Success | Failure;

// Parse API response safely
const parseUserResponse = tryCatch(
  (response: string): Success => {
    const user = JSON.parse(response) as User;
    if (!user.id || !user.name || !user.email) {
      throw new Error('Invalid user data');
    }
    return { success: true, user };
  },
  (error): Failure => ({
    success: false,
    error: error.message
  })
);

parseUserResponse('{"id": 1, "name": "Alice", "email": "alice@example.com"}');
// { success: true, user: {...} }

parseUserResponse('{"id": 1}');
// { success: false, error: 'Invalid user data' }

parseUserResponse('invalid json');
// { success: false, error: 'Unexpected token...' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      File Operations
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { tryCatch } from 'fp-kit';

// Safe file reading (Node.js example)
const readFileSafe = tryCatch(
  (path: string) => {
    // This would normally throw if file doesn't exist
    const fs = require('fs');
    return fs.readFileSync(path, 'utf-8');
  },
  (error, path) => ({
    error: \`Failed to read \${path}: \${error.message}\`,
    content: ''
  })
);

// Safe localStorage access
const getLocalStorage = tryCatch(
  (key: string) => {
    const value = localStorage.getItem(key);
    if (!value) throw new Error('Key not found');
    return JSON.parse(value);
  },
  (error, key) => ({
    error: \`Failed to get '\${key}': \${error.message}\`,
    data: null
  })
);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Data Validation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { tryCatch } from 'fp-kit';

interface ValidatedData {
  email: string;
  age: number;
}

const validateUserData = tryCatch(
  (input: unknown): ValidatedData => {
    if (typeof input !== 'object' || input === null) {
      throw new Error('Input must be an object');
    }

    const data = input as Record<string, unknown>;

    if (typeof data.email !== 'string' || !data.email.includes('@')) {
      throw new Error('Invalid email');
    }

    if (typeof data.age !== 'number' || data.age < 0) {
      throw new Error('Invalid age');
    }

    return { email: data.email, age: data.age };
  },
  (error) => ({
    email: '',
    age: 0,
    validationError: error.message
  })
);

validateUserData({ email: 'user@example.com', age: 25 });
// { email: 'user@example.com', age: 25 }

validateUserData({ email: 'invalid', age: 25 });
// { email: '', age: 0, validationError: 'Invalid email' }

validateUserData('not an object');
// { email: '', age: 0, validationError: 'Input must be an object' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      URL Parsing
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { tryCatch } from 'fp-kit';

interface ParsedUrl {
  valid: true;
  protocol: string;
  host: string;
  pathname: string;
}

interface InvalidUrl {
  valid: false;
  error: string;
  input: string;
}

const parseUrl = tryCatch(
  (urlString: string): ParsedUrl => {
    const url = new URL(urlString);
    return {
      valid: true,
      protocol: url.protocol,
      host: url.host,
      pathname: url.pathname
    };
  },
  (error, input): InvalidUrl => ({
    valid: false,
    error: error.message,
    input
  })
);

parseUrl('https://example.com/path');
// { valid: true, protocol: 'https:', host: 'example.com', pathname: '/path' }

parseUrl('not a url');
// { valid: false, error: 'Invalid URL', input: 'not a url' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      With pipe for Processing Chains
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, tryCatch } from 'fp-kit';

interface ProcessedData {
  parsed: unknown;
  validated: boolean;
  transformed?: string;
  error?: string;
}

// Chain multiple operations that might fail
const processData = pipe(
  // Step 1: Parse JSON
  tryCatch(
    (json: string) => ({ parsed: JSON.parse(json), validated: false }),
    (error) => ({ parsed: null, validated: false, error: error.message })
  ),
  // Step 2: Transform if valid
  (data: ProcessedData) => {
    if (data.error) return data;

    return tryCatch(
      (d: ProcessedData) => ({
        ...d,
        validated: true,
        transformed: JSON.stringify(d.parsed, null, 2)
      }),
      (error) => ({
        ...data,
        error: error.message
      })
    )(data);
  }
);

processData('{"name": "John"}');
// { parsed: { name: 'John' }, validated: true, transformed: '...'}

processData('invalid');
// { parsed: null, validated: false, error: 'Unexpected token...' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Array Processing with Error Handling
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { tryCatch } from 'fp-kit';

// Process each item safely
const processItem = tryCatch(
  (item: string) => {
    const parsed = JSON.parse(item);
    if (!parsed.id) throw new Error('Missing id');
    return { success: true, data: parsed };
  },
  (error, item) => ({
    success: false,
    error: error.message,
    original: item
  })
);

const jsonStrings = [
  '{"id": 1, "name": "Alice"}',
  'invalid json',
  '{"id": 2, "name": "Bob"}',
  '{"name": "Charlie"}'  // missing id
];

jsonStrings.map(processItem);
// [
//   { success: true, data: { id: 1, name: 'Alice' } },
//   { success: false, error: 'Unexpected token...', original: 'invalid json' },
//   { success: true, data: { id: 2, name: 'Bob' } },
//   { success: false, error: 'Missing id', original: '{"name": "Charlie"}' }
// ]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use tryCatch?
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. No Throwing Functions
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Convert error-throwing code into functions that always return a value,
          making your code more predictable and easier to compose.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. Explicit Error Handling
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Error handling is built into the function definition, making it clear how errors are handled
          without searching for distant try-catch blocks.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. Composable
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Works seamlessly with pipe and compose since it never throws,
          allowing you to build complex error-handling pipelines.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          4. Type-Safe Errors
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          TypeScript can infer the return type includes both success and error cases,
          making error handling type-safe and explicit.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <CodeBlock
      language="typescript"
      code={`function tryCatch<T, R>(
  tryFn: (value: T) => R,
  catchFn: (error: Error, value: T) => R
): (value: T) => R {
  return (value: T) => {
    try {
      return tryFn(value);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      return catchFn(error, value);
    }
  };
}`}
    />

    <div class="mt-6 space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>How it works:</strong>
      </p>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>Takes a function to try (tryFn) and a function to handle errors (catchFn)</li>
        <li>Returns a new function that wraps the try-catch logic</li>
        <li>Executes tryFn and returns its result on success</li>
        <li>On error, catches the exception and converts it to an Error object if needed</li>
        <li>Calls catchFn with the error and original value</li>
        <li>Both branches must return the same type R</li>
        <li>Never throws - always returns a value</li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
    </h2>

    <div class="space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        Try these related control flow functions:
      </p>
      <ul class="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/control/guard');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            guard
          </a>{' '}
          - Return default value when predicate fails
        </li>
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/control/ifElse');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            ifElse
          </a>{' '}
          - Choose between two different transformations based on a condition
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
          - Compose functions from left to right
        </li>
      </ul>
    </div>
  </div>
);

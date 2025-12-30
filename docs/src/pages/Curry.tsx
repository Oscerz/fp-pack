import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Curry = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      curry
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Transform functions to support partial application
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is curry?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        curry
      </strong>{' '}
      transforms a multi-parameter function into a series of single-parameter functions.
      <br />
      <br />
      This enables <strong>partial application</strong>: you can supply arguments one at a time,
      and get back specialized functions.
      <br />
      <br />
      Curried functions are extremely composable and work perfectly with pipe and compose.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { curry } from 'fp-kit';

// Regular function
const add = (a: number, b: number) => a + b;
add(2, 3);  // 5

// Curried version
const curriedAdd = curry(add);
curriedAdd(2)(3);        // 5
curriedAdd(2, 3);        // 5 (also works!)

// Partial application
const add2 = curriedAdd(2);
add2(3);  // 5
add2(10); // 12`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`// Supports 2-5 parameter functions with full type inference
function curry<A, B, R>(fn: (a: A, b: B) => R): Curry2<A, B, R>;
function curry<A, B, C, R>(fn: (a: A, b: B, c: C) => R): Curry3<A, B, C, R>;
function curry<A, B, C, D, R>(fn: (a: A, b: B, c: C, d: D) => R): Curry4<A, B, C, D, R>;
function curry<A, B, C, D, E, R>(fn: (a: A, b: B, c: C, d: D, e: E) => R): Curry5<A, B, C, D, E, R>;

// Example: Curry2 type allows flexible calling
type Curry2<A, B, R> = {
  (a: A): (b: B) => R;      // Partial: one arg at a time
  (a: A, b: B): R;          // Full: all args at once
};`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      fp-kit's curry provides excellent TypeScript support with full type inference for
      functions with 2-5 parameters.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Simple Math Functions
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { curry } from 'fp-kit';

const multiply = curry((a: number, b: number) => a * b);
const subtract = curry((a: number, b: number) => a - b);
const divide = curry((a: number, b: number) => a / b);

// Use them fully applied
multiply(3, 4);     // 12
subtract(10, 3);    // 7
divide(20, 4);      // 5

// Or partially applied
const double = multiply(2);
const triple = multiply(3);
const half = divide(2);

double(5);   // 10
triple(5);   // 15
half(10);    // 5`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      String Utilities
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { curry } from 'fp-kit';

const replace = curry((search: string, replacement: string, text: string) =>
  text.replace(new RegExp(search, 'g'), replacement)
);

const split = curry((separator: string, text: string) =>
  text.split(separator)
);

const join = curry((separator: string, arr: string[]) =>
  arr.join(separator)
);

// Create specialized functions
const replaceSpaces = replace(' ', '-');
const splitByComma = split(',');
const joinWithPipe = join('|');

replaceSpaces('hello world');        // "hello-world"
splitByComma('a,b,c');               // ["a", "b", "c"]
joinWithPipe(['x', 'y', 'z']);       // "x|y|z"`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Array Filtering and Mapping
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { curry } from 'fp-kit';

const map = curry(<T, U>(fn: (x: T) => U, arr: T[]) => arr.map(fn));
const filter = curry(<T>(pred: (x: T) => boolean, arr: T[]) => arr.filter(pred));

const double = (n: number) => n * 2;
const isEven = (n: number) => n % 2 === 0;

// Create specialized functions
const doubleAll = map(double);
const filterEvens = filter(isEven);

const numbers = [1, 2, 3, 4, 5];

doubleAll(numbers);      // [2, 4, 6, 8, 10]
filterEvens(numbers);    // [2, 4]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Object Property Access
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { curry } from 'fp-kit';

const prop = curry(<T, K extends keyof T>(key: K, obj: T) => obj[key]);

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

// Create property extractors
const getName = prop('name');
const getEmail = prop('email');

users.map(getName);   // ["Alice", "Bob"]
users.map(getEmail);  // ["alice@example.com", "bob@example.com"]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Validation Functions
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { curry } from 'fp-kit';

const hasMinLength = curry((min: number, str: string) => str.length >= min);
const hasMaxLength = curry((max: number, str: string) => str.length <= max);
const matches = curry((pattern: RegExp, str: string) => pattern.test(str));

// Create validators
const isValidUsername = hasMinLength(3);
const isValidPassword = hasMinLength(8);
const isEmail = matches(/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/);

isValidUsername('ab');           // false
isValidUsername('alice');        // true
isValidPassword('pass');         // false
isValidPassword('password123');  // true
isEmail('test@example.com');     // true
isEmail('invalid');              // false`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Combining curry with pipe
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      curry shines when combined with pipe or compose. Partially applied curried functions
      create clean, reusable pipelines:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipe, curry } from 'fp-kit';

const add = curry((a: number, b: number) => a + b);
const multiply = curry((a: number, b: number) => a * b);
const subtract = curry((a: number, b: number) => a - b);

// Build a calculation pipeline
const calculate = pipe(
  add(10),        // Add 10
  multiply(2),    // Multiply by 2
  subtract(5)     // Subtract 5
);

calculate(5);   // 25
// Flow: 5 → +10 → 15 → *2 → 30 → -5 → 25`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Data Processing Pipeline
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, curry } from 'fp-kit';

const filter = curry(<T>(pred: (x: T) => boolean, arr: T[]) => arr.filter(pred));
const map = curry(<T, U>(fn: (x: T) => U, arr: T[]) => arr.map(fn));
const reduce = curry(<T, R>(fn: (acc: R, x: T) => R, init: R, arr: T[]) =>
  arr.reduce(fn, init)
);

interface Product {
  name: string;
  price: number;
  inStock: boolean;
}

const products: Product[] = [
  { name: 'Laptop', price: 1000, inStock: true },
  { name: 'Mouse', price: 25, inStock: false },
  { name: 'Keyboard', price: 75, inStock: true },
];

const getTotalPriceOfAvailableProducts = pipe(
  filter((p: Product) => p.inStock),
  map((p: Product) => p.price),
  reduce((sum: number, price: number) => sum + price, 0)
);

getTotalPriceOfAvailableProducts(products);  // 1075`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      URL Builder
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, curry } from 'fp-kit';

const setProtocol = curry((protocol: string, url: string) =>
  \`\${protocol}://\${url}\`
);
const addPath = curry((path: string, url: string) =>
  \`\${url}/\${path}\`
);
const addQueryParam = curry((key: string, value: string, url: string) =>
  \`\${url}?\${key}=\${value}\`
);

const buildApiUrl = pipe(
  setProtocol('https'),
  addPath('api/v1'),
  addPath('users'),
  addQueryParam('page', '1')
);

buildApiUrl('example.com');
// "https://example.com/api/v1/users?page=1"`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Multiple Parameter Application
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      fp-kit's curry is flexible - you can provide multiple parameters at once:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { curry } from 'fp-kit';

const add3 = curry((a: number, b: number, c: number) => a + b + c);

// All equivalent:
add3(1)(2)(3);      // 6 - One at a time
add3(1, 2)(3);      // 6 - Two, then one
add3(1)(2, 3);      // 6 - One, then two
add3(1, 2, 3);      // 6 - All at once

// Partial application
const add1and2 = add3(1, 2);
add1and2(3);        // 6
add1and2(10);       // 13`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Curry?
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          1. Reusability
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          Create specialized versions of general functions. Instead of writing new functions,
          partially apply existing ones.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. Composability
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          Curried functions work beautifully with pipe and compose. Partial application
          creates perfectly shaped functions for pipelines.
        </p>
      </div>

      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          3. Configuration
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          Configure functions once with common parameters, then use the specialized version
          throughout your code.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          4. Readability
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          Named partially applied functions make code more self-documenting than inline
          parameters.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      curry accumulates arguments until it has enough to call the original function:
    </p>

    <CodeBlock
      language="typescript"
      code={`function curry(fn: (...args: any[]) => any, ...args: any[]): any {
  const curried = (accumulated: any[]) => {
    return accumulated.length >= fn.length
      ? fn(...accumulated)
      : (...nextArgs: any[]) => curried([...accumulated, ...nextArgs]);
  };

  return args.length === 0 ? curried([]) : curried(args);
}`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      The implementation checks <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">fn.length</code> (the arity)
      to know when all parameters have been provided.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Related Functions
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/composition/pipe"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipe');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          pipe →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Combine curried functions in readable pipelines.
        </p>
      </a>

      <a
        href="/composition/partial"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/partial');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          partial →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Alternative approach to partial application.
        </p>
      </a>

      <a
        href="/composition/flip"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/flip');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          flip →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Reverse argument order for better composition.
        </p>
      </a>
    </div>
  </div>
);

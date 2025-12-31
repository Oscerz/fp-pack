import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Complement = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      complement
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Create the logical negation of a predicate function
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is complement?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        complement
      </strong>{' '}
      takes a predicate function and returns a new function that returns the opposite boolean value.
      It's useful for creating negative conditions without writing repetitive negation logic.
      The returned function accepts the same arguments as the original predicate.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { complement } from 'fp-kit';

const isEven = (n: number) => n % 2 === 0;
const isOdd = complement(isEven);

isOdd(3); // true
isOdd(4); // false`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function complement<T extends any[]>(
  predicate: (...args: T) => boolean
): (...args: T) => boolean;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Create Negative Filters
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { complement, filter } from 'fp-kit';

const isNil = (value: unknown) => value == null;
const isNotNil = complement(isNil);

const data = [1, null, 'hello', undefined, 42];
const cleaned = filter(isNotNil, data);
// [1, 'hello', 42]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Negate Complex Predicates
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { complement, filter } from 'fp-kit';

interface User {
  name: string;
  active: boolean;
  role: string;
}

const isAdmin = (user: User) => user.role === 'admin';
const isNotAdmin = complement(isAdmin);

const users: User[] = [
  { name: 'Alice', active: true, role: 'admin' },
  { name: 'Bob', active: true, role: 'user' },
  { name: 'Charlie', active: false, role: 'user' },
];

const regularUsers = filter(isNotAdmin, users);
// [{ name: 'Bob', ... }, { name: 'Charlie', ... }]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Multi-Argument Predicates
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { complement } from 'fp-kit';

const inRange = (min: number, max: number, value: number) =>
  value >= min && value <= max;

const outOfRange = complement(inRange);

outOfRange(10, 20, 5);  // true (5 is not in [10, 20])
outOfRange(10, 20, 15); // false (15 is in [10, 20])
outOfRange(10, 20, 25); // true (25 is not in [10, 20])`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Composition with Pipes
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, complement, filter, map } from 'fp-kit';

const isEmpty = (str: string) => str.trim().length === 0;
const isNotEmpty = complement(isEmpty);

const processMessages = pipe(
  filter(isNotEmpty),           // Remove empty strings
  map((s: string) => s.trim()), // Clean whitespace
  map((s: string) => s.toUpperCase())
);

processMessages(['  ', 'hello', '', 'world', '   ']);
// ['HELLO', 'WORLD']`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Related Functions
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/array/filter"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/filter');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          filter →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Select elements matching a predicate - commonly used with complement.
        </p>
      </a>

      <a
        href="/control/when"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/when');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          when →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Apply function conditionally when predicate is true.
        </p>
      </a>

      <a
        href="/control/unless"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/unless');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          unless →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Apply function conditionally when predicate is false - alternative to complement.
        </p>
      </a>
    </div>
  </div>
);

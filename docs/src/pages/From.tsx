import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const From = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      from
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Ignore input and return a fixed value
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is from?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/20 px-2 py-1 rounded">
        from
      </strong>{' '}
      turns any value into a <strong>unary function</strong> that ignores its input and always
      returns that value. It is purpose-built for <strong>pipes</strong> and <strong>branch
      functions</strong> where a function is required but you want a fixed result.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { from } from 'fp-pack';

const toGuest = from({ role: 'guest' });
toGuest({ role: 'admin' }); // { role: 'guest' }

const alwaysZero = from(0);
alwaysZero('ignored'); // 0`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function from<T>(value: T): <I>(input: I) => T;`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Because it returns a unary function, it fits cleanly into pipe chains and higher-order
      utilities that expect a function taking one argument.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Pipeline-Friendly Constants
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, from, map } from 'fp-pack';

const buildLabels = pipe(
  from(['todo', 'done']),
  map((label: string) => label.toUpperCase())
);

buildLabels({ any: 'input' }); // ['TODO', 'DONE']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Branching with ifElse
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { ifElse, from } from 'fp-pack';

const label = ifElse(
  (score: number) => score >= 60,
  from('pass'),
  from('fail')
);

label(72); // 'pass'
label(40); // 'fail'`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Map to a Fixed Value
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { map, from } from 'fp-pack';

const flags = map(from(false), [1, 2, 3]);
// [false, false, false]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      from vs constant
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">constant</code> returns a zero-arity function, while{' '}
      <code class="text-sm">from</code> returns a unary function. Use{' '}
      <code class="text-sm">from</code> when a pipeline step expects a function that takes input.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { constant, from, map } from 'fp-pack';

const constantZero = constant(0);
const fromZero = from(0);

map(fromZero, [1, 2, 3]); // ok
// map(constantZero, [1, 2, 3]); // TypeScript mismatch (0-arity)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">from</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/composition/from.ts"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      View on GitHub
    </a>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Related Functions
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/composition/constant"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/constant');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-emerald-600 dark:text-emerald-400 mb-2">
          constant →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Always return a fixed value, regardless of arguments.
        </p>
      </a>

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
          Return the input unchanged when you need a no-op step.
        </p>
      </a>

      <a
        href="/control/ifElse"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/ifElse');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          ifElse →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Use from for constant branches in ifElse pipelines.
        </p>
      </a>
    </div>
  </div>
);

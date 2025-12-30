import { navigateTo } from '@/store';
import { CodeBlock } from '@/components/CodeBlock';

export const Home = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
      fp-kit
    </h1>

    <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
      A practical, pipe-first functional toolkit for modern TypeScript.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      Core Philosophy
    </h2>

    <ul class="space-y-4 text-gray-700 dark:text-gray-300 mb-8">
      <li class="flex items-start">
        <span class="text-blue-500 font-bold mr-3 text-2xl">🔄</span>
        <div>
          <strong class="text-lg">Pipe-First Composition</strong>
          <p class="mt-1">Built around <code class="text-sm">pipe</code> and <code class="text-sm">pipeAsync</code> for clean, left-to-right data transformations. Follow standard pipeline patterns that developers already know.</p>
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-purple-500 font-bold mr-3 text-2xl">⚡</span>
        <div>
          <strong class="text-lg">SideEffect Pattern</strong>
          <p class="mt-1">No monads, no heavy abstractions. Use the <code class="text-sm">SideEffect</code> interface to handle errors and side effects declaratively within your pipe chains, without breaking the flow.</p>
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-green-500 font-bold mr-3 text-2xl">💧</span>
        <div>
          <strong class="text-lg">Stream Processing</strong>
          <p class="mt-1">Efficient lazy evaluation with <code class="text-sm">stream/*</code> functions. Handle both <code class="text-sm">Iterable</code> and <code class="text-sm">AsyncIterable</code> for memory-conscious operations on large datasets.</p>
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-orange-500 font-bold mr-3 text-2xl">🔀</span>
        <div>
          <strong class="text-lg">Async First-Class</strong>
          <p class="mt-1"><code class="text-sm">pipeAsync</code> makes async flow control practical and composable. Mix sync and async functions naturally in your pipelines.</p>
        </div>
      </li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      Why fp-kit?
    </h2>

    <ul class="space-y-3 text-gray-700 dark:text-gray-300">
      <li class="flex items-start">
        <span class="text-blue-500 font-bold mr-3">🎯</span>
        <div>
          <strong>Practical & Real-World</strong> - Solutions for everyday async operations, data pipelines, and error handling that actually ship
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-blue-500 font-bold mr-3">🚫</span>
        <div>
          <strong>No Academic FP</strong> - No monads, functors, or category theory. Just useful patterns that solve real problems
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-blue-500 font-bold mr-3">👥</span>
        <div>
          <strong>TypeScript Native</strong> - Written for TypeScript developers with excellent type inference and minimal annotations
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-blue-500 font-bold mr-3">🪶</span>
        <div>
          <strong>Lightweight & Modular</strong> - Zero dependencies, fully tree-shakeable, ~5KB footprint
        </div>
      </li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      Key Features
    </h2>

    <div class="grid gap-4 md:gap-6 mt-6 mb-8">
      <div class="block p-4 md:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800 overflow-hidden">
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2 md:mb-3">
          Standard Pipe Operations
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3">
          Familiar <code class="text-xs md:text-sm">pipe</code> and <code class="text-xs md:text-sm">compose</code> patterns that follow industry-standard conventions.
        </p>
        <CodeBlock
          language="typescript"
          code={`const result = pipe(
  filter(user => user.active),
  map(user => user.name),
  take(10)
)(users);`}
        />
      </div>

      <div class="block p-4 md:p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800 overflow-hidden">
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2 md:mb-3">
          SideEffect for Error Handling
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3">
          Handle errors within pipes without breaking composition. No try-catch, no monads.
        </p>
        <CodeBlock
          language="typescript"
          code={`const process = pipe(
  validate,
  (data) => data.ok
    ? data
    : SideEffect.of(() => throw Error()),
  transform
);`}
        />
      </div>

      <div class="block p-4 md:p-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg border border-green-200 dark:border-green-800 overflow-hidden">
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2 md:mb-3">
          Lazy Stream Processing
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3">
          Memory-efficient operations on large datasets with full <code class="text-xs md:text-sm">AsyncIterable</code> support.
        </p>
        <CodeBlock
          language="typescript"
          code={`import * as Stream from 'fp-kit/stream';

const first100 = pipe(
  Stream.filter(n => n % 2 === 0),
  Stream.take(100),
  Stream.toArray
)(Stream.range(1, 1000000));`}
        />
      </div>

      <div class="block p-4 md:p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200 dark:border-orange-800 overflow-hidden">
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2 md:mb-3">
          Async Pipeline with pipeAsync
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3">
          Compose async operations naturally. Mix sync and async functions in the same pipeline.
        </p>
        <CodeBlock
          language="typescript"
          code={`const fetchUser = pipeAsync(
  async (id) => fetch(\`/api/\${id}\`),
  (res) => res.json(),
  (data) => data.user
);`}
        />
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      Get Started
    </h2>

    <p class="text-gray-700 dark:text-gray-300 mb-6">
      Explore the core composition utilities to build powerful, type-safe pipelines:
    </p>

    <div class="grid gap-6 mt-6">
      <a
        href="/composition/pipe"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipe');
        }}
        class="block p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-colors cursor-pointer"
      >
        <h3 class="text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          pipe →
        </h3>
        <p class="text-gray-700 dark:text-gray-300">
          Compose functions from left to right for readable data transformations.
        </p>
      </a>

      <a
        href="/composition/compose"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/compose');
        }}
        class="block p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-colors cursor-pointer"
      >
        <h3 class="text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          compose →
        </h3>
        <p class="text-gray-700 dark:text-gray-300">
          Compose functions from right to left in traditional mathematical style.
        </p>
      </a>

      <a
        href="/composition/curry"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/curry');
        }}
        class="block p-6 bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20 rounded-lg border border-pink-200 dark:border-pink-800 hover:border-pink-400 dark:hover:border-pink-600 transition-colors cursor-pointer"
      >
        <h3 class="text-xl font-medium text-pink-600 dark:text-pink-400 mb-2">
          curry →
        </h3>
        <p class="text-gray-700 dark:text-gray-300">
          Transform functions to support partial application for flexible composition.
        </p>
      </a>
    </div>
  </div>
);

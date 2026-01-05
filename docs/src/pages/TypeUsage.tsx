import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const TypeUsage = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      Type Usage
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      fp-pack exposes a small set of public helper types so you can keep inference when composing,
      currying, or building custom utilities.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Quick Imports
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Prefer <code class="text-sm">import type</code> so type-only helpers do not add runtime
      bundles.
    </p>

    <CodeBlock
      language="typescript"
      code={`import type { Curried, Curry3, FromFn, MatchHandlers, PathKey } from 'fp-pack';
import type { AnyIterable, AnyIterableInput, PromiseLikeValue } from 'fp-pack/stream';`}
    />

    <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Type Declarations Location
      </h3>
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        When you need to inspect the generated type declarations directly, check these paths.
      </p>
      <CodeBlock
        language="text"
        code={`# package install
node_modules/fp-pack/dist/index.d.ts
node_modules/fp-pack/dist/stream/index.d.ts

# repository build
dist/index.d.ts
dist/stream/index.d.ts`}
      />
      <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
        These paths are build outputs and can shift slightly between versions.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Curried Types
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { curry } from 'fp-pack';
import type { Curried, Curry3 } from 'fp-pack';

const add3 = (a: number, b: number, c: number) => a + b + c;

const curriedAdd3: Curried<typeof add3> = curry(add3);
const curriedAdd3Alt: Curry3<typeof add3> = curry(add3);

curriedAdd3(1)(2)(3);
curriedAdd3Alt(1, 2)(3);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      from-Based Pipelines
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { from, pipeSideEffectStrict, SideEffect } from 'fp-pack';
import type { FromFn } from 'fp-pack';

const start: FromFn<number> = from(3);

const pipeline = pipeSideEffectStrict(
  start,
  (value) => value + 1,
  (value) => (value > 3 ? value : SideEffect.of(() => 'LOW' as const))
);

const result = pipeline();`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      When the first function is <code class="text-sm">from</code>-based, the pipeline can be
      called with or without an input value.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Stream Input Types
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { toAsync } from 'fp-pack/stream';
import type { AnyIterableInput, PromiseLikeValue } from 'fp-pack/stream';

async function normalize<T>(input: AnyIterableInput<PromiseLikeValue<T>>) {
  const result: T[] = [];
  for await (const item of toAsync(input)) {
    result.push(item);
  }
  return result;
}`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Use <code class="text-sm">AnyIterable</code> when you need to describe a return type that can
      be either <code class="text-sm">Iterable</code> or <code class="text-sm">AsyncIterable</code>.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      PathKey for Object Paths
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { assocPath, path } from 'fp-pack';
import type { PathKey } from 'fp-pack';

const userPath: PathKey[] = ['users', 0, 'name'];
const name = path<string>(userPath, data);

const next = assocPath(userPath, 'Alice', data);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      matchSideEffect Handlers
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { matchSideEffect, SideEffect } from 'fp-pack';
import type { MatchHandlers } from 'fp-pack';

type Result = number | SideEffect<'EMPTY'>;

const handlers: MatchHandlers<number, string, string> = {
  value: (value) => \`value:\${value}\`,
  effect: (effect) => effect.label ?? 'EMPTY'
};

const result: Result = 10;
const message = matchSideEffect(result, handlers);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Related Guides
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/composition/curry"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/curry');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-emerald-600 dark:text-emerald-400 mb-2">
          curry →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Curried helpers and data-last usage.
        </p>
      </a>

      <a
        href="/composition/from"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/from');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          from →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Start pipelines with fixed values.
        </p>
      </a>

      <a
        href="/stream/toAsync"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/toAsync');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          toAsync →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Normalize stream inputs to async iterables.
        </p>
      </a>
    </div>
  </div>
);

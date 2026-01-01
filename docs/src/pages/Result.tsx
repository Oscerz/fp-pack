import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Result = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      result
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Wrap a function call to capture success or failure
    </p>

    <CodeBlock
      language="typescript"
      code={`import { result } from 'fp-kit';

const parseJson = (input: string) => result(() => JSON.parse(input));

parseJson('{"ok":true}'); // { ok: true, value: { ok: true } }
parseJson('oops');        // { ok: false, error: SyntaxError }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Related Functions
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/nullable/maybe');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          maybe
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Safely transform nullable values
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/nullable/fold');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          fold
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Handle nullish values with fallback or transform
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/nullable/getOrElse');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          getOrElse
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Provide a default value for nullish inputs
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/nullable/mapMaybe');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          mapMaybe
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Drop null/undefined results while mapping
        </p>
      </div>
    </div>
  </div>
);

import { CodeBlock } from '@/components/CodeBlock';

export const Complement = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      complement
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Negate a predicate function
    </p>

    <CodeBlock
      language="typescript"
      code={`import { complement, filter } from 'fp-kit';

const isNil = (value: unknown) => value == null;
const isNotNil = complement(isNil);

isNotNil(null); // false
isNotNil('ok'); // true

filter(isNotNil, [1, null, 2]); // [1, 2]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function complement<T extends any[]>(predicate: (...args: T) => boolean, ...args: T): boolean;
function complement<T extends any[]>(predicate: (...args: T) => boolean): (...args: T) => boolean;`}
    />
  </div>
);

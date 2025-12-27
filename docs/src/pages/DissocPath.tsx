import { CodeBlock } from '@/components/CodeBlock';

export const DissocPath = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      dissocPath
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Remove a value at a nested path immutably
    </p>

    <CodeBlock
      language="typescript"
      code={`import { dissocPath } from 'fp-kit';

dissocPath(['a', 'b', 'c'], { a: { b: { c: 42 } } });
// { a: { b: {} } }

dissocPath(['a', 1], { a: [1, 2, 3] });
// { a: [1, 3] }`}
    />
  </div>
);

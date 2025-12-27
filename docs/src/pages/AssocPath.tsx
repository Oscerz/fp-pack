import { CodeBlock } from '@/components/CodeBlock';

export const AssocPath = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      assocPath
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Set a value at a nested path immutably
    </p>

    <CodeBlock
      language="typescript"
      code={`import { assocPath } from 'fp-kit';

assocPath(['a', 'b', 'c'], 42, { a: { b: { c: 0 } } });
// { a: { b: { c: 42 } } }

assocPath(['a', 'b', 'c'], 42, { a: 5 });
// { a: { b: { c: 42 } } }

assocPath(['a', 1, 'c'], 42, { a: [] });
// { a: [undefined, { c: 42 }] }

assocPath(['a', -1], 42, { a: [1, 2] });
// { a: [1, 42] }`}
    />
  </div>
);

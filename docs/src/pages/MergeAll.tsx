import { CodeBlock } from '@/components/CodeBlock';

export const MergeAll = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      mergeAll
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Shallow-merge an array of objects
    </p>

    <CodeBlock
      language="typescript"
      code={`import { mergeAll } from 'fp-kit';

mergeAll([{ id: 1 }, { name: 'Ada' }, { id: 2 }]);
// { id: 2, name: 'Ada' }`}
    />
  </div>
);

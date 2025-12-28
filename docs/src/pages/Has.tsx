import { CodeBlock } from '@/components/CodeBlock';

export const Has = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      has
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Check whether an object has an own property
    </p>

    <CodeBlock
      language="typescript"
      code={`import { has } from 'fp-kit';

has('id', { id: 1 });     // true
has('name', { id: 1 });   // false`}
    />
  </div>
);

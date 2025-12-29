import { CodeBlock } from '@/components/CodeBlock';

export const PropOr = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      propOr
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Read a property with a default fallback
    </p>

    <CodeBlock
      language="typescript"
      code={`import { propOr } from 'fp-kit';

const user = { id: 1, name: 'Ada' };

propOr('unknown', 'name', user); // 'Ada'
propOr('unknown', 'age', user);  // 'unknown'`}
    />
  </div>
);

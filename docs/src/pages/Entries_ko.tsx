import { CodeBlock } from '@/components/CodeBlock';

export const Entries_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      entries
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      객체를 [키, 값] 쌍 배열로 변환합니다
    </p>

    <CodeBlock
      language="typescript"
      code={`import { entries } from 'fp-kit';

entries({ id: 1, name: 'A' });
// [['id', 1], ['name', 'A']]`}
    />
  </div>
);

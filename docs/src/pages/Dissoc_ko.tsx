import { CodeBlock } from '@/components/CodeBlock';

export const Dissoc_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      dissoc
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      객체 속성 또는 배열 인덱스를 불변으로 제거합니다
    </p>

    <CodeBlock
      language="typescript"
      code={`import { dissoc } from 'fp-kit';

dissoc('name', { id: 1, name: 'A' });
// { id: 1 }

dissoc(1, ['a', 'b', 'c']);
// ['a', 'c']`}
    />
  </div>
);

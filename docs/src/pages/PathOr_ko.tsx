import { CodeBlock } from '@/components/CodeBlock';

export const PathOr_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      pathOr
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      기본값과 함께 중첩 값을 안전하게 조회합니다
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pathOr } from 'fp-kit';

const user = { profile: { name: 'Ada' } };

pathOr('unknown', ['profile', 'name'], user);  // 'Ada'
pathOr('unknown', ['profile', 'age'], user);   // 'unknown'`}
    />
  </div>
);

import { CodeBlock } from '@/components/CodeBlock';

export const Evolve_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      evolve
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      스키마 함수를 이용해 객체 값을 변환합니다
    </p>

    <CodeBlock
      language="typescript"
      code={`import { evolve } from 'fp-kit';

const user = { id: 1, name: 'A' };
const updated = evolve({
  id: (value: number) => value + 1,
  name: (value: string) => value.toLowerCase(),
}, user);

// { id: 2, name: "a" }`}
    />
  </div>
);

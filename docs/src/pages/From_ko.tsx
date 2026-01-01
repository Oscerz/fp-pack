import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const From_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      from
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      입력을 무시하고 고정 값을 반환
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      from이란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/20 px-2 py-1 rounded">
        from
      </strong>{' '}
      은 어떤 값이든 <strong>단일 인자 함수</strong>로 감싸 입력을 무시하고 항상 동일한 값을 반환합니다.
      파이프나 분기 함수처럼 “입력을 받는 함수”가 필요한 위치에서 상수를 쓰고 싶을 때
      가장 자연스럽습니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { from } from 'fp-pack';

const toGuest = from({ role: 'guest' });
toGuest({ role: 'admin' }); // { role: 'guest' }

const alwaysZero = from(0);
alwaysZero('ignored'); // 0`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function from<T>(value: T): <I>(input: I) => T;`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      반환값이 단일 인자 함수이므로 파이프 체인이나 고차 함수에서 타입이 자연스럽게 맞습니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      파이프 친화 상수
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, from, map } from 'fp-pack';

const buildLabels = pipe(
  from(['todo', 'done']),
  map((label: string) => label.toUpperCase())
);

buildLabels({ any: 'input' }); // ['TODO', 'DONE']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      ifElse 분기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { ifElse, from } from 'fp-pack';

const label = ifElse(
  (score: number) => score >= 60,
  from('pass'),
  from('fail')
);

label(72); // 'pass'
label(40); // 'fail'`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      고정 값으로 매핑
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { map, from } from 'fp-pack';

const flags = map(from(false), [1, 2, 3]);
// [false, false, false]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      from vs constant
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">constant</code>는 0-arity 함수, <code class="text-sm">from</code>은 unary 함수입니다.
      입력을 받는 함수가 필요한 곳에서는 <code class="text-sm">from</code>이 더 자연스럽습니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { constant, from, map } from 'fp-pack';

const constantZero = constant(0);
const fromZero = from(0);

map(fromZero, [1, 2, 3]); // ok
// map(constantZero, [1, 2, 3]); // TypeScript mismatch (0-arity)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">from</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/composition/from.ts"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      View on GitHub
    </a>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      관련 함수
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/composition/constant"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/constant');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-emerald-600 dark:text-emerald-400 mb-2">
          constant →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          인자와 무관하게 항상 같은 값을 반환합니다.
        </p>
      </a>

      <a
        href="/composition/identity"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/identity');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          identity →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          입력 값을 그대로 반환하는 no-op 함수입니다.
        </p>
      </a>

      <a
        href="/control/ifElse"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/ifElse');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          ifElse →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          from으로 고정 분기를 쉽게 만들 수 있습니다.
        </p>
      </a>
    </div>
  </div>
);

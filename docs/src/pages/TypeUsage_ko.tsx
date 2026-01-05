import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const TypeUsage_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      타입 활용
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      fp-pack이 공개하는 타입들을 활용하면 조합, 커링, 커스텀 유틸 작성 시 타입 추론을 깔끔하게 유지할 수 있습니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      빠른 import
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      타입 전용 유틸은 <code class="text-sm">import type</code>로 가져오면 런타임 번들에 영향이 없습니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import type { Curried, Curry3, FromFn, MatchHandlers, PathKey } from 'fp-pack';
import type { AnyIterable, AnyIterableInput, PromiseLikeValue } from 'fp-pack/stream';`}
    />

    <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        타입 선언 파일 위치
      </h3>
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        생성된 타입 선언을 직접 확인하려면 아래 경로를 참고하세요.
      </p>
      <CodeBlock
        language="text"
        code={`# 패키지 설치 기준
node_modules/fp-pack/dist/index.d.ts
node_modules/fp-pack/dist/stream/index.d.ts

# 레포지토리 빌드 기준
dist/index.d.ts
dist/stream/index.d.ts`}
      />
      <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
        빌드 산출물 경로이므로 버전에 따라 약간 변동될 수 있습니다.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      커리 타입
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { curry } from 'fp-pack';
import type { Curried, Curry3 } from 'fp-pack';

const add3 = (a: number, b: number, c: number) => a + b + c;

const curriedAdd3: Curried<typeof add3> = curry(add3);
const curriedAdd3Alt: Curry3<typeof add3> = curry(add3);

curriedAdd3(1)(2)(3);
curriedAdd3Alt(1, 2)(3);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      from 기반 파이프
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { from, pipeSideEffectStrict, SideEffect } from 'fp-pack';
import type { FromFn } from 'fp-pack';

const start: FromFn<number> = from(3);

const pipeline = pipeSideEffectStrict(
  start,
  (value) => value + 1,
  (value) => (value > 3 ? value : SideEffect.of(() => 'LOW' as const))
);

const result = pipeline();`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      첫 함수가 <code class="text-sm">from</code> 기반이면 입력 없이 호출해도 타입 추론이 유지됩니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      스트림 입력 타입
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { toAsync } from 'fp-pack/stream';
import type { AnyIterableInput, PromiseLikeValue } from 'fp-pack/stream';

async function normalize<T>(input: AnyIterableInput<PromiseLikeValue<T>>) {
  const result: T[] = [];
  for await (const item of toAsync(input)) {
    result.push(item);
  }
  return result;
}`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      반환 타입을 <code class="text-sm">Iterable</code> 또는 <code class="text-sm">AsyncIterable</code>로
      모두 허용하려면 <code class="text-sm">AnyIterable</code>을 사용하세요.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      객체 경로용 PathKey
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { assocPath, path } from 'fp-pack';
import type { PathKey } from 'fp-pack';

const userPath: PathKey[] = ['users', 0, 'name'];
const name = path<string>(userPath, data);

const next = assocPath(userPath, 'Alice', data);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      matchSideEffect 핸들러
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { matchSideEffect, SideEffect } from 'fp-pack';
import type { MatchHandlers } from 'fp-pack';

type Result = number | SideEffect<'EMPTY'>;

const handlers: MatchHandlers<number, string, string> = {
  value: (value) => \`value:\${value}\`,
  effect: (effect) => effect.label ?? 'EMPTY'
};

const result: Result = 10;
const message = matchSideEffect(result, handlers);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      관련 가이드
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/composition/curry"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/curry');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-emerald-600 dark:text-emerald-400 mb-2">
          curry →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          커리 함수와 data-last 패턴.
        </p>
      </a>

      <a
        href="/composition/from"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/from');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          from →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          고정 값으로 파이프 시작하기.
        </p>
      </a>

      <a
        href="/stream/toAsync"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/toAsync');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          toAsync →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          스트림 입력을 async iterable로 정규화.
        </p>
      </a>
    </div>
  </div>
);

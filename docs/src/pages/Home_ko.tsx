import { navigateTo } from '@/store';

export const Home_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
      fp-kit
    </h1>

    <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
      실용적이고 현실적인 파이프 중심 TypeScript 함수형 툴킷
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      핵심 철학
    </h2>

    <ul class="space-y-4 text-gray-700 dark:text-gray-300 mb-8">
      <li class="flex items-start">
        <span class="text-blue-500 font-bold mr-3 text-2xl">🔄</span>
        <div>
          <strong class="text-lg">파이프 우선 합성</strong>
          <p class="mt-1">깔끔하고 왼쪽에서 오른쪽으로 흐르는 데이터 변환을 위해 <code class="text-sm">pipe</code>와 <code class="text-sm">pipeAsync</code>를 중심으로 설계. 개발자들이 이미 알고 있는 표준 파이프라인 패턴을 따릅니다.</p>
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-purple-500 font-bold mr-3 text-2xl">⚡</span>
        <div>
          <strong class="text-lg">SideEffect 패턴</strong>
          <p class="mt-1">모나드도, 무거운 추상화도 없습니다. <code class="text-sm">SideEffect</code> 인터페이스로 파이프 체인 내에서 에러와 사이드 이펙트를 선언적으로 처리하며, 흐름을 끊지 않습니다.</p>
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-green-500 font-bold mr-3 text-2xl">💧</span>
        <div>
          <strong class="text-lg">스트림 처리</strong>
          <p class="mt-1"><code class="text-sm">stream/*</code> 함수들로 효율적인 지연 평가를 제공합니다. <code class="text-sm">Iterable</code>과 <code class="text-sm">AsyncIterable</code> 모두를 지원하여 대용량 데이터셋을 메모리 효율적으로 처리합니다.</p>
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-orange-500 font-bold mr-3 text-2xl">🔀</span>
        <div>
          <strong class="text-lg">비동기 일급 지원</strong>
          <p class="mt-1"><code class="text-sm">pipeAsync</code>로 비동기 흐름 제어를 실용적이고 합성 가능하게 만듭니다. 파이프라인 내에서 동기와 비동기 함수를 자연스럽게 섞어 사용할 수 있습니다.</p>
        </div>
      </li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      왜 fp-kit인가?
    </h2>

    <ul class="space-y-3 text-gray-700 dark:text-gray-300">
      <li class="flex items-start">
        <span class="text-blue-500 font-bold mr-3">🎯</span>
        <div>
          <strong>실용적이고 현실적</strong> - 실제 프로덕션에서 사용하는 일상적인 비동기 작업, 데이터 파이프라인, 에러 처리를 위한 솔루션
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-blue-500 font-bold mr-3">🚫</span>
        <div>
          <strong>학술적 함수형 프로그래밍 배제</strong> - 모나드, 펑터, 범주론 없음. 실제 문제를 해결하는 유용한 패턴만 제공
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-blue-500 font-bold mr-3">👥</span>
        <div>
          <strong>TypeScript 네이티브</strong> - TypeScript 개발자를 위해 작성되었으며 뛰어난 타입 추론과 최소한의 타입 어노테이션 제공
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-blue-500 font-bold mr-3">🪶</span>
        <div>
          <strong>경량 & 모듈형</strong> - 제로 의존성, 완전한 트리 쉐이킹 지원, ~5KB 풋프린트
        </div>
      </li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      주요 기능
    </h2>

    <div class="grid gap-6 mt-6 mb-8">
      <div class="block p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 class="text-xl font-medium text-blue-600 dark:text-blue-400 mb-3">
          표준 파이프 연산
        </h3>
        <p class="text-gray-700 dark:text-gray-300 mb-3">
          업계 표준 관례를 따르는 익숙한 <code class="text-sm">pipe</code>와 <code class="text-sm">compose</code> 패턴.
        </p>
        <pre class="text-sm bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
{`const result = pipe(
  filter(user => user.active),
  map(user => user.name),
  take(10)
)(users);`}
        </pre>
      </div>

      <div class="block p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
        <h3 class="text-xl font-medium text-purple-600 dark:text-purple-400 mb-3">
          에러 처리를 위한 SideEffect
        </h3>
        <p class="text-gray-700 dark:text-gray-300 mb-3">
          합성을 깨지 않고 파이프 내에서 에러를 처리합니다. try-catch도, 모나드도 필요 없습니다.
        </p>
        <pre class="text-sm bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
{`const process = pipe(
  validate,
  (data) => data.ok
    ? data
    : SideEffect.of(() => throw Error()),
  transform
);`}
        </pre>
      </div>

      <div class="block p-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <h3 class="text-xl font-medium text-green-600 dark:text-green-400 mb-3">
          지연 스트림 처리
        </h3>
        <p class="text-gray-700 dark:text-gray-300 mb-3">
          완전한 <code class="text-sm">AsyncIterable</code> 지원으로 대용량 데이터셋에 대한 메모리 효율적인 연산 제공.
        </p>
        <pre class="text-sm bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
{`import * as Stream from 'fp-kit/stream';

const first100 = pipe(
  Stream.filter(n => n % 2 === 0),
  Stream.take(100),
  Stream.toArray
)(Stream.range(1, 1000000));`}
        </pre>
      </div>

      <div class="block p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
        <h3 class="text-xl font-medium text-orange-600 dark:text-orange-400 mb-3">
          pipeAsync로 비동기 파이프라인
        </h3>
        <p class="text-gray-700 dark:text-gray-300 mb-3">
          비동기 연산을 자연스럽게 합성합니다. 같은 파이프라인에서 동기와 비동기 함수를 혼합 사용 가능.
        </p>
        <pre class="text-sm bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
{`const fetchUser = pipeAsync(
  async (id) => fetch(\`/api/\${id}\`),
  (res) => res.json(),
  (data) => data.user
);`}
        </pre>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      시작하기
    </h2>

    <p class="text-gray-700 dark:text-gray-300 mb-6">
      강력하고 타입 안전한 파이프라인을 구축하기 위한 핵심 합성 유틸리티를 살펴보세요:
    </p>

    <div class="grid gap-6 mt-6">
      <a
        href="/composition/pipe"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipe');
        }}
        class="block p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-colors cursor-pointer"
      >
        <h3 class="text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          pipe →
        </h3>
        <p class="text-gray-700 dark:text-gray-300">
          가독성 있는 데이터 변환을 위해 왼쪽에서 오른쪽으로 함수를 합성합니다.
        </p>
      </a>

      <a
        href="/composition/compose"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/compose');
        }}
        class="block p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-colors cursor-pointer"
      >
        <h3 class="text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          compose →
        </h3>
        <p class="text-gray-700 dark:text-gray-300">
          전통적인 수학적 스타일로 오른쪽에서 왼쪽으로 함수를 합성합니다.
        </p>
      </a>

      <a
        href="/composition/curry"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/curry');
        }}
        class="block p-6 bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20 rounded-lg border border-pink-200 dark:border-pink-800 hover:border-pink-400 dark:hover:border-pink-600 transition-colors cursor-pointer"
      >
        <h3 class="text-xl font-medium text-pink-600 dark:text-pink-400 mb-2">
          curry →
        </h3>
        <p class="text-gray-700 dark:text-gray-300">
          유연한 합성을 위해 부분 적용을 지원하도록 함수를 변환합니다.
        </p>
      </a>
    </div>
  </div>
);

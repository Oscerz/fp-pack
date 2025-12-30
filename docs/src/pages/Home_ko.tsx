import { navigateTo } from '@/store';
import { CodeBlock } from '@/components/CodeBlock';

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

    <div class="grid gap-4 md:gap-6 mt-6 mb-8">
      <div class="block p-4 md:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800 overflow-hidden">
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2 md:mb-3">
          표준 파이프 연산
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3">
          업계 표준 관례를 따르는 익숙한 <code class="text-xs md:text-sm">pipe</code>와 <code class="text-xs md:text-sm">compose</code> 패턴.
        </p>
        <CodeBlock
          language="typescript"
          code={`const result = pipe(
  filter(user => user.active),
  map(user => user.name),
  take(10)
)(users);`}
        />
      </div>

      <div class="block p-4 md:p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800 overflow-hidden">
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2 md:mb-3">
          에러 처리를 위한 SideEffect
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3">
          합성을 깨지 않고 파이프 내에서 에러를 처리합니다. try-catch도, 모나드도 필요 없습니다.
        </p>
        <CodeBlock
          language="typescript"
          code={`const process = pipe(
  validate,
  (data) => data.ok
    ? data
    : SideEffect.of(() => throw Error()),
  transform
);`}
        />
      </div>

      <div class="block p-4 md:p-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg border border-green-200 dark:border-green-800 overflow-hidden">
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2 md:mb-3">
          지연 스트림 처리
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3">
          완전한 <code class="text-xs md:text-sm">AsyncIterable</code> 지원으로 대용량 데이터셋에 대한 메모리 효율적인 연산 제공.
        </p>
        <CodeBlock
          language="typescript"
          code={`import * as Stream from 'fp-kit/stream';

const first100 = pipe(
  Stream.filter(n => n % 2 === 0),
  Stream.take(100),
  Stream.toArray
)(Stream.range(1, 1000000));`}
        />
      </div>

      <div class="block p-4 md:p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200 dark:border-orange-800 overflow-hidden">
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2 md:mb-3">
          pipeAsync로 비동기 파이프라인
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3">
          비동기 연산을 자연스럽게 합성합니다. 같은 파이프라인에서 동기와 비동기 함수를 혼합 사용 가능.
        </p>
        <CodeBlock
          language="typescript"
          code={`const fetchUser = pipeAsync(
  async (id) => fetch(\`/api/\${id}\`),
  (res) => res.json(),
  (data) => data.user
);`}
        />
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      AI 에이전트 스킬
    </h2>

    <p class="text-gray-700 dark:text-gray-300 mb-4">
      fp-kit은 AI 코딩 어시스턴트(Claude Code, GitHub Copilot, Cursor 등)가 자동으로 fp-kit 스타일의 함수형 코드를 작성하도록 돕는 스킬 파일을 포함합니다.
    </p>

    <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 md:p-6 mb-6 rounded-r">
      <h3 class="text-lg font-medium text-green-800 dark:text-green-200 mb-3">
        🤖 AI 어시스턴트가 하는 일
      </h3>
      <ul class="space-y-2 text-sm md:text-base text-green-800 dark:text-green-200">
        <li class="flex items-start">
          <span class="mr-2">•</span>
          <span>모든 변환에 <code class="text-xs md:text-sm bg-green-100 dark:bg-green-800 px-1 rounded">pipe</code>와 <code class="text-xs md:text-sm bg-green-100 dark:bg-green-800 px-1 rounded">pipeAsync</code>를 기본으로 사용</span>
        </li>
        <li class="flex items-start">
          <span class="mr-2">•</span>
          <span>try-catch 대신 <code class="text-xs md:text-sm bg-green-100 dark:bg-green-800 px-1 rounded">SideEffect</code> 패턴 사용</span>
        </li>
        <li class="flex items-start">
          <span class="mr-2">•</span>
          <span>대용량 데이터셋에는 <code class="text-xs md:text-sm bg-green-100 dark:bg-green-800 px-1 rounded">stream/*</code> 함수 선호</span>
        </li>
        <li class="flex items-start">
          <span class="mr-2">•</span>
          <span>fp-kit 유틸리티를 사용한 선언적, 함수형 코드 작성</span>
        </li>
      </ul>
    </div>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      설정 방법
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
      AI 코딩 어시스턴트가 스킬 파일을 지원한다면, <code class="text-xs md:text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">fp-kit.md</code>를 적절한 디렉토리에 복사하세요.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
      <strong>Claude Code의 경우:</strong> <code class="text-xs md:text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">.claude/skills/</code>에 복사
    </p>

    <CodeBlock
      language="bash"
      code={`# Unix/macOS/Linux
cp node_modules/fp-kit/dist/skills/fp-kit.md .claude/skills/

# Windows (PowerShell)
Copy-Item node_modules/fp-kit/dist/skills/fp-kit.md .claude/skills/

# 또는 수동으로 디렉토리 생성 후 복사
mkdir -p .claude/skills
cp node_modules/fp-kit/dist/skills/fp-kit.md .claude/skills/`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mt-4 mb-2">
      <strong>다른 AI 어시스턴트의 경우:</strong> 해당 도구의 문서를 참고하여 스킬/지침 파일을 배치할 위치를 확인하세요.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6">
      설정을 완료하면 AI 어시스턴트가 코드 작성 시 자동으로 fp-kit 코딩 패턴을 적용합니다.
    </p>

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

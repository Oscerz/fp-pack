import { navigateTo } from '@/store';

export const Home_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
      fp-kit
    </h1>

    <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
      일상적인 JavaScript 개발자를 위한 실용적인 함수형 프로그래밍 유틸리티
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      왜 fp-kit인가?
    </h2>

    <ul class="space-y-3 text-gray-700 dark:text-gray-300">
      <li class="flex items-start">
        <span class="text-blue-500 font-bold mr-3">✨</span>
        <div>
          <strong>마법 없음</strong> - 무거운 추상화 없이 명확하고 이해하기 쉬운 구현
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-blue-500 font-bold mr-3">👥</span>
        <div>
          <strong>개발자 친화적</strong> - FP 학자가 아닌 일반 JavaScript 개발자를 위해 작성됨
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-blue-500 font-bold mr-3">🎯</span>
        <div>
          <strong>실용적</strong> - 이론적 구성이 아닌 실제로 매일 사용할 함수들
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-blue-500 font-bold mr-3">📘</span>
        <div>
          <strong>타입 완벽 지원</strong> - 뛰어난 타입 추론을 가진 완전한 TypeScript 지원
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-blue-500 font-bold mr-3">🪶</span>
        <div>
          <strong>경량</strong> - 트리 쉐이킹 가능하며 최소한의 번들 영향 (~5KB)
        </div>
      </li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      시작하기
    </h2>

    <p class="text-gray-700 dark:text-gray-300 mb-6">
      강력한 함수 파이프라인을 구축하기 위해 컴포지션 유틸리티를 살펴보세요:
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

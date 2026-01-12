

export const PipeChoiceGuide_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
      파이프 선택하기
    </h1>
    <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
      유연성과 엄격성에 대한 심층 분석
    </p>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      fp-pack의 핵심 설계 철학은 **개발 경험(DX)**과 **타입 안정성** 사이의 균형을 맞추는 도구를 제공하는 것입니다. 이 철학은 다양한 `pipe` 변형에서 가장 명확하게 드러납니다. 이 트레이드오프를 이해하는 것이 라이브러리를 효과적으로 사용하는 열쇠입니다.
    </p>

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      관점: 왜 `pipe`는 유연한 추론을 우선시하는가?
    </h3>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      기본 <code class="text-sm">pipe</code>와 <code class="text-sm">pipeAsync</code>는 의도적으로 "추론 친화적"으로 설계되었습니다. 이들의 주요 목표는 중간 단계가 복잡하거나 제네릭하더라도 파이프라인의 최종 출력 타입을 지능적으로 추론하여 부드러운 개발 경험을 제공하는 것입니다.
    </p>
    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      이것이 fp-pack이 다른 많은 라이브러리와 차별화되는 핵심 요소입니다. 제네릭 함수가 도입되는 순간 수동으로 타입 주석을 달도록 강요하는 대신, <code class="text-sm">pipe</code>는 전체 체인을 보고 최종 타입을 "풀어냅니다".
    </p>
    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong>장점:</strong> 최소한의 마찰로 복잡한 제네릭 함수를 조합할 수 있습니다. 추론 엔진의 "마법"이 그냥 작동합니다.
      <br />
      <strong>절충점:</strong> 이를 달성하기 위해 더 너그러워야 합니다. 중간의 모든 타입 불일치(<code class="text-sm">number</code> &rarr; <code class="text-sm">string</code> 등)를 잡아내지 못할 수 있으며, 최종 조합이 건전하다는 것을 개발자를 신뢰합니다. 이 관점은 복잡한 경우에 원활한 추론으로 얻는 생산성 향상이, 어차피 숙련된 개발자라면 쉽게 발견할 수 있는 간단한 타입 오류의 위험보다 더 크다고 주장합니다.
    </p>

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      안전성이 필요할 때: `Strict` 변형
    </h3>
    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      <code class="text-sm">pipeStrict</code>와 <code class="text-sm">pipeAsyncStrict</code>는 반대 철학을 채택합니다. 이들은 **모든 단계에서의 타입 안정성**을 우선시합니다.
    </p>
    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong>장점:</strong> 한 함수의 출력과 다음 함수의 입력 간의 모든 타입 불일치를 즉시 알려주어, 컴파일 타임에 전체 버그 클래스를 예방합니다.
      <br />
      <strong>절충점:</strong> 이 엄격함은 때때로 TypeScript가 복잡한 제네릭 파이프라인에서 타입을 추론하는 능력을 방해하여, 기본 <code class="text-sm">pipe</code>가 필요하지 않았을 명시적 타입 힌트를 추가하도록 강요할 수 있습니다.
    </p>

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      `SideEffect` 파이프의 동일한 트레이드오프
    </h3>
    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      이 동일한 철학은 SideEffect 파이프라인에도 확장되며, 최종 <code class="text-sm">SideEffect</code> 타입의 정밀도라는 차원이 추가됩니다.
    </p>
    <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li>
        <strong class="font-semibold">`pipeSideEffect` / `pipeAsyncSideEffect` (유연함):</strong> 부드러운 개발자 경험을 우선시합니다. 모든 실패를 일반적인 방식으로(예: 로깅 후 null 반환) 처리하려는 경우 완벽합니다. 그러나 최종 SideEffect 타입을 종종 <code class="text-sm">SideEffect&lt;any&gt;</code>로 넓혀, 다른 실패 사례의 특정 타입을 잃게 됩니다.
      </li>
      <li>
        <strong class="font-semibold">`pipeSideEffectStrict` / `pipeAsyncSideEffectStrict` (안전함):</strong> 타입 안정성을 우선시합니다. 최종 SideEffect 타입이 파이프라인의 모든 가능한 효과의 정확한 유니온(예: <code class="text-sm">SideEffect&lt;'NO_USER' | 'INSUFFICIENT_FUNDS'&gt;</code>)임을 보장합니다. 이는 다양한 실패 유형을 프로그래매틱하게 구별하고 완전한 타입 안전성으로 처리해야 할 때 필수적입니다.
      </li>
    </ul>

    <div class="overflow-x-auto mb-6">
      <table class="min-w-full border border-gray-300 dark:border-gray-700">
        <thead class="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700">
              파이프 변형
            </th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700">
              주요 목표
            </th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700">
              추천 사용처
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-900">
          <tr class="border-b border-gray-200 dark:border-gray-800">
            <td class="px-4 py-3 text-sm">
              <code class="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">pipe</code> / <code class="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">pipeAsync</code>
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              추론 및 DX
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              대부분의 경우, 특히 복잡한 제네릭과 함께 사용할 때.
            </td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-gray-800">
            <td class="px-4 py-3 text-sm">
              <code class="text-xs bg-emerald-100 dark:bg-emerald-900 px-2 py-1 rounded">pipeStrict</code> / <code class="text-xs bg-emerald-100 dark:bg-emerald-900 px-2 py-1 rounded">pipeAsyncStrict</code>
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              타입 안정성
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              중간 타입의 정확성이 보장되어야 하는 중요한 코드 경로.
            </td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-gray-800">
            <td class="px-4 py-3 text-sm">
              <code class="text-xs bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">pipeSideEffect</code> / <code class="text-xs bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">pipeAsyncSideEffect</code>
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              일반적인 실패 처리
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              모든 실패를 균일한 방식으로 처리할 때(예: 로깅, 일반 오류 표시).
            </td>
          </tr>
          <tr>
            <td class="px-4 py-3 text-sm">
              <code class="text-xs bg-green-100 dark:bg-green-900 px-2 py-1 rounded">pipeSideEffectStrict</code> / <code class="text-xs bg-green-100 dark:bg-green-900 px-2 py-1 rounded">pipeAsyncSideEffectStrict</code>
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              정확한 실패 처리
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              다양한 오류 유형을 프로그래밍 방식으로 구별해야 할 때.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

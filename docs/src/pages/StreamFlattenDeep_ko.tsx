import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamFlattenDeep_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      stream/flattenDeep
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      깊이 제한 없이 중첩 이터러블을 지연 평탄화
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      stream/flattenDeep란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/20 px-2 py-1 rounded">
        flattenDeep
      </strong>{' '}
      는 중첩된 이터러블을 깊이에 상관없이 재귀적으로 평탄화하여, 모든 리프 값의 지연 스트림을 생성합니다.
      한 단계만 평탄화하는 <code class="text-sm">flatten</code>과 달리, <code class="text-sm">flattenDeep</code>은{' '}
      모든 중첩이 제거될 때까지 재귀적으로 계속 진행합니다.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      다음과 같은 경우에 특히 유용합니다:
    </p>

    <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li>API나 트리 순회로부터 깊이 중첩된 데이터 구조를 가지고 있을 때</li>
      <li>중첩 깊이를 알 수 없거나 가변적일 때</li>
      <li>구조에 상관없이 모든 리프 값을 수집해야 할 때</li>
      <li>대용량 중첩 데이터셋에 대한 메모리 효율성이 중요할 때</li>
    </ul>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';
import { flattenDeep, toArray } from 'fp-kit/stream';

const deeplyNested = [1, [2, [3, [4, [5]]]]];

const result = pipe(
  flattenDeep,
  toArray
)(deeplyNested);
// [1, 2, 3, 4, 5]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function flattenDeep<T>(
  iterable: Iterable<unknown>
): IterableIterator<T>;

function flattenDeep<T>(
  iterable: AnyIterableInput<PromiseLikeValue<unknown>>
): AsyncIterableIterator<T>;`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      이 함수는 동기 및 비동기 이터러블을 모두 지원하며, 입력 타입을 자동으로 감지하여
      적절한 이터레이터를 반환합니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      flatten vs flattenDeep
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">flatten</code>과 <code class="text-sm">flattenDeep</code>을 언제 사용해야 하는지 이해하기:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatten, flattenDeep, toArray } from 'fp-kit/stream';

const nested = [1, [2, [3, 4]], 5];

// flatten - 한 단계만
const oneLevel = toArray(flatten(nested));
// [1, 2, [3, 4], 5]

// flattenDeep - 모든 단계
const allLevels = toArray(flattenDeep(nested));
// [1, 2, 3, 4, 5]`}
    />

    <div class="bg-blue-50 dark:bg-blue-900/20 p-4 mb-6 rounded border border-blue-200 dark:border-blue-800 mt-6">
      <p class="text-sm md:text-base text-blue-800 dark:text-blue-200 leading-relaxed">
        <span class="font-medium">💡 어떤 것을 사용해야 할까?</span>
        <br />
        <br />
        구조가 한 단계의 중첩만 있다는 것을 알고 있고 정확한 제어를 원할 때는 <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">flatten</code>을 사용하세요.
        <br />
        <br />
        중첩 깊이를 알 수 없거나 가변적이거나, 구조에 상관없이 모든 리프 값이 필요할 때는 <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">flattenDeep</code>을 사용하세요.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      트리 구조를 평탄 리스트로
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';
import { flattenDeep, toArray } from 'fp-kit/stream';

interface TreeNode {
  value: number;
  children?: TreeNode[];
}

const tree: TreeNode = {
  value: 1,
  children: [
    { value: 2, children: [{ value: 4 }, { value: 5 }] },
    { value: 3, children: [{ value: 6 }] }
  ]
};

// 트리에서 모든 값 추출
const extractValues = (node: TreeNode): any[] => [
  node.value,
  ...(node.children?.map(extractValues) || [])
];

const allValues = pipe(
  extractValues,
  flattenDeep,
  toArray
)(tree);
// [1, 2, 4, 5, 3, 6]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      중첩된 태그 수집
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';
import { flattenDeep, toArray } from 'fp-kit/stream';

const categories = [
  { name: 'Frontend', tags: [['React', 'Vue'], ['CSS']] },
  { name: 'Backend', tags: [['Node.js', ['Express', 'Fastify']]] },
  { name: 'DevOps', tags: ['Docker'] }
];

const allTags = pipe(
  (cats) => cats.map(c => c.tags),
  flattenDeep,
  toArray
)(categories);
// ['React', 'Vue', 'CSS', 'Node.js', 'Express', 'Fastify', 'Docker']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      비동기 중첩 데이터 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';
import { flattenDeep, toArray } from 'fp-kit/stream';

// API가 중첩 구조를 반환
const fetchNestedData = async () =>
  Promise.resolve([
    1,
    Promise.resolve([2, [3]]),
    [[Promise.resolve(4)]]
  ]);

const result = await pipe(
  fetchNestedData,
  flattenDeep,
  toArray
)();
// [1, 2, 3, 4]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      다른 스트림 함수와 결합
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';
import { flattenDeep, filter, map, take, toArray } from 'fp-kit/stream';

const nestedNumbers = [
  [1, 2],
  [[3, 4], [5]],
  [[[6, 7, 8]]]
];

const result = pipe(
  flattenDeep,
  filter((n: number) => n % 2 === 0),  // 짝수만
  map((n: number) => n * 2),            // 2배로
  take(3),                               // 처음 3개
  toArray
)(nestedNumbers);
// [4, 8, 12]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      성능 고려사항
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">flattenDeep</code>은 지연 평가되며 메모리 효율적입니다:
    </p>

    <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li><strong>지연 평가:</strong> 반복하는 동안 요청 시 값이 평탄화됩니다</li>
      <li><strong>메모리 효율적:</strong> 각 중첩 레벨에 대한 중간 배열을 생성하지 않습니다</li>
      <li><strong>조기 종료:</strong> <code class="text-sm">take</code>와 결합하여 일찍 중단할 수 있습니다</li>
      <li><strong>대용량 데이터셋:</strong> 메모리에 맞지 않는 깊이 중첩된 구조에서 잘 작동합니다</li>
    </ul>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';
import { flattenDeep, take, toArray } from 'fp-kit/stream';

// 깊이 중첩된 구조 생성
const deepNesting = (depth: number): any =>
  depth === 0 ? 1 : [2, deepNesting(depth - 1)];

const hugeNested = deepNesting(1000);

// 필요한 만큼만 처리 - 5개 항목 후 중단
const first5 = pipe(
  flattenDeep,
  take(5),
  toArray
)(hugeNested);
// [2, 2, 2, 2, 2]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      관련 함수
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/stream/flatten"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/flatten');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          flatten →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          한 단계의 중첩만 지연 평탄화합니다.
        </p>
      </a>

      <a
        href="/stream/flatMap"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/flatMap');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          flatMap →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          값을 매핑하고 한 단계를 지연 평탄화합니다.
        </p>
      </a>

      <a
        href="/stream/map"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/map');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          map →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          각 값을 지연 변환합니다.
        </p>
      </a>

      <a
        href="/stream/filter"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/filter');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          filter →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          조건자에 따라 값을 지연 필터링합니다.
        </p>
      </a>
    </div>
  </div>
);

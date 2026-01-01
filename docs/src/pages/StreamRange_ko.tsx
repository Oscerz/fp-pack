import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamRange_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      stream/range
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      오름차순 또는 내림차순으로 숫자 시퀀스를 지연 생성
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      stream/range란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-900/20 px-2 py-1 rounded">
        range
      </strong>{' '}
      는 <code class="text-sm">start</code>부터 <code class="text-sm">end</code> 직전까지의 숫자를 지연 이터러블로 생성합니다.
      시작 값과 끝 값을 기반으로 오름차순 또는 내림차순을 자동으로 감지하여, 양방향 시퀀스에 유연하게 대응합니다.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      다음과 같은 경우에 특히 유용합니다:
    </p>

    <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li>배열을 생성하지 않고 특정 횟수만큼 반복이 필요할 때</li>
      <li>데이터 처리나 페이지네이션을 위한 인덱스 시퀀스 생성</li>
      <li>테스트 데이터나 플레이스홀더 시퀀스 생성</li>
      <li>큰 범위를 다룰 때 메모리 효율성이 중요한 경우</li>
    </ul>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';
import { range, toArray } from 'fp-kit/stream';

// 오름차순 범위
const ascending = pipe(
  range,
  toArray
)(0, 5);
// [0, 1, 2, 3, 4]

// 내림차순 범위 (자동 감지)
const descending = pipe(
  range,
  toArray
)(5, 0);
// [5, 4, 3, 2, 1]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function range(
  start: number,
  end: number
): IterableIterator<number>;`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      이 함수는 start(포함)부터 end(미포함)까지 숫자를 생성하는 지연 이터레이터를 반환합니다.
      방향은 자동으로 결정됩니다: start &lt; end일 때 오름차순, start &gt; end일 때 내림차순.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      인덱스 아이템 생성
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';
import { range, map, toArray } from 'fp-kit/stream';

// 번호가 매겨진 레이블 생성
const labels = pipe(
  range,
  map((n: number) => \`Item #\${n}\`),
  toArray
)(1, 6);
// ['Item #1', 'Item #2', 'Item #3', 'Item #4', 'Item #5']

// 플레이스홀더 객체 생성
const placeholders = pipe(
  range,
  map((id: number) => ({ id, name: \`User \${id}\`, active: false })),
  toArray
)(1, 4);
// [
//   { id: 1, name: 'User 1', active: false },
//   { id: 2, name: 'User 2', active: false },
//   { id: 3, name: 'User 3', active: false }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      지연 페이지네이션
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';
import { range, take, map, toArray } from 'fp-kit/stream';

// 페이지 번호를 지연 생성
// 1000개가 아닌 처음 3개만 계산
const pageNumbers = pipe(
  range,
  take(3),
  toArray
)(1, 1000);
// [1, 2, 3]

// 페이지별 API 엔드포인트 URL 생성
const apiUrls = pipe(
  range,
  take(5),
  map((page: number) => \`https://api.example.com/data?page=\${page}\`),
  toArray
)(1, Infinity);
// [
//   'https://api.example.com/data?page=1',
//   'https://api.example.com/data?page=2',
//   'https://api.example.com/data?page=3',
//   'https://api.example.com/data?page=4',
//   'https://api.example.com/data?page=5'
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      그리드 좌표 생성
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';
import { range, flatMap, map, toArray } from 'fp-kit/stream';

// 2D 그리드 좌표 생성
const grid = pipe(
  range,
  flatMap((x: number) =>
    pipe(
      range,
      map((y: number) => ({ x, y }))
    )(0, 3)
  ),
  toArray
)(0, 3);
// [
//   { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 },
//   { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 },
//   { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      카운트다운 타이머
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';
import { range, map, toArray } from 'fp-kit/stream';

// 내림차순 카운트다운 생성
const countdown = pipe(
  range,
  map((n: number) => \`T-minus \${n} seconds\`),
  toArray
)(10, 0);
// [
//   'T-minus 10 seconds',
//   'T-minus 9 seconds',
//   ...
//   'T-minus 1 seconds'
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Filter와 결합
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';
import { range, filter, map, toArray } from 'fp-kit/stream';

// 짝수만 가져와서 제곱
const evenSquares = pipe(
  range,
  filter((n: number) => n % 2 === 0),
  map((n: number) => n * n),
  toArray
)(0, 10);
// [0, 4, 16, 36, 64]

// 3의 배수 찾기
const multiplesOf3 = pipe(
  range,
  filter((n: number) => n % 3 === 0),
  toArray
)(1, 20);
// [3, 6, 9, 12, 15, 18]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      성능 고려사항
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">range</code>는 지연 평가되며 메모리 효율적입니다:
    </p>

    <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li><strong>지연 평가:</strong> 반복하는 동안 요청 시 숫자가 생성됩니다</li>
      <li><strong>메모리 오버헤드 제로:</strong> 메모리에 배열을 생성하지 않습니다</li>
      <li><strong>조기 종료:</strong> <code class="text-sm">take</code>와 결합하여 일찍 생성을 중단할 수 있습니다</li>
      <li><strong>무한 범위:</strong> <code class="text-sm">take</code>와 함께 <code class="text-sm">Infinity</code>를 end로 사용하여 제어된 생성이 가능합니다</li>
    </ul>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';
import { range, take, toArray } from 'fp-kit/stream';

// 효율적: 100만 개가 아닌 5개만 생성
const first5 = pipe(
  range,
  take(5),
  toArray
)(0, 1000000);
// [0, 1, 2, 3, 4]

// 배열 방식과 비교 (메모리에 전체 배열 생성)
// ❌ 비효율적: 100만 개의 숫자 배열을 생성
const inefficient = Array.from({ length: 1000000 }, (_, i) => i).slice(0, 5);

// ✅ 효율적: 필요한 만큼만 생성
const efficient = pipe(range, take(5), toArray)(0, 1000000);`}
    />

    <div class="bg-green-50 dark:bg-green-900/20 p-4 mb-6 rounded border border-green-200 dark:border-green-800 mt-6">
      <p class="text-sm md:text-base text-green-800 dark:text-green-200 leading-relaxed">
        <span class="font-medium">💡 성능 팁</span>
        <br />
        <br />
        숫자 시퀀스가 필요할 때는 <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">Array.from</code>이나
        스프레드보다 <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">range</code>를 선호하세요.
        <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">range</code>는 값을 지연 생성하는 반면,
        배열 메서드는 전체 시퀀스를 미리 메모리에 생성합니다.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      관련 함수
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/stream/take"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/take');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          take →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          스트림에서 처음 n개 값을 지연으로 가져옵니다.
        </p>
      </a>

      <a
        href="/stream/map"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/map');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
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
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          filter →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          조건자에 따라 값을 지연 필터링합니다.
        </p>
      </a>

      <a
        href="/stream/flatMap"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/flatMap');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          flatMap →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          값을 매핑하고 한 단계를 지연 평탄화합니다.
        </p>
      </a>
    </div>
  </div>
);

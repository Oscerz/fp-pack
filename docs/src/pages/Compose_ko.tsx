import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Compose_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      compose
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      오른쪽에서 왼쪽으로 함수를 합성 (h ← g ← f)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      compose란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/20 px-2 py-1 rounded">
        compose
      </strong>{' '}
      는 여러 함수를 오른쪽에서 왼쪽으로 합성하는 함수입니다.
      <br />
      <br />
      전통적인 수학적 표기법을 따릅니다: f(g(h(x)))는 compose(f, g, h)(x)가 됩니다.
      <br />
      <br />
      목록의 마지막 함수가 먼저 적용되는 고전적인 함수형 프로그래밍 접근 방식입니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { compose } from 'fp-kit';

const double = (n: number) => n * 2;
const addTen = (n: number) => n + 10;
const toString = (n: number) => String(n);

const transform = compose(
  toString,  // 3. 마지막으로 문자열로 변환
  addTen,    // 2. 그 다음 10을 더하고
  double     // 1. 먼저 숫자를 2배로
);

transform(5);  // "20"
// 흐름: 5 ← double ← 10 ← addTen ← 20 ← toString ← "20"
// 수학적 표기: toString(addTen(double(5)))`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      수학적 스타일
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      compose는 수학적 함수 합성처럼 읽힙니다. 가장 오른쪽 함수가 먼저 적용됩니다:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { compose } from 'fp-kit';

// 수학적 표기: f(g(h(x)))
const h = (x: number) => x + 1;
const g = (x: number) => x * 2;
const f = (x: number) => x - 3;

const fgh = compose(f, g, h);

fgh(5);  // 9
// 단계별:
// 1. h(5) = 6
// 2. g(6) = 12
// 3. f(12) = 9`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      데이터 추출 파이프라인
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { compose } from 'fp-kit';

interface User {
  profile: {
    name: string;
    age: number;
  };
  settings: {
    notifications: boolean;
  };
}

const getAge = (user: User) => user.profile.age;
const isAdult = (age: number) => age >= 18;
const toYesNo = (bool: boolean) => bool ? '예' : '아니오';

const checkAdultStatus = compose(
  toYesNo,
  isAdult,
  getAge
);

const user: User = {
  profile: { name: 'Alice', age: 25 },
  settings: { notifications: true }
};

checkAdultStatus(user);  // "예"`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      compose vs pipe
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      compose와 pipe의 유일한 차이점은 함수 적용 방향입니다:
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div class="border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
        <h4 class="text-lg font-medium text-purple-900 dark:text-purple-100 mb-2">
          compose (오른쪽에서 왼쪽)
        </h4>
        <CodeBlock
          language="typescript"
          code={`compose(
  toString,  // 3번째
  addTen,    // 2번째
  double     // 1번째
)(5)
// 읽기: f(g(h(x)))`}
        />
        <p class="text-sm text-purple-700 dark:text-purple-300 mt-2">
          전통적인 수학적 표기법
        </p>
      </div>
      <div class="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 class="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
          pipe (왼쪽에서 오른쪽)
        </h4>
        <CodeBlock
          language="typescript"
          code={`pipe(
  double,    // 1번째
  addTen,    // 2번째
  toString   // 3번째
)(5)
// 읽기: 레시피처럼`}
        />
        <p class="text-sm text-blue-700 dark:text-blue-300 mt-2">
          더 직관적인 실행 순서
        </p>
      </div>
    </div>

    <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 mb-6 rounded-r">
      <p class="text-sm md:text-base text-purple-800 dark:text-purple-200 leading-relaxed">
        <span class="font-medium">💡 compose를 사용해야 할 때:</span>
        <br />
        <br />
        다음과 같은 경우 <strong>compose</strong>를 사용하세요:
        <br />
        • 수학적 함수 합성에 익숙한 경우
        <br />
        • 수학적 규칙을 따르는 코드로 작업하는 경우
        <br />
        • "밖에서 안으로" 생각하는 것을 선호하는 경우
        <br />
        <br />
        대부분의 개발자는 일상적인 사용에서 <strong>pipe</strong>가 더 읽기 쉽다고 생각합니다.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다음 단계
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/composition/pipe"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipe');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          pipe →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          더 직관적인 왼쪽에서 오른쪽 합성인 pipe에 대해 알아보세요.
        </p>
      </a>

      <a
        href="/composition/curry"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/curry');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-pink-500 dark:hover:border-pink-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-pink-600 dark:text-pink-400 mb-2">
          curry →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          더 나은 합성을 위해 부분 적용된 함수를 만드는 curry에 대해 알아보세요.
        </p>
      </a>
    </div>
  </div>
);

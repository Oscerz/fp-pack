import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Pipe_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      pipe
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      왼쪽에서 오른쪽으로 함수를 합성 (f → g → h)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      pipe란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        pipe
      </strong>{' '}
      는 여러 함수를 왼쪽에서 오른쪽으로 합성하는 함수입니다.
      <br />
      <br />
      한 함수의 출력을 다음 함수의 입력으로 전달하여 가독성 있는 데이터 변환 파이프라인을 만듭니다.
      <br />
      <br />
      변환을 읽는 가장 자연스러운 방법입니다: 데이터로 시작한 다음 변환을 순서대로 적용합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';

const double = (n: number) => n * 2;
const addTen = (n: number) => n + 10;
const toString = (n: number) => String(n);

const transform = pipe(
  double,    // 1. 먼저 숫자를 2배로
  addTen,    // 2. 그 다음 10을 더하고
  toString   // 3. 마지막으로 문자열로 변환
);

transform(5);  // "20"
// 흐름: 5 → double → 10 → addTen → 20 → toString → "20"`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      간단한 데이터 변환
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';

const processName = pipe(
  (name: string) => name.trim(),
  (name: string) => name.toLowerCase(),
  (name: string) => name.split(' '),
  (parts: string[]) => parts.join('-')
);

processName('  John Doe  ');  // "john-doe"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      배열 다루기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';

const numbers = [1, 2, 3, 4, 5];

const processNumbers = pipe(
  (nums: number[]) => nums.filter(n => n > 2),
  (nums: number[]) => nums.map(n => n * 2),
  (nums: number[]) => nums.reduce((sum, n) => sum + n, 0)
);

processNumbers(numbers);  // 24
// 흐름: [1,2,3,4,5] → filter → [3,4,5] → map → [6,8,10] → reduce → 24`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      사용자 데이터 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';

interface User {
  id: number;
  name: string;
  age: number;
  active: boolean;
}

const getActiveAdultNames = pipe(
  (users: User[]) => users.filter(u => u.active),
  (users: User[]) => users.filter(u => u.age >= 18),
  (users: User[]) => users.map(u => u.name),
  (names: string[]) => names.sort()
);

const users: User[] = [
  { id: 1, name: 'Alice', age: 25, active: true },
  { id: 2, name: 'Bob', age: 17, active: true },
  { id: 3, name: 'Charlie', age: 30, active: false },
  { id: 4, name: 'Diana', age: 22, active: true },
];

getActiveAdultNames(users);  // ["Alice", "Diana"]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      가격 계산 파이프라인
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';

const calculateFinalPrice = pipe(
  (price: number) => price * 0.9,        // 10% 할인
  (price: number) => price * 1.1,        // 10% 세금 추가
  (price: number) => Math.round(price * 100) / 100,  // 소수점 2자리로
  (price: number) => \`₩\${price.toFixed(2)}\`  // 통화 형식으로
);

calculateFinalPrice(100);  // "₩99.00"`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다른 유틸리티와 결합
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      pipe는 curry 같은 다른 fp-kit 유틸리티와 함께 사용하면 최대한의 조합 가능성을 제공합니다:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipe, curry } from 'fp-kit';

// 커리된 헬퍼 함수 생성
const multiply = curry((a: number, b: number) => a * b);
const add = curry((a: number, b: number) => a + b);
const divide = curry((a: number, b: number) => a / b);

// 파이프라인에서 조합
const calculate = pipe(
  multiply(2),      // 2배로
  add(10),          // 10 더하기
  divide(4)         // 4로 나누기
);

calculate(5);  // 5
// 흐름: 5 → *2 → 10 → +10 → 20 → /4 → 5`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      pipe vs compose
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      pipe와 compose 모두 함수 합성을 만들지만, 반대 방향으로 흐릅니다:
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div class="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 class="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
          pipe (왼쪽에서 오른쪽)
        </h4>
        <CodeBlock
          language="typescript"
          code={`pipe(
  double,
  addTen,
  toString
)(5)
// 5 → 10 → 20 → "20"`}
        />
      </div>
      <div class="border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
        <h4 class="text-lg font-medium text-purple-900 dark:text-purple-100 mb-2">
          compose (오른쪽에서 왼쪽)
        </h4>
        <CodeBlock
          language="typescript"
          code={`compose(
  toString,
  addTen,
  double
)(5)
// 5 → 10 → 20 → "20"`}
        />
      </div>
    </div>

    <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 mb-6 rounded-r">
      <p class="text-sm md:text-base text-blue-800 dark:text-blue-200 leading-relaxed">
        <span class="font-medium">💡 pipe를 사용해야 할 때:</span>
        <br />
        <br />
        변환이 실행되는 순서대로 읽고 싶을 때 <strong>pipe</strong>를 사용하세요.
        이것이 대부분의 개발자에게 더 직관적이며 단계별 레시피처럼 읽힙니다.
        <br />
        <br />
        수학적 표기법을 선호하거나 그 규칙을 따르는 코드로 작업할 때는
        <strong>compose</strong>를 사용하세요.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      SideEffect 활용하기
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      pipe는 지연 실행을 위한 <strong class="font-semibold">SideEffect</strong> 컨테이너를 지원합니다.
      pipe가 SideEffect를 만나면 파이프라인을 즉시 중단하고 실행하지 않은 채로 SideEffect를 반환합니다.
      <br />
      <br />
      이를 통해 조건부로 실행을 중단하고 부수 효과를 호출자에게 위임할 수 있는 파이프라인을 구축할 수 있습니다.
    </p>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      기본 SideEffect 사용법
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, SideEffect, runPipeResult } from 'fp-kit';

const validateAge = (age: number) => {
  if (age < 0) {
    // 파이프라인을 중단하기 위해 SideEffect 반환
    return SideEffect.of(() => {
      throw new Error('나이는 음수일 수 없습니다');
    });
  }
  return age;
};

const processAge = pipe(
  validateAge,
  (age: number) => age * 2,  // SideEffect가 반환되면 실행되지 않음
  (age: number) => \`나이: \${age}\`,
  runPipeResult  // SideEffect가 있으면 자동 실행
);

// SideEffect가 자동으로 실행됨
try {
  processAge(-5);  // Throws: Error: 나이는 음수일 수 없습니다
} catch (error) {
  console.error(error.message);
}

// 정상 실행 계속
const result = processAge(10);
console.log(result);  // "나이: 20"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      조건부 조기 종료
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, SideEffect, runPipeResult } from 'fp-kit';

interface User {
  id: number;
  name: string;
  role: 'admin' | 'user';
}

const checkPermission = (user: User) => {
  if (user.role !== 'admin') {
    return SideEffect.of(() => ({
      error: '권한 없음',
      message: '관리자 권한이 필요합니다'
    }));
  }
  return user;
};

const deleteUser = pipe(
  checkPermission,
  (user: User) => {
    console.log(\`사용자 삭제 중: \${user.name}\`);
    return { success: true, deletedId: user.id };
  },
  runPipeResult  // SideEffect가 있으면 자동 실행
);

const adminUser = { id: 1, name: 'Alice', role: 'admin' as const };
const normalUser = { id: 2, name: 'Bob', role: 'user' as const };

// 관리자는 진행 가능
const result1 = deleteUser(adminUser);
// 로그: "사용자 삭제 중: Alice"
console.log(result1);  // { success: true, deletedId: 1 }

// 일반 사용자는 즉시 에러 반환
const result2 = deleteUser(normalUser);
console.log(result2);  // { error: '권한 없음', message: '관리자 권한이 필요합니다' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      지연된 로깅 및 부수 효과
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, SideEffect, runPipeResult } from 'fp-kit';

const divide = (a: number, b: number) => {
  if (b === 0) {
    return SideEffect.of(() => {
      console.error('0으로 나눌 수 없습니다!');
      return NaN;
    }, 'division-by-zero');  // 디버깅을 위한 선택적 레이블
  }
  return a / b;
};

const calculate = pipe(
  (input: { a: number; b: number }) => divide(input.a, input.b),
  (result: number) => result * 100,
  (result: number) => Math.round(result),
  runPipeResult  // SideEffect가 있으면 자동 실행
);

// 정상 계산
const result1 = calculate({ a: 10, b: 2 });
console.log(result1);  // 500

// 0으로 나누기는 SideEffect를 실행하고 로그를 출력
const result2 = calculate({ a: 10, b: 0 });
// 로그: "0으로 나눌 수 없습니다!"
console.log(result2);  // NaN`}
    />

    <div class="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20 p-4 mb-6 rounded-r">
      <p class="text-sm md:text-base text-orange-800 dark:text-orange-200 leading-relaxed">
        <span class="font-medium">⚠️ 중요:</span>
        <br />
        <br />
        SideEffect 컨테이너는 <strong>절대 자동 실행되지 않습니다</strong>. 지연된 작업을 실행하려면{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">runPipeResult()</code> 또는{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">sideEffect.effect()</code>를 명시적으로 호출해야 합니다.
        <br />
        <br />
        이를 통해 부수 효과가 실행되는 시점과 위치를 완전히 제어할 수 있습니다.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      관련 함수
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/composition/compose"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/compose');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          compose →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          오른쪽에서 왼쪽으로 함수를 합성 - pipe의 대안.
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
          파이프라인에서 부분 적용을 위한 함수 변환.
        </p>
      </a>

      <a
        href="/composition/partial"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/partial');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          partial →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          유연한 합성을 위해 함수 인자를 미리 채우기.
        </p>
      </a>

      <a
        href="/composition/sideEffect"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/sideEffect');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          sideEffect →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          조건부 파이프라인 중단을 위한 지연 실행 컨테이너.
        </p>
      </a>
    </div>
  </div>
);

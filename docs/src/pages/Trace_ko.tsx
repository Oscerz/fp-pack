import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Trace_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      trace
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      변환 파이프라인의 중간 값 추적
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      trace란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        trace
      </strong>{' '}
      는 파이프라인의 중간 값을 콘솔에 출력하고 변경하지 않고 전달합니다.
      데이터 변환을 추적하기 위해 특별히 설계되어 파이프라인의 각 단계를 통해 데이터가 어떻게 흐르고 변화하는지 쉽게 확인할 수 있습니다.
      <br />
      <br />
      이는 <strong>파이프라인 디버깅</strong>, <strong>변환 추적</strong>,
      <strong>데이터 흐름 시각화</strong>, 그리고 <strong>개발 진단</strong>에 유용합니다.
      <br />
      <br />
      "각 단계에서 이 데이터가 어떻게 변환되는지 보여주라"는 의미로 생각하면 됩니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { trace, pipe } from 'fp-kit';

const transformData = pipe(
  (x: number) => x * 2,
  trace('단계 1: 2배'),        // 추적: "단계 1: 2배 10"
  (x) => x + 5,
  trace('단계 2: 5 더하기'),   // 추적: "단계 2: 5 더하기 15"
  (x) => x / 3,
  trace('단계 3: 나누기'),      // 추적: "단계 3: 나누기 5"
);

transformData(5);  // 반환: 5`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function trace<T>(label?: string): (value: T) => T;

// 선택적 라벨 문자열을 받음
// 값을 로깅하고 변경하지 않고 반환하는 함수를 반환`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      간단한 추적
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { trace } from 'fp-kit';

// 라벨 없이 추적
const traceValue = trace<number>();
traceValue(42);  // 로그: 42, 반환: 42

// 라벨과 함께 추적
const traceWithLabel = trace<string>('현재 값');
traceWithLabel('hello');  // 로그: "현재 값 hello", 반환: "hello"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      변환 파이프라인에서 사용
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { trace, pipe } from 'fp-kit';

const calculate = pipe(
  (x: number) => x + 10,
  trace('더하기 후'),
  (x) => x * 2,
  trace('곱하기 후'),
  (x) => x - 5,
  trace('최종 결과')
);

calculate(5);
// 추적: "더하기 후 15"
// 추적: "곱하기 후 30"
// 추적: "최종 결과 25"
// 반환: 25`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예시
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      복잡한 변환 디버깅
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { trace, pipe, map, filter, reduce } from 'fp-kit';

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

const products: Product[] = [
  { id: 1, name: '노트북', price: 1000, inStock: true },
  { id: 2, name: '마우스', price: 20, inStock: false },
  { id: 3, name: '키보드', price: 80, inStock: true },
];

const getTotalPrice = pipe(
  trace<Product[]>('입력 상품'),
  filter((p: Product) => p.inStock),
  trace('재고 있는 상품 필터링'),
  map((p: Product) => p.price),
  trace('추출된 가격'),
  reduce((sum: number, price: number) => sum + price, 0),
  trace('총 가격')
);

getTotalPrice(products);
// 각 변환 단계를 추적
// 반환: 1080`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      문자열 처리 파이프라인
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { trace, pipe } from 'fp-kit';

const sanitizeInput = pipe(
  trace<string>('원본 입력'),
  (s) => s.trim(),
  trace('공백 제거'),
  (s) => s.toLowerCase(),
  trace('소문자 변환'),
  (s) => s.replace(/[^a-z0-9]/g, ''),
  trace('정제됨'),
  (s) => s.slice(0, 20),
  trace('잘라냄')
);

sanitizeInput('  Hello World! 123  ');
// 추적: "원본 입력   Hello World! 123  "
// 추적: "공백 제거 Hello World! 123"
// 추적: "소문자 변환 hello world! 123"
// 추적: "정제됨 helloworld123"
// 추적: "잘라냄 helloworld123"
// 반환: "helloworld123"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      데이터 정규화
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { trace, pipe } from 'fp-kit';

interface UserInput {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
}

interface NormalizedUser {
  fullName: string;
  email: string;
  age: number;
}

const normalizeUser = pipe(
  trace<UserInput>('원본 사용자 입력'),
  (user) => ({
    ...user,
    firstName: user.firstName.trim(),
    lastName: user.lastName.trim(),
    email: user.email.trim().toLowerCase(),
  }),
  trace('필드 공백 제거'),
  (user) => ({
    fullName: \`\${user.firstName} \${user.lastName}\`,
    email: user.email,
    age: parseInt(user.age, 10),
  }),
  trace('정규화된 사용자')
);

normalizeUser({
  firstName: '  John  ',
  lastName: '  Doe  ',
  email: '  JOHN@EXAMPLE.COM  ',
  age: '25',
});
// 각 정규화 단계를 추적
// 반환: { fullName: 'John Doe', email: 'john@example.com', age: 25 }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      다단계 데이터 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { trace, pipe, groupBy } from 'fp-kit';

interface Transaction {
  id: number;
  userId: number;
  amount: number;
  type: 'debit' | 'credit';
}

const transactions: Transaction[] = [
  { id: 1, userId: 1, amount: 100, type: 'credit' },
  { id: 2, userId: 1, amount: 50, type: 'debit' },
  { id: 3, userId: 2, amount: 200, type: 'credit' },
  { id: 4, userId: 2, amount: 75, type: 'debit' },
];

const calculateBalances = pipe(
  trace<Transaction[]>('모든 거래'),
  groupBy((t: Transaction) => t.userId),
  trace('사용자별 그룹화'),
  (grouped) => Object.entries(grouped).map(([userId, txns]) => ({
    userId: parseInt(userId, 10),
    balance: txns.reduce((sum, t) => {
      return t.type === 'credit' ? sum + t.amount : sum - t.amount;
    }, 0),
  })),
  trace('잔액 계산')
);

calculateBalances(transactions);
// 추적: "모든 거래 [...]"
// 추적: "사용자별 그룹화 {...}"
// 추적: "잔액 계산 [...]"
// 반환: [{ userId: 1, balance: 50 }, { userId: 2, balance: 125 }]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      에러 디버깅
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { trace, pipe } from 'fp-kit';

const riskyOperation = pipe(
  trace<string>('입력'),
  (s) => s.toUpperCase(),
  trace('대문자'),
  (s) => s.split(''),
  trace('문자로 분리'),
  (arr) => arr.reverse(),
  trace('역순'),
  (arr) => arr.join(''),
  trace('다시 결합')
);

try {
  riskyOperation('hello');
  // 각 단계를 추적하여 에러가 발생한 위치를 식별하는 데 도움
} catch (error) {
  // 추적은 파이프라인이 정확히 어디서 실패했는지 보여줌
  console.error('파이프라인 실패:', error);
}`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      왜 trace를 사용하나요?
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. 파이프라인 가시성
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          파이프라인의 각 단계에서 데이터가 어떻게 변환되는지 정확히 확인하여 디버깅을 간단하게 만듭니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. 로직에 영향 없음
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          비즈니스 로직이나 데이터 흐름을 변경하지 않고 trace 호출을 추가하거나 제거할 수 있습니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. 개발 보조
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          개발 및 디버깅에 완벽하며, 프로덕션에서 쉽게 제거하거나 비활성화할 수 있습니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          4. 명확한 단계 라벨
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          각 변환 단계에 라벨을 지정하여 추적 출력을 즉시 이해할 수 있게 만듭니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부사항
    </h2>

    <CodeBlock
      language="typescript"
      code={`function trace<T>(label?: string): (value: T) => T {
  return (value: T) => {
    if (label) {
      console.log(label, value);
    } else {
      console.log(value);
    }
    return value;
  };
}`}
    />

    <div class="mt-6 space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>작동 방식:</strong>
      </p>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>추적 지점을 식별하는 선택적 라벨 문자열을 받습니다</li>
        <li>값을 받는 함수를 반환합니다</li>
        <li>값을 콘솔에 로깅합니다 (라벨이 제공된 경우 함께)</li>
        <li>파이프라인 흐름을 유지하며 값을 변경하지 않고 반환합니다</li>
        <li>log와 동일하지만, 의미론적으로 파이프라인 추적에 사용됩니다</li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다음 단계
    </h2>

    <div class="space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        관련된 디버깅 및 유틸리티 함수들을 시도해보세요:
      </p>
      <ul class="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/debug/log');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            log
          </a>{' '}
          - trace와 유사하며, 파이프라인의 일반적인 로깅용
        </li>
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/composition/tap');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            tap
          </a>{' '}
          - 파이프라인에서 부수 효과 실행 (trace는 tap 패턴을 기반으로 구축됨)
        </li>
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/composition/pipe');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            pipe
          </a>{' '}
          - 함수를 왼쪽에서 오른쪽으로 조합 (trace가 가장 유용한 곳)
        </li>
      </ul>
    </div>
  </div>
);

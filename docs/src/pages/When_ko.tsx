import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const When_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      when
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      조건이 참일 때만 함수 적용
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      when이란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        when
      </strong>{' '}
      은 조건부로 변환을 적용하는 함수를 생성합니다. 값을 조건 함수로 테스트하고,
      조건이 true를 반환하면 주어진 함수를 적용합니다. 그렇지 않으면 원래 값을 변경하지 않고 반환합니다.
      <br />
      <br />
      이는 <strong>조건부 변환</strong>, <strong>데이터 검증</strong>,
      <strong>정규화</strong>, 그리고 <strong>선택적 처리</strong>에 유용합니다.
      <br />
      <br />
      "이 조건이 충족될 때만 이 값을 변환하라"는 의미로 생각하면 됩니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { when } from 'fp-kit';

const doubleIfPositive = when(
  (n: number) => n > 0,
  (n) => n * 2
);

doubleIfPositive(5);   // 10 (양수이므로 2배)
doubleIfPositive(-3);  // -3 (음수이므로 변경 없음)
doubleIfPositive(0);   // 0  (0이므로 변경 없음)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function when<T>(
  predicate: (value: T) => boolean,
  fn: (value: T) => T
): (value: T) => T;

// 조건 함수와 변환 함수를 받음
// 조건부로 변환을 적용하는 함수를 반환`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      간단한 변환
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { when } from 'fp-kit';

// 비어있지 않을 때만 대문자로 변환
const capitalizeIfNotEmpty = when(
  (s: string) => s.length > 0,
  (s) => s.toUpperCase()
);

capitalizeIfNotEmpty('hello');  // 'HELLO'
capitalizeIfNotEmpty('');        // ''

// 짝수일 때만 2배로
const doubleIfEven = when(
  (n: number) => n % 2 === 0,
  (n) => n * 2
);

doubleIfEven(4);   // 8
doubleIfEven(3);   // 3`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      데이터 정규화
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { when } from 'fp-kit';

interface User {
  name: string;
  email: string;
  age?: number;
}

// 대문자가 포함된 경우에만 이메일을 소문자로 정규화
const normalizeEmail = when(
  (user: User) => user.email !== user.email.toLowerCase(),
  (user) => ({ ...user, email: user.email.toLowerCase() })
);

normalizeEmail({ name: 'John', email: 'JOHN@EXAMPLE.COM' });
// { name: 'John', email: 'john@example.com' }

normalizeEmail({ name: 'Jane', email: 'jane@example.com' });
// { name: 'Jane', email: 'jane@example.com' } (변경 없음)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예시
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      입력 검증 및 정제
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { when } from 'fp-kit';
import { pipe } from 'fp-kit';

// 공백이 있을 때만 trim
const trimIfNeeded = when(
  (s: string) => s !== s.trim(),
  (s) => s.trim()
);

// 특수 문자가 있을 때만 제거
const sanitizeIfNeeded = when(
  (s: string) => /[^a-zA-Z0-9]/.test(s),
  (s) => s.replace(/[^a-zA-Z0-9]/g, '')
);

// 여러 조건부 변환 결합
const cleanInput = pipe(
  trimIfNeeded,
  sanitizeIfNeeded
);

cleanInput('  hello@world!  ');  // 'helloworld'
cleanInput('helloworld');         // 'helloworld' (변경 없음)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      조건부 할인
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { when } from 'fp-kit';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

// 수량이 10개 이상일 때만 대량 할인 적용
const applyBulkDiscount = when(
  (item: CartItem) => item.quantity >= 10,
  (item) => ({ ...item, price: item.price * 0.9 })
);

applyBulkDiscount({ name: 'Widget', price: 100, quantity: 15 });
// { name: 'Widget', price: 90, quantity: 15 }

applyBulkDiscount({ name: 'Gadget', price: 50, quantity: 5 });
// { name: 'Gadget', price: 50, quantity: 5 } (할인 없음)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      성능 최적화
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { when } from 'fp-kit';

// 계산이 비용이 많이 드는 경우(배열 길이 > 1000)에만 캐시
const cacheIfLarge = when(
  (arr: number[]) => arr.length > 1000,
  (arr) => {
    // 비용이 많이 드는 연산
    const cached = arr.map(n => n * n);
    return cached;
  }
);

// 이미 정렬되어 있지 않을 때만 정렬
const sortIfNeeded = when(
  (arr: number[]) => !arr.every((v, i, a) => i === 0 || a[i - 1] <= v),
  (arr) => [...arr].sort((a, b) => a - b)
);

sortIfNeeded([1, 2, 3, 4]);     // [1, 2, 3, 4] (이미 정렬됨)
sortIfNeeded([4, 2, 3, 1]);     // [1, 2, 3, 4] (정렬됨)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      데이터 처리를 위한 pipe와 함께 사용
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, when } from 'fp-kit';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

const processProduct = pipe(
  // 재고가 적을 때만 할인 적용
  when(
    (p: Product) => p.stock < 10,
    (p) => ({ ...p, price: p.price * 0.95 })
  ),
  // 재고가 0일 때만 품절 표시
  when(
    (p: Product) => p.stock === 0,
    (p) => ({ ...p, name: \`\${p.name} (품절)\` })
  )
);

processProduct({ id: 1, name: 'Widget', price: 100, stock: 5 });
// { id: 1, name: 'Widget', price: 95, stock: 5 }

processProduct({ id: 2, name: 'Gadget', price: 50, stock: 0 });
// { id: 2, name: 'Gadget (품절)', price: 47.5, stock: 0 }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      왜 when을 사용하나요?
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. 선언적 조건부 로직
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          명시적인 if 문 없이 "이 조건일 때만 실행"하는 로직을 명확하고 함수형으로 표현합니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. 조합 가능
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          pipe, compose 및 다른 함수형 유틸리티와 쉽게 결합하여 복잡한 데이터 변환을 만들 수 있습니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. 안전하고 예측 가능
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          항상 같은 타입의 값을 반환하므로 변환 파이프라인에서 안전하게 사용할 수 있습니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          4. 테스트 가능
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          순수 함수이므로 두 경로(조건 true와 false)를 독립적으로 쉽게 테스트할 수 있습니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부사항
    </h2>

    <CodeBlock
      language="typescript"
      code={`function when<T>(
  predicate: (value: T) => boolean,
  fn: (value: T) => T
): (value: T) => T {
  return (value: T) => (predicate(value) ? fn(value) : value);
}`}
    />

    <div class="mt-6 space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>작동 방식:</strong>
      </p>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>조건 함수와 변환 함수를 받습니다</li>
        <li>조건을 테스트하는 새 함수를 반환합니다</li>
        <li>조건이 true를 반환하면 변환을 적용합니다</li>
        <li>조건이 false를 반환하면 원래 값을 반환합니다</li>
        <li>부수 효과가 없는 순수 함수입니다</li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다음 단계
    </h2>

    <div class="space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        관련된 제어 흐름 함수들을 시도해보세요:
      </p>
      <ul class="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/control/unless');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            unless
          </a>{' '}
          - 조건이 거짓일 때만 함수 적용 (when의 반대)
        </li>
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/control/ifElse');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            ifElse
          </a>{' '}
          - 조건에 따라 두 가지 다른 변환 중 선택
        </li>
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/control/cond');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            cond
          </a>{' '}
          - 여러 조건 분기 처리
        </li>
      </ul>
    </div>
  </div>
);

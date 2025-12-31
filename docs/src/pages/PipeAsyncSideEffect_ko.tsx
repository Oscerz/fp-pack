import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const PipeAsyncSideEffect_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      pipeAsyncSideEffect
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      SideEffect 조기 종료를 지원하는 비동기 파이프라인
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      pipeAsyncSideEffect란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        pipeAsyncSideEffect
      </strong>{' '}
      는 <strong>pipeAsync</strong>처럼 비동기/동기 함수를 합성하지만,{' '}
      <strong class="font-semibold">SideEffect</strong>를 만나면 즉시 중단하고 반환합니다.
      입력으로 SideEffect를 받으면 실행 없이 그대로 돌려줍니다.
      순수 비동기 파이프라인은 <strong>pipeAsync</strong>를 사용하세요.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsyncSideEffect, SideEffect, runPipeResult } from 'fp-kit';

const fetchUser = async (id: string) => ({ id, verified: false });

const checkVerified = (user: { id: string; verified: boolean }) =>
  user.verified
    ? user
    : SideEffect.of(() => ({ error: '이메일 미인증', userId: user.id }));

const userPipeline = pipeAsyncSideEffect(fetchUser, checkVerified);

// runPipeResult는 파이프라인 밖에서 호출해야 합니다
const result = await runPipeResult(userPipeline('123'));
// { error: '이메일 미인증', userId: '123' }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function pipeAsyncSideEffect<A, R>(
  ab: (a: A) => R | SideEffect | Promise<R | SideEffect>
): (a: A | SideEffect) => Promise<R | SideEffect>;

function pipeAsyncSideEffect<A, B, R>(
  ab: (a: A) => B | SideEffect | Promise<B | SideEffect>,
  bc: (b: B) => R | SideEffect | Promise<R | SideEffect>
): (a: A | SideEffect) => Promise<R | SideEffect>;

// ... 최대 5개 함수
function pipeAsyncSideEffect(...funcs: Array<(input: any) => any>): (input: any) => Promise<any>;`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      각 단계는 값, SideEffect, 또는 Promise를 반환할 수 있습니다. SideEffect가 등장하면 즉시 종료됩니다.
    </p>

    <div class="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 p-4 mb-6 rounded-r mt-6">
      <p class="text-sm md:text-base text-red-800 dark:text-red-200 leading-relaxed">
        <span class="font-medium">🚨 중요: runPipeResult 타입 안전성</span>
        <br />
        <br />
        <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">runPipeResult&lt;T, R=any&gt;</code>는 기본 타입 매개변수로 <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">R=any</code>를 사용합니다.
        <br />
        <br />
        ❌ <strong>타입 내로잉 없이 runPipeResult를 사용하면 <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">any</code> 타입이 반환됩니다:</strong>
        <br />
        <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded text-xs">const result = runPipeResult(pipeline(data)); // result: any</code>
        <br />
        <br />
        ✅ <strong>정확한 타입 안전성을 위해서는 <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">isSideEffect</code> 타입 가드를 사용하세요:</strong>
        <br />
        <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded text-xs">if (!isSideEffect(result)) {'{'} /* 정확한 타입 */ {'}'}</code>
        <br />
        <br />
        또는 명시적으로 타입 매개변수를 전달하세요:
        <br />
        <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded text-xs">runPipeResult&lt;성공타입, 에러타입&gt;(result)</code>
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      SideEffect 활용하기
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      조기 종료를 사용한 비동기 검증
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsyncSideEffect, SideEffect, runPipeResult } from 'fp-kit';

interface User {
  id: string;
  email: string;
  verified: boolean;
}

const fetchUser = async (id: string): Promise<User> => {
  // API 호출 시뮬레이션
  return {
    id,
    email: 'user@example.com',
    verified: false
  };
};

const checkVerified = (user: User) => {
  if (!user.verified) {
    return SideEffect.of(() => ({
      error: '이메일 미인증',
      userId: user.id
    }));
  }
  return user;
};

const sendNotification = async (user: User) => {
  console.log(\`\${user.email}로 알림 전송 중\`);
  return { sent: true, userId: user.id };
};

const notifyUserPipeline = pipeAsyncSideEffect(
  fetchUser,
  checkVerified,
  sendNotification  // 사용자가 인증되지 않은 경우 실행되지 않음
);

// runPipeResult는 파이프라인 밖에서 호출해야 합니다
const result = await runPipeResult(notifyUserPipeline('123'));
console.log(result);  // { error: '이메일 미인증', userId: '123' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      API 에러 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsyncSideEffect, SideEffect, runPipeResult } from 'fp-kit';

const fetchData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    // 에러 처리를 위해 SideEffect 반환
    return SideEffect.of(async () => {
      const error = await response.text();
      throw new Error(\`API 에러: \${error}\`);
    }, 'api-error');
  }
  return response.json();
};

const validateData = (data: any) => {
  if (!data.id) {
    return SideEffect.of(() => {
      throw new Error('잘못된 데이터: id 누락');
    });
  }
  return data;
};

const processData = async (data: any) => {
  console.log('처리 중:', data.id);
  return { processed: true, ...data };
};

const dataPipeline = pipeAsyncSideEffect(
  fetchData,
  validateData,
  processData
);

// runPipeResult는 파이프라인 밖에서 호출해야 합니다
try {
  const result = await runPipeResult(dataPipeline('https://api.example.com/data'));
  console.log('성공:', result);
} catch (err) {
  console.error('에러 포착:', err.message);
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      조건부 비동기 작업
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsyncSideEffect, SideEffect, runPipeResult } from 'fp-kit';

interface PaymentRequest {
  amount: number;
  currency: string;
  userId: string;
}

const validatePayment = async (req: PaymentRequest) => {
  if (req.amount <= 0) {
    return SideEffect.of(() => ({
      error: '잘못된 금액',
      amount: req.amount
    }));
  }
  return req;
};

const checkBalance = async (req: PaymentRequest) => {
  // 잔액 확인 시뮬레이션
  const balance = 100;
  if (balance < req.amount) {
    return SideEffect.of(() => ({
      error: '잔액 부족',
      balance,
      required: req.amount
    }));
  }
  return req;
};

const processPayment = async (req: PaymentRequest) => {
  console.log(\`결제 처리 중: \${req.amount} \${req.currency}\`);
  return { success: true, transactionId: 'tx_123', ...req };
};

const paymentPipeline = pipeAsyncSideEffect(
  validatePayment,
  checkBalance,
  processPayment
);

// runPipeResult는 파이프라인 밖에서 호출해야 합니다
const result = await runPipeResult(paymentPipeline({
  amount: 150,
  currency: 'KRW',
  userId: 'user_1'
}));

console.log(result);
// { error: '잔액 부족', balance: 100, required: 150 }`}
    />

    <div class="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20 p-4 mb-6 rounded-r">
      <p class="text-sm md:text-base text-orange-800 dark:text-orange-200 leading-relaxed">
        <span class="font-medium">⚠️ 중요:</span>
        <br />
        <br />
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">runPipeResult()</code>와{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">matchSideEffect()</code>는{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">pipeAsyncSideEffect</code> 체인{' '}
        <strong>밖에서</strong> 호출해야 합니다.
        <br />
        <br />
        파이프라인 내부에서 사용하면 타입 안전성이 깨지고 <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">unknown</code> 또는{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">SideEffect&lt;any&gt;</code> 타입을 반환합니다.
        <br />
        <br />
        항상: <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">await runPipeResult(pipeline(input))</code>
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      관련 함수
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/async/pipeAsync"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/pipeAsync');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          pipeAsync →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          SideEffect 조기 종료 없이 순수하게 비동기 합성합니다.
        </p>
      </a>

      <a
        href="/composition/pipeSideEffect"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipeSideEffect');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          pipeSideEffect →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          동기 파이프라인에서 SideEffect 조기 종료를 지원합니다.
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
          조건부로 파이프라인을 멈추는 지연 실행 컨테이너.
        </p>
      </a>
    </div>
  </div>
);

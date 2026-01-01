import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const PipeAsyncSideEffect = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      pipeAsyncSideEffect
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Async pipelines with SideEffect short-circuiting
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is pipeAsyncSideEffect?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        pipeAsyncSideEffect
      </strong>{' '}
      composes async/sync functions like <strong>pipeAsync</strong>, while allowing a{' '}
      <strong class="font-semibold">SideEffect</strong> to halt the pipeline. It accepts a SideEffect as input and
      returns it unchanged. Use <strong>pipeAsync</strong> for pure async pipelines.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsyncSideEffect, SideEffect, runPipeResult } from 'fp-kit';

const fetchUser = async (id: string) => ({ id, verified: false });

const checkVerified = (user: { id: string; verified: boolean }) =>
  user.verified
    ? user
    : SideEffect.of(() => ({ error: 'Email not verified', userId: user.id }));

const userPipeline = pipeAsyncSideEffect(fetchUser, checkVerified);

// runPipeResult must be called OUTSIDE the pipeline
const result = await runPipeResult(userPipeline('123'));
// { error: 'Email not verified', userId: '123' }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
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

// ... up to 5 functions
function pipeAsyncSideEffect(...funcs: Array<(input: any) => any>): (input: any) => Promise<any>;`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Each step can return a value, a SideEffect, or a Promise of either. If a SideEffect appears,
      the pipeline stops immediately and returns it.
    </p>

    <div class="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 p-4 mb-6 rounded-r mt-6">
      <p class="text-sm md:text-base text-red-800 dark:text-red-200 leading-relaxed">
        <span class="font-medium">🚨 Critical: runPipeResult Type Safety</span>
        <br />
        <br />
        <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">runPipeResult&lt;T, R=any&gt;</code> has a default type parameter <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">R=any</code>.
        <br />
        <br />
        ❌ <strong>Using runPipeResult without type narrowing returns <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">any</code> type:</strong>
        <br />
        <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded text-xs">const result = runPipeResult(pipeline(data)); // result: any</code>
        <br />
        <br />
        ✅ <strong>For precise type safety, use <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">isSideEffect</code> type guard:</strong>
        <br />
        <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded text-xs">if (!isSideEffect(result)) {'{'} /* exact type */ {'}'}</code>
        <br />
        <br />
        Or explicitly provide type parameters:
        <br />
        <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded text-xs">runPipeResult&lt;SuccessType, ErrorType&gt;(result)</code>
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Working with SideEffect
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Async Validation with Early Exit
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
  // Simulate API call
  return {
    id,
    email: 'user@example.com',
    verified: false
  };
};

const checkVerified = (user: User) => {
  if (!user.verified) {
    return SideEffect.of(() => ({
      error: 'Email not verified',
      userId: user.id
    }));
  }
  return user;
};

const sendNotification = async (user: User) => {
  console.log(\`Sending notification to \${user.email}\`);
  return { sent: true, userId: user.id };
};

const notifyUserPipeline = pipeAsyncSideEffect(
  fetchUser,
  checkVerified,
  sendNotification  // This won't execute if user is not verified
);

// runPipeResult must be called OUTSIDE the pipeline
const result = await runPipeResult(notifyUserPipeline('123'));
console.log(result);  // { error: 'Email not verified', userId: '123' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      API Error Handling
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsyncSideEffect, SideEffect, runPipeResult } from 'fp-kit';

const fetchData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    // Return SideEffect for error handling
    return SideEffect.of(async () => {
      const error = await response.text();
      throw new Error(\`API Error: \${error}\`);
    }, 'api-error');
  }
  return response.json();
};

const validateData = (data: any) => {
  if (!data.id) {
    return SideEffect.of(() => {
      throw new Error('Invalid data: missing id');
    });
  }
  return data;
};

const processData = async (data: any) => {
  console.log('Processing:', data.id);
  return { processed: true, ...data };
};

const dataPipeline = pipeAsyncSideEffect(
  fetchData,
  validateData,
  processData
);

// runPipeResult must be called OUTSIDE the pipeline
try {
  const result = await runPipeResult(dataPipeline('https://api.example.com/data'));
  console.log('Success:', result);
} catch (err) {
  console.error('Caught error:', err.message);
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Conditional Async Operations
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
      error: 'Invalid amount',
      amount: req.amount
    }));
  }
  return req;
};

const checkBalance = async (req: PaymentRequest) => {
  // Simulate balance check
  const balance = 100;
  if (balance < req.amount) {
    return SideEffect.of(() => ({
      error: 'Insufficient funds',
      balance,
      required: req.amount
    }));
  }
  return req;
};

const processPayment = async (req: PaymentRequest) => {
  console.log(\`Processing payment: \${req.amount} \${req.currency}\`);
  return { success: true, transactionId: 'tx_123', ...req };
};

const paymentPipeline = pipeAsyncSideEffect(
  validatePayment,
  checkBalance,
  processPayment
);

// runPipeResult must be called OUTSIDE the pipeline
const result = await runPipeResult(paymentPipeline({
  amount: 150,
  currency: 'USD',
  userId: 'user_1'
}));

console.log(result);
// { error: 'Insufficient funds', balance: 100, required: 150 }`}
    />

    <div class="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20 p-4 mb-6 rounded-r">
      <p class="text-sm md:text-base text-orange-800 dark:text-orange-200 leading-relaxed">
        <span class="font-medium">⚠️ Important:</span>
        <br />
        <br />
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">runPipeResult()</code> and{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">matchSideEffect()</code> must be called{' '}
        <strong>OUTSIDE</strong> the <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">pipeAsyncSideEffect</code> chain.
        <br />
        <br />
        Using them inside the pipeline will break type safety and return <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">unknown</code> or{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">SideEffect&lt;any&gt;</code> types.
        <br />
        <br />
        Always: <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">await runPipeResult(pipeline(input))</code>
      </p>
    </div>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      SideEffect Composition Rule
    </h3>

    <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 mb-6 rounded-r">
      <p class="text-sm md:text-base text-purple-800 dark:text-purple-200 leading-relaxed">
        <span class="font-medium">🔄 Critical Rule: SideEffect Contagion</span>
        <br />
        <br />
        Once you use <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">pipeAsyncSideEffect</code>, the result is <strong>always <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">Promise&lt;T | SideEffect&gt;</code></strong>.
        <br />
        <br />
        If you want to continue composing this result, you <strong>MUST</strong> keep using <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">pipeAsyncSideEffect</code>.
        You <strong>CANNOT</strong> switch back to <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">pipeAsync</code> because it doesn't handle SideEffect.
      </p>
    </div>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsync, pipeAsyncSideEffect, SideEffect } from 'fp-kit';

const validateUserPipeline = pipeAsyncSideEffect(
  fetchUser,
  validateAge
);
// Result type: Promise<User | SideEffect>

// ❌ WRONG - pipeAsync cannot handle SideEffect
const wrongPipeline = pipeAsync(
  validateUserPipeline,  // Returns Promise<User | SideEffect>
  (user) => user.email   // Type error! SideEffect has no 'email' property
);

// ✅ CORRECT - Keep using pipeAsyncSideEffect
const correctPipeline = pipeAsyncSideEffect(
  validateUserPipeline,  // Promise<User | SideEffect> - handled correctly
  (user) => user.email,  // Automatically skipped if SideEffect
  sendEmail
);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Related Functions
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
          Pure async composition without SideEffect short-circuiting.
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
          Sync pipelines with SideEffect short-circuiting.
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
          Deferred execution container for conditional pipeline halting.
        </p>
      </a>
    </div>
  </div>
);

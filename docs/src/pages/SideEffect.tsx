import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const SideEffect = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      SideEffect
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Deferred execution container for SideEffect-aware pipelines
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is SideEffect?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/20 px-2 py-1 rounded">
        SideEffect
      </strong>{' '}
      is a container that wraps an effect (function) for deferred execution. When a function in a pipeSideEffect/pipeAsyncSideEffect returns a SideEffect,
      the pipeline immediately stops and returns the SideEffect without executing it. The effect only runs when you explicitly
      call <code class="text-sm">runPipeResult()</code> or <code class="text-sm">sideEffect.effect()</code>.
      This pattern enables clean error handling and early termination in functional pipelines without wrapper types everywhere.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { SideEffect, pipeSideEffect, runPipeResult } from 'fp-kit';

// Create a SideEffect that will execute later
const validateAge = (age: number) =>
  age >= 18
    ? age
    : SideEffect.of(() => {
        console.log('Age validation failed');
        return null;
      });

const processAgePipeline = pipeSideEffect(
  validateAge,
  (age) => age * 2,      // Skipped if SideEffect returned
  (age) => \`Age: \${age}\`
);

// runPipeResult must be called OUTSIDE the pipeline
runPipeResult(processAgePipeline(15)); // Logs "Age validation failed", returns null`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`class SideEffect<T = any> {
  constructor(effect: () => T, label?: string);

  static of<T>(effect: () => T, label?: string): SideEffect<T>;

  effect(): T;
  label?: string;
}

// Type guard
function isSideEffect(value: unknown): value is SideEffect;

// Pattern matching
function matchSideEffect<T, R>(
  value: T | SideEffect,
  handlers: {
    value: (v: T) => R;
    effect: (se: SideEffect) => R;
  }
): R;

// Execute SideEffect or return value
function runPipeResult<T, R>(value: T | SideEffect<R>): T | R;`}
    />

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
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Validation with Early Exit
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-kit';

interface FormData {
  email: string;
  age: number;
}

const validateEmail = (data: FormData) =>
  data.email.includes('@')
    ? data
    : SideEffect.of(() => {
        throw new Error('Invalid email');
      });

const validateAge = (data: FormData) =>
  data.age >= 18
    ? data
    : SideEffect.of(() => {
        throw new Error('Must be 18 or older');
      });

const processFormPipeline = pipeSideEffect(
  validateEmail,
  validateAge,
  (data) => ({ success: true, data })
);

// runPipeResult must be called OUTSIDE the pipeline
try {
  runPipeResult(processFormPipeline({ email: 'test@example.com', age: 25 }));
  // { success: true, data: { email: 'test@example.com', age: 25 } }

  runPipeResult(processFormPipeline({ email: 'invalid', age: 25 }));
  // Throws: Error: Invalid email
} catch (err) {
  console.error(err.message);
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Optional Chaining Pattern
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-kit';

interface User {
  id: string;
  profile?: {
    settings?: {
      theme: string;
    };
  };
}

const findUser = (id: string): User | SideEffect => {
  const user = database.get(id);
  return user ? user : SideEffect.of(() => null);
};

const getUserThemePipeline = pipeSideEffect(
  findUser,
  (user) => user.profile ?? SideEffect.of(() => null),
  (profile) => profile.settings ?? SideEffect.of(() => null),
  (settings) => settings.theme
);

// runPipeResult must be called OUTSIDE the pipeline
runPipeResult(getUserThemePipeline('user-123')); // 'dark' or null if any step fails`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Error Handling with Side Effects
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-kit';

interface PaymentData {
  amount: number;
  userId: string;
}

const validateAmount = (payment: PaymentData) =>
  payment.amount > 0
    ? payment
    : SideEffect.of(() => {
        logError('Invalid amount', payment);
        showToast('Payment amount must be positive');
        return null;
      });

const checkBalance = (payment: PaymentData) => {
  const balance = getUserBalance(payment.userId);
  return balance >= payment.amount
    ? payment
    : SideEffect.of(() => {
        logError('Insufficient balance', { payment, balance });
        showToast(\`Insufficient funds. Balance: $\${balance}\`);
        return null;
      });
};

const processPaymentPipeline = pipeSideEffect(
  validateAmount,
  checkBalance,
  (payment) => chargeCard(payment),
  (result) => ({ success: true, ...result })
);

// runPipeResult must be called OUTSIDE the pipeline
const result = runPipeResult(processPaymentPipeline({ amount: -10, userId: 'user-1' }));
// Logs error, shows toast, returns null`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Pattern Matching with matchSideEffect
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, matchSideEffect } from 'fp-kit';

const divide = (a: number, b: number) =>
  b !== 0
    ? a / b
    : SideEffect.of(() => 'Division by zero', 'DIV_ZERO');

const calculate = pipeSideEffect(
  (x: number) => divide(x, 0),
  (result) => result * 2
);

const result = calculate(10);

// Handle both regular values and SideEffects
const output = matchSideEffect(result, {
  value: (v) => \`Result: \${v}\`,
  effect: (se) => {
    console.log(\`Error: \${se.label}\`);
    return se.effect(); // Manually execute to get the value
  }
});

console.log(output); // "Division by zero"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Type Guard with isSideEffect
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">isSideEffect</code> provides <strong>precise type narrowing</strong> for handling pipeline results.
      Unlike <code class="text-sm">runPipeResult</code> or <code class="text-sm">matchSideEffect</code>, it narrows the type
      in both branches, giving you exact type inference for success and error paths.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, isSideEffect, runPipeResult } from 'fp-kit';

const processNumbers = pipeSideEffect(
  (nums: number[]) => nums.filter(n => n % 2 === 1),
  (odds) => odds.length > 0
    ? odds
    : SideEffect.of(() => 'No odd numbers found'),
  (odds) => odds.map(n => n * 2)
);

const oddsDoubled = processNumbers([1, 2, 3, 4, 5]);

// ✅ Type-safe branching with precise inference
if (!isSideEffect(oddsDoubled)) {
  // TypeScript knows: oddsDoubled is number[]
  const result: number = oddsDoubled.reduce((a, b) => a + b, 0);
  console.log(\`Sum: \${result}\`);  // result: number (exact type!)
} else {
  // TypeScript knows: oddsDoubled is SideEffect<string>
  const result = runPipeResult<number[], string>(oddsDoubled);
  console.log(\`Error: \${result}\`);  // result: string (exact type!)
}

// ❌ Without isSideEffect - less precise types
const result = runPipeResult(oddsDoubled);
// result: number[] | string (union type - less precise)`}
    />

    <div class="bg-blue-50 dark:bg-blue-900/20 p-4 mb-6 rounded border border-blue-200 dark:border-blue-800">
      <p class="text-sm md:text-base text-blue-800 dark:text-blue-200 leading-relaxed">
        <span class="font-medium">💡 When to use isSideEffect:</span>
        <br />
        <br />
        <strong>Use <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">isSideEffect</code></strong> when you need{' '}
        <strong>precise type inference</strong> for both success and error paths.
        <br />
        <br />
        ⚠️ <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">runPipeResult</code> without type narrowing returns <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">any</code> type due to default <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">R=any</code> parameter.
        <br />
        Only use <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">runPipeResult</code> when you don't need precise types or when providing explicit type parameters.
        <br />
        <br />
        Use <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">matchSideEffect</code> for pattern matching when you want to transform both cases to the same return type.
      </p>
    </div>

    <div class="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20 p-4 mb-6 rounded-r mt-6">
      <p class="text-sm md:text-base text-orange-800 dark:text-orange-200 leading-relaxed">
        <span class="font-medium">⚠️ Important:</span>
        <br />
        <br />
        SideEffect is <strong>never auto-executed</strong>. When a pipeSideEffect/pipeAsyncSideEffect encounters a SideEffect, it stops and returns it.
        You must explicitly call{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">runPipeResult()</code> or{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">sideEffect.effect()</code> to execute it.
        <br />
        <br />
        This gives you complete control over when and how side effects run, enabling clean error handling
        without breaking functional composition.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Related Functions
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/composition/pipeSideEffect"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipeSideEffect');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          pipeSideEffect →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Compose functions left-to-right with SideEffect short-circuiting.
        </p>
      </a>

      <a
        href="/async/pipeAsyncSideEffect"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/pipeAsyncSideEffect');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          pipeAsyncSideEffect →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Async composition with SideEffect short-circuiting.
        </p>
      </a>

      <a
        href="/control/tryCatch"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/tryCatch');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          tryCatch →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Handle exceptions functionally - alternative to SideEffect for simple cases.
        </p>
      </a>
    </div>
  </div>
);

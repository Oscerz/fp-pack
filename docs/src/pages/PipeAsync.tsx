import { CodeBlock } from '@/components/CodeBlock';

export const PipeAsync = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      pipeAsync
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Compose async (or mixed) functions left-to-right, returning a function
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is pipeAsync?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        pipeAsync
      </strong>{' '}
      takes async/sync functions and returns a new function. Calling it runs each step in order, awaiting promises as
      needed. Signature: <code>pipeAsync(fn1, fn2, ...)(value)</code>.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsync } from 'fp-kit';

const fn = pipeAsync(
  async (n: number) => n + 1,
  async (n) => n * 2
);

const result = await fn(2); // 6`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Mix sync and async
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsync } from 'fp-kit';

const fetchUser = async (id: string) => ({ id, name: 'Ada' });
const getName = (u: { name: string }) => u.name;

const getUserName = pipeAsync(fetchUser, getName);

await getUserName('42'); // 'Ada'`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Working with SideEffect
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      pipeAsync supports the <strong class="font-semibold">SideEffect</strong> container for deferred execution.
      When pipeAsync encounters a SideEffect, it immediately stops the pipeline and returns the SideEffect without executing it.
      <br />
      <br />
      This is especially useful in async workflows where you want to conditionally halt execution and handle errors or authorization checks.
    </p>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Async Validation with Early Exit
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsync, SideEffect, runPipeResult } from 'fp-kit';

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

const notifyUser = pipeAsync(
  fetchUser,
  checkVerified,
  sendNotification,  // This won't execute if user is not verified
  runPipeResult  // Auto-execute SideEffect if present
);

// Unverified user - gets error immediately
const result = await notifyUser('123');
console.log(result);  // { error: 'Email not verified', userId: '123' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      API Error Handling
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsync, SideEffect, runPipeResult } from 'fp-kit';

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

const pipeline = pipeAsync(
  fetchData,
  validateData,
  processData,
  runPipeResult  // Auto-execute SideEffect if present
);

// Errors are thrown immediately
try {
  const result = await pipeline('https://api.example.com/data');
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
      code={`import { pipeAsync, SideEffect, runPipeResult } from 'fp-kit';

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

const payment = pipeAsync(
  validatePayment,
  checkBalance,
  processPayment,
  runPipeResult  // Auto-execute SideEffect if present
);

// Try payment with insufficient funds
const result = await payment({
  amount: 150,
  currency: 'USD',
  userId: 'user_1'
});

console.log(result);
// { error: 'Insufficient funds', balance: 100, required: 150 }`}
    />

    <div class="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20 p-4 mb-6 rounded-r">
      <p class="text-sm md:text-base text-orange-800 dark:text-orange-200 leading-relaxed">
        <span class="font-medium">⚠️ Important:</span>
        <br />
        <br />
        In pipeAsync, when a SideEffect is encountered, the pipeline immediately stops and returns it.
        The SideEffect itself is <strong>never auto-executed</strong> - you must explicitly call{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">runPipeResult()</code> or{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">await sideEffect.effect()</code> to run it.
        <br />
        <br />
        This gives you complete control over async error handling and conditional execution.
      </p>
    </div>
  </div>
);

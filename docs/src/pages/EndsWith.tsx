import { CodeBlock } from '@/components/CodeBlock';

export const EndsWith = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      endsWith
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Check if a string ends with a given suffix
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is endsWith?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        endsWith
      </strong>{' '}
      checks whether a string or array ends with the given suffix. Useful for file extensions, URL paths, and simple
      pattern checks in pipelines. Works with both strings and arrays.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { endsWith } from 'fp-kit';

endsWith('c', 'abc');  // true
endsWith('b', 'abc');  // false

endsWith(['c'], ['a', 'b', 'c']);  // true
endsWith(['b'], ['a', 'b', 'c']);  // false`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Filtering file names
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { endsWith } from 'fp-kit';

const files = ['main.js', 'styles.css', 'utils.ts', 'index.js'];

const jsFiles = files.filter(name => endsWith('.js', name));
// ['main.js', 'index.js']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Routing helpers
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { endsWith } from 'fp-kit';

['/users', '/v1/api', '/about'].filter(path => endsWith('/api', path));
// ['/v1/api']`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
      Need the opposite check? See{' '}
      <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">startsWith</code>.
    </p>
  </div>
);

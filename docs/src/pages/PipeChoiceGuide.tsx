

export const PipeChoiceGuide = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
      Choosing Your Pipe
    </h1>
    <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
      A Deep Dive into Flexibility vs. Strictness
    </p>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      A core design philosophy of fp-pack is providing tools that balance **Developer Experience (DX)** and **Type Safety**. This is most evident in the different `pipe` variants. Understanding this trade-off is key to using the library effectively.
    </p>

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      Perspective: Why `pipe` Prioritizes Flexible Inference
    </h3>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      The default <code class="text-sm">pipe</code> and <code class="text-sm">pipeAsync</code> are intentionally designed to be "inference-friendly" above all else. Their primary goal is to provide a smooth development experience by intelligently inferring the final output type of a pipeline, even if intermediate steps are complex or generic.
    </p>
    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      This is fp-pack's core differentiator from many other libraries. Instead of forcing you to add manual type annotations the moment a generic function is introduced, <code class="text-sm">pipe</code> looks at the entire chain and "solves" the final type.
    </p>
    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong>The Advantage:</strong> You can compose complex generic functions with minimal friction. The "magic" of the inference engine just works.
      <br />
      <strong>The Trade-off:</strong> To achieve this, it must be more lenient. It may not catch all intermediate type mismatches (like <code class="text-sm">number</code> &rarr; <code class="text-sm">string</code>). This perspective argues that the productivity gain from seamless inference in complex cases outweighs the risk of simple errors that a skilled developer can easily find during testing anyway. Sacrificing the library's most powerful weapon (flexible inference) just to catch such simple errors would be a significant loss.
    </p>

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      When to Enforce Safety: The `Strict` Variants
    </h3>
    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      <code class="text-sm">pipeStrict</code> and <code class="text-sm">pipeAsyncStrict</code> adopt the opposite philosophy. They prioritize **type safety at every step**.
    </p>
    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong>The Advantage:</strong> They will immediately flag any type mismatch between one function's output and the next's input, preventing a whole class of bugs at compile time.
      <br />
      <strong>The Trade-off:</strong> This strictness can sometimes interfere with TypeScript's ability to infer types across a complex generic pipeline, forcing you to provide explicit type hints where the default <code class="text-sm">pipe</code> would not have required them.
    </p>

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      The Same Trade-off for `SideEffect` Pipes
    </h3>
    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      This same philosophy extends to SideEffect pipelines, with an added dimension: the precision of the final <code class="text-sm">SideEffect</code> type.
    </p>
    <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li>
        <strong class="font-semibold">`pipeSideEffect` / `pipeAsyncSideEffect` (Flexible):</strong> These prioritize a smooth developer experience. They are perfect when you want to handle all failures in a general way (e.g., log and return null). However, they often widen the final SideEffect type to <code class="text-sm">SideEffect&lt;any&gt;</code>, losing the specific types of different failure cases.
      </li>
      <li>
        <strong class="font-semibold">`pipeSideEffectStrict` / `pipeAsyncSideEffectStrict` (Safe):</strong> These prioritize type safety. They guarantee the final SideEffect type is a precise union of all possible effects in the pipeline (e.g., <code class="text-sm">SideEffect&lt;'NO_USER' | 'INSUFFICIENT_FUNDS'&gt;</code>). This is essential when you need to programmatically distinguish between failure types and handle them with full type safety.
      </li>
    </ul>

    <div class="overflow-x-auto mb-6">
      <table class="min-w-full border border-gray-300 dark:border-gray-700">
        <thead class="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700">
              Pipe Variant
            </th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700">
              Primary Goal
            </th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700">
              Best For
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-900">
          <tr class="border-b border-gray-200 dark:border-gray-800">
            <td class="px-4 py-3 text-sm">
              <code class="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">pipe</code> / <code class="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">pipeAsync</code>
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Inference & DX
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Most use cases, especially with complex generics.
            </td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-gray-800">
            <td class="px-4 py-3 text-sm">
              <code class="text-xs bg-emerald-100 dark:bg-emerald-900 px-2 py-1 rounded">pipeStrict</code> / <code class="text-xs bg-emerald-100 dark:bg-emerald-900 px-2 py-1 rounded">pipeAsyncStrict</code>
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Type Safety
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Critical code paths where intermediate type correctness must be guaranteed.
            </td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-gray-800">
            <td class="px-4 py-3 text-sm">
              <code class="text-xs bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">pipeSideEffect</code> / <code class="text-xs bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">pipeAsyncSideEffect</code>
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              General Failure Handling
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Handling all failures in a uniform way (e.g., logging, showing a generic error).
            </td>
          </tr>
          <tr>
            <td class="px-4 py-3 text-sm">
              <code class="text-xs bg-green-100 dark:bg-green-900 px-2 py-1 rounded">pipeSideEffectStrict</code> / <code class="text-xs bg-green-100 dark:bg-green-900 px-2 py-1 rounded">pipeAsyncSideEffectStrict</code>
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Precise Failure Handling
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              When you need to programmatically distinguish between different error types.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

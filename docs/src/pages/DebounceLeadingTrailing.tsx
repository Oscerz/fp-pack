import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const DebounceLeadingTrailing = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      debounceLeadingTrailing
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Execute immediately on first call and again with the final value after calls stop
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is debounceLeadingTrailing?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        debounceLeadingTrailing
      </strong>{' '}
      combines the benefits of both{' '}
      <strong class="font-semibold">debounceLeading</strong> and{' '}
      <strong class="font-semibold">debounce</strong>. It executes immediately on the first call to provide instant feedback, then executes once more with the final value after the burst of calls stops.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      This pattern is ideal when you need <strong>immediate user feedback</strong> (like starting a loading indicator) while also ensuring the <strong>final state is synchronized</strong> (like executing the final search query).
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function debounceLeadingTrailing<T extends (...args: any[]) => any>(
  fn: T,              // Function to debounce
  wait: number        // Delay in milliseconds
): (...args: Parameters<T>) => void`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      1. Simple Leading+Trailing Debounce
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeadingTrailing } from 'fp-kit';

const log = debounceLeadingTrailing((value: string) => {
  console.log('Value:', value);
}, 300);

log('a'); // Executes immediately: "Value: a"
log('b'); // Ignored (within 300ms)
log('c'); // Ignored (within 300ms)
// After 300ms: "Value: c" (executes with final value)

// Timeline:
// 0ms:   log('a') → executes immediately
// 50ms:  log('b') → ignored
// 100ms: log('c') → ignored
// 400ms: → executes with 'c' (300ms after last call)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      2. Search with Instant Feedback
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeadingTrailing } from 'fp-kit';

const search = debounceLeadingTrailing((query: string) => {
  if (!isSearching) {
    // First call: show loading
    setIsSearching(true);
  } else {
    // Final call: execute search
    performSearch(query);
    setIsSearching(false);
  }
}, 500);

// User types "react hooks"
search('r');      // Shows loading immediately
search('re');     // Ignored
search('rea');    // Ignored
search('reac');   // Ignored
search('react');  // Ignored
search('react '); // Ignored
search('react h'); // Ignored
// After 500ms: executes search for "react hooks"`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      1. Range Slider with Preview
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Update the UI immediately when the user starts dragging, then save to the server when they finish:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeadingTrailing } from 'fp-kit';

let isFirstCall = true;

const handleVolumeChange = debounceLeadingTrailing((volume: number) => {
  if (isFirstCall) {
    // First call: update UI immediately
    updateVolumeDisplay(volume);
    isFirstCall = false;
  } else {
    // Final call: save to server
    saveVolumePreference(volume);
    isFirstCall = true;
  }
}, 500);

// User drags slider
sliderInput.addEventListener('input', (e) => {
  const volume = parseInt(e.target.value);
  audioElement.volume = volume / 100; // Update audio immediately
  handleVolumeChange(volume);         // Debounced UI update + save
});

// Result:
// - Volume changes instantly (audio playback)
// - UI feedback appears immediately (first call)
// - Server save happens only after user finishes adjusting (final call)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      2. Live Editor with Auto-Save
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Show preview immediately when user starts typing, save draft when they pause:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeadingTrailing } from 'fp-kit';

let isEditing = false;

const handleContentChange = debounceLeadingTrailing((content: string) => {
  if (!isEditing) {
    // First call: show editing indicator
    setEditingIndicator(true);
    updatePreview(content);
    isEditing = true;
  } else {
    // Final call: save draft
    saveDraft(content);
    setEditingIndicator(false);
    isEditing = false;
  }
}, 1000);

editorTextarea.addEventListener('input', (e) => {
  handleContentChange(e.target.value);
});

// User types: "Hello world"
// - First keystroke: preview updates + editing indicator shows
// - While typing: preview keeps updating (application-level)
// - 1 second after last keystroke: draft is saved`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      3. Canvas Drawing with History
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeadingTrailing } from 'fp-kit';

let isDrawing = false;

const handleDrawingChange = debounceLeadingTrailing((canvasData: ImageData) => {
  if (!isDrawing) {
    // First call: mark drawing start
    startDrawingSession();
    isDrawing = true;
  } else {
    // Final call: save to undo history
    saveToHistory(canvasData);
    isDrawing = false;
  }
}, 800);

canvas.addEventListener('mousemove', (e) => {
  if (e.buttons === 1) { // If mouse is pressed
    const imageData = drawBrushStroke(e.x, e.y);
    handleDrawingChange(imageData);
  }
});

// Result:
// - Drawing appears immediately on canvas
// - First stroke marks session start
// - History snapshot saved only when user stops drawing`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      4. Search with Loading States
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeadingTrailing } from 'fp-kit';

let searchState = 'idle';

const performSearch = debounceLeadingTrailing(async (query: string) => {
  if (searchState === 'idle') {
    // First call: show loading
    searchState = 'loading';
    setLoadingIndicator(true);
  } else {
    // Final call: execute search
    try {
      const results = await searchAPI(query);
      displayResults(results);
    } catch (error) {
      showError(error);
    } finally {
      setLoadingIndicator(false);
      searchState = 'idle';
    }
  }
}, 500);

searchInput.addEventListener('input', (e) => {
  performSearch(e.target.value);
});

// User types: "typescript"
// Immediately: loading spinner appears
// After 500ms: API call with "typescript"
// Benefits: instant feedback + reduced API calls`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      5. Filter UI with Client + Server Updates
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeadingTrailing } from 'fp-kit';

let filterState = 'ready';

const applyFilter = debounceLeadingTrailing((filters: FilterOptions) => {
  if (filterState === 'ready') {
    // First call: apply client-side filter immediately
    const cachedResults = filterCachedData(filters);
    displayResults(cachedResults);
    filterState = 'filtering';
  } else {
    // Final call: fetch from server
    fetchFilteredData(filters).then((results) => {
      displayResults(results);
      filterState = 'ready';
    });
  }
}, 600);

filterForm.addEventListener('change', () => {
  const filters = getFormValues();
  applyFilter(filters);
});

// User adjusts multiple filters:
// 1st change: cached results show immediately
// Final change (after 600ms): fresh server data loads`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      6. Window Resize with Layout Recalculation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeadingTrailing } from 'fp-kit';

let resizePhase = 'start';

const handleResize = debounceLeadingTrailing(() => {
  if (resizePhase === 'start') {
    // First call: show resize indicator
    showResizeIndicator();
    quickLayoutAdjust(); // Fast, approximate layout
    resizePhase = 'resizing';
  } else {
    // Final call: full recalculation
    fullLayoutRecalculation();
    optimizeImages();
    hideResizeIndicator();
    resizePhase = 'start';
  }
}, 300);

window.addEventListener('resize', handleResize);

// User resizes window:
// - Immediate: resize indicator + quick layout
// - After 300ms: full recalculation + image optimization`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use debounceLeadingTrailing?
    </h2>

    <div class="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
        1. Best of Both Worlds
      </h3>
      <p class="text-sm md:text-base text-blue-800 dark:text-blue-200">
        Combines instant feedback (leading edge) with final state synchronization (trailing edge). Users get immediate response while you ensure the final state is correct.
      </p>
    </div>

    <div class="bg-purple-50 dark:bg-purple-900/10 border-l-4 border-purple-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
        2. Optimized Performance
      </h3>
      <p class="text-sm md:text-base text-purple-800 dark:text-purple-200">
        Reduces expensive operations (API calls, database saves) to just two: one at start, one at end. All intermediate calls are ignored, saving resources while maintaining responsiveness.
      </p>
    </div>

    <div class="bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
        3. Improved User Experience
      </h3>
      <p class="text-sm md:text-base text-green-800 dark:text-green-200">
        Users see instant feedback when they start an action, then the system finalizes with the accurate result. This pattern feels natural and responsive.
      </p>
    </div>

    <div class="bg-orange-50 dark:bg-orange-900/10 border-l-4 border-orange-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3">
        4. State Management Simplification
      </h3>
      <p class="text-sm md:text-base text-orange-800 dark:text-orange-200">
        Makes it easy to handle "start" and "end" events in rapid user interactions without complex state tracking. The pattern naturally handles loading states, progress indicators, and final synchronization.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Here's how <strong>debounceLeadingTrailing</strong> works internally:
    </p>

    <CodeBlock
      language="typescript"
      code={`function debounceLeadingTrailing<T extends (...args: any[]) => any>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let isFirstCall = true;

  return (...args: Parameters<T>) => {
    // If this is the first call, execute immediately
    if (isFirstCall) {
      fn(...args);
      isFirstCall = false;
    }

    // Clear any existing timeout
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    // Set new timeout for trailing execution
    timeoutId = setTimeout(() => {
      fn(...args);           // Execute with final arguments
      timeoutId = null;
      isFirstCall = true;    // Reset for next burst
    }, wait);
  };
}`}
    />

    <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 my-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        How it works:
      </h3>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>
          <strong>First Call Detection:</strong> Tracks whether this is the first call in a burst using <code>isFirstCall</code> flag
        </li>
        <li>
          <strong>Immediate Execution:</strong> If it's the first call, execute the function immediately
        </li>
        <li>
          <strong>Timeout Reset:</strong> Clear any existing timeout to restart the wait period
        </li>
        <li>
          <strong>Trailing Execution:</strong> Set a new timeout to execute with the final arguments
        </li>
        <li>
          <strong>State Reset:</strong> After trailing execution, reset flags for the next burst
        </li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Related Functions
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        class="block p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/debounce');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          debounce
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Execute only the final call after a burst (trailing edge only)
        </p>
      </a>

      <a
        class="block p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/debounceLeading');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          debounceLeading
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Execute only the first call in a burst (leading edge only)
        </p>
      </a>

      <a
        class="block p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/throttle');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          throttle
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Execute at most once per time period
        </p>
      </a>

      <a
        class="block p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/delay');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          delay
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Create a promise that resolves after a specified time
        </p>
      </a>
    </div>
  </div>
);

/** @jsxImportSource @kitajs/html */

export const Spinner = () => (
  <svg class="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
    <circle
      class="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
      fill="none"
    />
    <path
      class="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
    />
  </svg>
);

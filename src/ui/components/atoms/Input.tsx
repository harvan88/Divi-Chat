/** @jsxImportSource @kitajs/html */

interface InputProps extends JSX.HtmlInputTag {
  class?: string;
}

export const Input = ({ class: className = '', ...props }: InputProps) => (
  <input
    {...props}
    class={`flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
  />
);

/** @jsxImportSource @kitajs/html */

interface ButtonProps extends JSX.HtmlButtonTag {
  children: JSX.Element | string;
  class?: string;
  type?: 'submit' | 'button' | 'reset';
}

export const Button = ({
  children= 'Casa',
  class: className = '',
  type = 'submit',
  ...props
}: ButtonProps) => (
  <button
    {...props}
    type={type}
    class={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${className}`}
  >
    {children}
  </button>
);

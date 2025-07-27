/** @jsxImportSource @kitajs/html */

interface ChatWindowProps {
  children: JSX.Element | string;
}

export const ChatWindow = ({ children }: ChatWindowProps) => (
  <div
    {...{
      id: 'messages',
      class: 'flex-1 overflow-y-auto px-4 py-2 space-y-2',
      'x-init': '$el.scrollTop = $el.scrollHeight',
      'x-on:htmx:afterSwap': '$el.scrollTop = $el.scrollHeight'
    }}
  >
    {children}
  </div>
);

/** @jsxImportSource @kitajs/html */

import { Input } from '@/ui/components/atoms/Input';
import { Button } from '@/ui/components/atoms/Button';
import { Icon } from '@/ui/components/atoms/Icon';
import { Spinner } from '@/ui/components/atoms/Spinner';

interface MessageFormProps {
  phone: string;
}

export const MessageForm = ({ phone }: MessageFormProps) => (
  <form
    {...{
      'hx-post': '/debug/send',
      'hx-target': '#messages',
      'hx-swap': 'beforeend',
      _: 'on htmx:beforeRequest add .opacity-50 to me',
      class: 'flex gap-2 items-center border-t border-gray-200 p-2',
      'x-data': '{ loading: false }',
      'x-on:submit': 'loading = true',
      'x-on:htmx:afterRequest': 'loading = false'
    }}
  >
    <input type="hidden" name="phone" value={phone} />
    {Input({
      name: 'text',
      placeholder: 'Escribí algo...',
      class: 'flex-1',
      required: true
    })}
    {Button({
      type: 'submit',
      class: 'min-w-[48px] h-[48px] rounded-full p-0',
      children: `
        <span x-show="!loading">${Icon.Send()}</span>
        <span x-show="loading" class="flex justify-center items-center">
          ${Spinner()}
        </span>
      `
    })}
  </form>
);

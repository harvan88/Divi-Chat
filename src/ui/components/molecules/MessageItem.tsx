/** @jsxImportSource @kitajs/html */

import { Icon } from '@/ui/components/atoms/Icon';

interface MessageItemProps {
  role: 'user' | 'bot' | 'openai';
  text: string;
}

export const MessageItem = ({ role, text }: MessageItemProps) => {
  const isUser = role === 'user';
  const isBot = role === 'bot';
  const isAI = role === 'openai';

  const alignment = isUser ? 'justify-end' : 'justify-start';
  const bubbleColor = isUser
    ? 'bg-blue-600 text-white'
    : isBot
    ? 'bg-gray-200 text-gray-900'
    : 'bg-green-100 text-green-900';

  const icon = isUser ? Icon.User() : isBot ? Icon.Bot() : Icon.Bot();

  return (
    <div class={`flex ${alignment}`}>
      <div class="flex items-start gap-2 max-w-[80%]">
        {!isUser && <div class="mt-1">{icon}</div>}
        <div class={`px-4 py-2 rounded-xl text-sm whitespace-pre-line ${bubbleColor}`}>
          {text}
        </div>
        {isUser && <div class="mt-1">{icon}</div>}
      </div>
    </div>
  );
};

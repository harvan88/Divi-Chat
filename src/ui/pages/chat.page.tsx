/** @jsxImportSource @kitajs/html */

import { ChatWindow } from '@/ui/components/organisms/ChatWindow';
import { MessageForm } from '@/ui/components/molecules/MessageForm';
import { MessageList } from '@/ui/components/molecules/MessageList';

interface ChatPageProps {
  phone: string;
  messages: {
    role: 'user' | 'bot' | 'openai';
    text: string;
  }[];
}

export const ChatPage = ({ phone, messages }: ChatPageProps) => (
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Divi Chat</title>
      <script src="https://unpkg.com/htmx.org@1.9.6" defer></script>
      <script src="https://unpkg.com/alpinejs" defer></script>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/dist/tailwind.min.css" rel="stylesheet" />
    </head>
    <body class="h-screen flex flex-col bg-white text-gray-900">
      <main class="flex-1 flex flex-col overflow-hidden">
        {ChatWindow({
          children: MessageList({ messages })
        })}
        {MessageForm({ phone })}
      </main>
    </body>
  </html>
);

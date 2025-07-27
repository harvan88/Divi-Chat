/** @jsxImportSource @kitajs/html */

import { MessageItem } from './MessageItem';

interface Message {
  role: 'user' | 'bot' | 'openai';
  text: string;
}

interface MessageListProps {
  messages: Message[];
}

export const MessageList = ({ messages }: MessageListProps) => (
  <>
    {messages.map((msg) => MessageItem(msg))}
  </>
);

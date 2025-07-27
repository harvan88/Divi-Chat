/** @jsxImportSource @kitajs/html */
import { MessageItem } from '@/ui/components/molecules/MessageItem';

export const renderMessageItem = (role: 'user' | 'bot' | 'openai', text: string) =>
  `${MessageItem({ role, text })}`;

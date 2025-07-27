/** @jsxImportSource @kitajs/html */
import { Button } from '@/ui/components/atoms/Button';
import { Icon } from '@/ui/components/atoms/Icon';
import { Input } from '@/ui/components/atoms/Input';
import { Spinner } from '@/ui/components/atoms/Spinner';
import { MessageForm } from '@/ui/components/molecules/MessageForm';
import { MessageItem } from '@/ui/components/molecules/MessageItem';
import { MessageList } from '@/ui/components/molecules/MessageList';
import { ChatWindow } from '@/ui/components/organisms/ChatWindow';

export const previewMap = {
  button: () => Button({ children: 'Casa', class: 'bg-blue-600 text-white px-4 py-2 rounded' }),
  icon: () => Icon.Send(),
  input: () => Input({ name: 'text', placeholder: 'Escribí...', class: 'w-full p-2 border rounded' }),
  spinner: () => Spinner(),
  messageform: () => MessageForm({ phone: '123456789' }),
  messageitem: () => MessageItem({ role: 'bot', text: 'Hola desde el preview' }),
  messagelist: () => MessageList({ messages: [{ role: 'user', text: 'Hola' }, { role: 'bot', text: '¿Cómo estás?' }] }),
  chatwindow: () => ChatWindow({ children: 'Chat renderizado' }),
} as const;

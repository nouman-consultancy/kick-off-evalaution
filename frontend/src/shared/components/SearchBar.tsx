'use client';

import { useRouter } from 'next/navigation';
import ChatInputBar from './ChatInputBar';

export default function SearchBar() {
  const router = useRouter();

  return (
    <ChatInputBar
      placeholder="Type your message or use the tools below..."
      maxWidth={800}
      elevation={3}
      onSend={() => router.push('/chat-hub')}
    />
  );
}

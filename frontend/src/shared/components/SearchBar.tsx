'use client';

// SearchBar is now a thin wrapper around the shared ChatInputBar.
// All functionality (speech-to-text, audio recording, attachments,
// image/video upload, screen share, agent picker) lives in ChatInputBar.

import ChatInputBar from './ChatInputBar';

export default function SearchBar() {
  return (
    <ChatInputBar
      placeholder="Type your message or use the tools below..."
      maxWidth={800}
      elevation={3}
      onSend={({ text, audio }) => {
        console.log('SearchBar send:', { text, audio });
      }}
    />
  );
}

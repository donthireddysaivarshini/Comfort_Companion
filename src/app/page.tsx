import { ChatInterface } from '@/components/chat-interface';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/50 dark:bg-muted/10 md:p-4">
      <ChatInterface />
    </div>
  );
}

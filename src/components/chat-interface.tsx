'use client';

import { useState, useRef, useEffect } from 'react';
import type { Message } from '@/types';
import { getAIResponse } from '@/app/actions';
import { ChatMessage } from './chat-message';
import { ChatInput } from './chat-input';
import { TypingIndicator } from './typing-indicator';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { WelcomeForm } from './welcome-form';
import { Button } from './ui/button';
import { RefreshCw } from 'lucide-react';

// Helper function for a random delay
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const INITIAL_MESSAGES: Message[] = [];

// Function to get a time-based greeting
const getTimeBasedGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return "Good morning, my dear. I hope you slept well. What's on your mind as you start your day?";
  }
  if (hour >= 12 && hour < 17) {
    return "Good afternoon, sweetie. I hope you're having a gentle day. Is there anything you'd like to talk about?";
  }
  if (hour >= 17 && hour < 21) {
    return "Good evening, honey. I hope you're finding a moment to relax. How are you feeling?";
  }
  return "Oh, my dear, it's late. If there are any worries keeping you up, know that I'm here to listen.";
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isLoading]);
  
  const handleNameSubmit = (name: string) => {
    const finalName = name.trim();
    setUserName(finalName);
    startNewChat(finalName);
  };
  
  const startNewChat = (name?: string | null) => {
    let welcomeMessage;
    const finalName = name === null ? userName : name;

    if (finalName && finalName.toLowerCase() === 'dear') {
      welcomeMessage = getTimeBasedGreeting();
    } else if (finalName) {
      welcomeMessage = `It's so lovely to meet you, ${finalName}. ${getTimeBasedGreeting()}`;
    } else {
      welcomeMessage = getTimeBasedGreeting();
    }

    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: welcomeMessage,
      }
    ]);
  }

  const handleFormSubmit = async (formData: FormData) => {
    const userInput = formData.get('message') as string;
    if (!userInput.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: userInput,
    };
    
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // We only want the content and role for the history
      const history = newMessages.map(({ id, suggestions, ...rest }) => rest);
      const responsePromise = getAIResponse(history, userName ?? undefined);
      
      // Add a simulated typing delay
      await sleep(1000 + Math.random() * 1000);

      const response = await responsePromise;
      
      if (response) {
        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: response.content,
          suggestions: response.suggestions,
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error("Received an empty response from the server.");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to get a response. Please try again.",
      });
      // Rollback the optimistic update
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  if (userName === null) {
    return (
       <Card className="w-full max-w-2xl min-h-screen md:min-h-0 md:h-[90vh] md:max-h-[800px] flex flex-col md:shadow-2xl md:rounded-2xl overflow-hidden">
        <header className="p-4 border-b flex items-baseline gap-3 shrink-0">
          <h1 className="text-xl font-headline font-semibold text-foreground">💜 Comfort Companion</h1>
          <p className="text-sm text-muted-foreground font-body">"Always here"</p>
        </header>
        <WelcomeForm onNameSubmit={handleNameSubmit} />
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl min-h-screen md:min-h-0 md:h-[90vh] md:max-h-[800px] flex flex-col md:shadow-2xl md:rounded-2xl overflow-hidden">
       <header className="p-4 border-b flex items-baseline justify-between gap-3 shrink-0">
        <div className="flex items-baseline gap-3">
            <h1 className="text-lg sm:text-xl font-headline font-semibold text-foreground">💜 Comfort Companion</h1>
            <p className="text-sm text-muted-foreground font-body hidden sm:block">"Always here"</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => startNewChat()} className="shrink-0">
            <RefreshCw className="mr-0 sm:mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Want to talk about something else?</span>
        </Button>
      </header>

      <ScrollArea className="flex-1" ref={scrollAreaRef} viewportRef={viewportRef}>
        <div className="p-4 sm:p-6 space-y-6">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isLoading && <TypingIndicator />}
        </div>
      </ScrollArea>

      <div className="p-4 border-t shrink-0 bg-card">
        <ChatInput onFormSubmit={handleFormSubmit} isLoading={isLoading} />
      </div>
    </Card>
  );
}

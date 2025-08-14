'use client';

import { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  onFormSubmit: (formData: FormData) => Promise<void>;
  isLoading: boolean;
}

export function ChatInput({ onFormSubmit, isLoading }: ChatInputProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await onFormSubmit(formData);
    formRef.current?.reset();
    inputRef.current?.focus();
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex items-start gap-2"
    >
      <Textarea
        ref={inputRef}
        name="message"
        placeholder="💭 Share what's on your mind..."
        rows={1}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        className="flex-1 resize-none min-h-[40px] max-h-[120px] rounded-2xl focus-visible:ring-offset-0"
      />
      <Button
        type="submit"
        size="icon"
        className="rounded-full shrink-0 h-10 w-10"
        disabled={isLoading}
        aria-label="Send message"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}

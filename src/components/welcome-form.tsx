'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface WelcomeFormProps {
  onNameSubmit: (name: string) => void;
}

export function WelcomeForm({ onNameSubmit }: WelcomeFormProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNameSubmit(name.trim());
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 bg-muted/50">
        <div className="w-full max-w-md">
          <div className="flex items-start gap-3 justify-start w-full mb-6">
              <Avatar className="w-9 h-9">
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">💜</AvatarFallback>
              </Avatar>
              <div className={cn(
                  "max-w-[85%] rounded-2xl p-3 sm:p-4 whitespace-pre-wrap shadow-sm bg-primary text-primary-foreground rounded-tl-sm"
              )}>
                  <p className="font-body leading-relaxed">Hello there, my dear. I'm Comfort Companion, and I'm here for you. Before we begin, what should I call you?</p>
              </div>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 w-full">
              <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="You can call me..."
              className="flex-1 rounded-full"
              aria-label="Your name"
              />
              <Button type="submit" className="rounded-full" disabled={!name.trim()}>Continue</Button>
          </form>
          <Button variant="link" onClick={() => onNameSubmit('Dear')} className="mt-2 text-muted-foreground w-full">
              Just call me Dear.
          </Button>
        </div>
    </div>
  );
}

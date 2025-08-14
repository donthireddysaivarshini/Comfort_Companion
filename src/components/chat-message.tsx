import { cn } from "@/lib/utils";
import type { Message } from "@/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChatSuggestions } from "./chat-suggestions";

export function ChatMessage({ message }: { message: Message }) {
  const isAssistant = message.role === 'assistant';

  return (
    <div className={cn("flex items-start gap-3", isAssistant ? "justify-start" : "justify-end")}>
      {isAssistant && (
        <Avatar className="w-9 h-9">
          <AvatarFallback className="bg-primary text-primary-foreground text-lg">💜</AvatarFallback>
        </Avatar>
      )}
      <div className={cn(
        "max-w-[85%] rounded-2xl p-3 sm:p-4 whitespace-pre-wrap shadow-sm",
        isAssistant 
          ? "bg-primary text-primary-foreground rounded-tl-sm" 
          : "bg-secondary text-secondary-foreground rounded-br-sm"
      )}>
        <p className="font-body leading-relaxed">{message.content}</p>
        {message.suggestions && message.suggestions.length > 0 && (
          <ChatSuggestions suggestions={message.suggestions} />
        )}
      </div>
    </div>
  );
}

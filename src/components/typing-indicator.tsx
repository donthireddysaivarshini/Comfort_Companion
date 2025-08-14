import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 justify-start">
        <Avatar className="w-9 h-9">
          <AvatarFallback className="bg-primary text-primary-foreground text-lg">💜</AvatarFallback>
        </Avatar>
        <div className="flex items-center space-x-1.5 p-4 rounded-2xl rounded-tl-sm bg-primary">
            <div className="h-2 w-2 bg-primary-foreground/70 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 bg-primary-foreground/70 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 bg-primary-foreground/70 rounded-full animate-bounce"></div>
        </div>
    </div>
  );
}

import { getSuggestionIcon } from "@/lib/icon-map";
import { Card, CardContent } from "@/components/ui/card";

export function ChatSuggestions({ suggestions }: { suggestions: string[] }) {
    return (
        <Card className="mt-4 bg-primary/40 border-primary-foreground/10">
            <CardContent className="p-3 sm:p-4">
                <h4 className="text-sm font-semibold mb-3 text-primary-foreground/90">Here are a few gentle thoughts...</h4>
                <div className="space-y-3">
                    {suggestions.map((suggestion, index) => {
                        const Icon = getSuggestionIcon(suggestion);
                        return (
                            <div key={index} className="flex items-center gap-3 text-sm text-primary-foreground">
                                {Icon && <Icon className="w-5 h-5 text-accent-foreground shrink-0" />}
                                <span className="flex-1">{suggestion}</span>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    );
}

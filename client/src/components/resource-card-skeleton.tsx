import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ResourceCardSkeleton() {
  return (
    <Card className="h-full flex flex-col animate-pulse">
      <CardHeader className="flex-shrink-0 space-y-4">
        <div className="h-12 w-12 rounded-md bg-muted" />
        <div className="space-y-2">
          <div className="h-4 w-3/4 bg-muted rounded" />
          <div className="flex gap-2">
            <div className="h-5 w-20 bg-muted rounded-full" />
            <div className="h-5 w-16 bg-muted rounded-full" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 space-y-2">
          <div className="h-3 w-full bg-muted rounded" />
          <div className="h-3 w-5/6 bg-muted rounded" />
          <div className="h-3 w-4/6 bg-muted rounded" />
        </div>
        <div className="flex gap-2 mt-4">
          <div className="h-8 w-24 bg-muted rounded" />
          <div className="h-8 w-20 bg-muted rounded" />
        </div>
      </CardContent>
    </Card>
  );
}

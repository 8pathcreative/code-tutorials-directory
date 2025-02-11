import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Resource } from "@shared/schema";
import { Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const { toast } = useToast();

  const copyLink = () => {
    navigator.clipboard.writeText(resource.url);
    toast({
      title: "Link copied",
      description: "Resource URL has been copied to clipboard",
    });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <div className="h-12 w-12 mb-4">
          <img
            src={resource.imageUrl}
            alt=""
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-semibold">{resource.title}</h3>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">{resource.category}</Badge>
          <Badge variant="secondary">{resource.type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground flex-1">
          {resource.description}
        </p>
        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={copyLink}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Link
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => window.open(resource.url, "_blank")}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Visit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

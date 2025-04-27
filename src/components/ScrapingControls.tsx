
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayIcon, PauseIcon, RotateCwIcon, AlertCircleIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { triggerScrape, triggerBetGrading } from "@/services/mockData";

interface ScrapingControlsProps {
  isScrapingActive?: boolean;
  onToggleScraping?: () => void;
  lastScrapeTime?: string | Date | null;
}

export const ScrapingControls: React.FC<ScrapingControlsProps> = ({
  isScrapingActive = true,
  onToggleScraping,
  lastScrapeTime,
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isGradingLoading, setIsGradingLoading] = React.useState(false);

  const handleManualScrape = async () => {
    setIsLoading(true);
    try {
      const result = await triggerScrape();
      toast({
        title: "Scrape triggered",
        description: result.message,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to trigger scrape",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGradeBets = async () => {
    setIsGradingLoading(true);
    try {
      const result = await triggerBetGrading();
      toast({
        title: "Bet grading triggered",
        description: result.message,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to trigger bet grading",
        variant: "destructive",
      });
    } finally {
      setIsGradingLoading(false);
    }
  };

  const formattedTime = lastScrapeTime 
    ? new Date(lastScrapeTime).toLocaleTimeString() 
    : "Never";

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Scraper Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className={`h-3 w-3 rounded-full ${isScrapingActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span>Status: {isScrapingActive ? 'Active' : 'Paused'}</span>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Last scrape: {formattedTime}
        </p>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleScraping}
            className="flex-1"
          >
            {isScrapingActive ? (
              <>
                <PauseIcon className="h-4 w-4 mr-2" /> Pause
              </>
            ) : (
              <>
                <PlayIcon className="h-4 w-4 mr-2" /> Resume
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleManualScrape}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? (
              <RotateCwIcon className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RotateCwIcon className="h-4 w-4 mr-2" />
            )}
            Manual Scrape
          </Button>
        </div>

        <Button
          variant="default"
          size="sm"
          onClick={handleGradeBets}
          disabled={isGradingLoading}
          className="w-full bg-cricket-primary hover:bg-cricket-secondary"
        >
          {isGradingLoading ? (
            <RotateCwIcon className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <AlertCircleIcon className="h-4 w-4 mr-2" />
          )}
          Grade Pending Bets
        </Button>
      </CardContent>
    </Card>
  );
};

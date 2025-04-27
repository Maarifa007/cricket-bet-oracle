
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookmakerSource } from "@/types";
import { Badge } from "@/components/ui/badge";
import { CheckCircleIcon, AlertCircleIcon, Clock3Icon } from "lucide-react";
import { ScrapeLog } from "@/types";

interface BookmakerStatusProps {
  bookmakers: BookmakerSource[];
  scrapeLogs: ScrapeLog[];
}

export const BookmakerStatus: React.FC<BookmakerStatusProps> = ({ bookmakers, scrapeLogs }) => {
  // Get the most recent log for each bookmaker
  const getLatestStatusForBookmaker = (bookmaker: BookmakerSource) => {
    const logs = scrapeLogs.filter((log) => log.source === bookmaker);
    if (logs.length === 0) return { status: "unknown", timestamp: null };
    
    // Sort by timestamp desc
    logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return { 
      status: logs[0].status, 
      timestamp: new Date(logs[0].timestamp),
      matchesFound: logs[0].matches_found
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bookmaker Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookmakers.map((bookmaker) => {
            const latestStatus = getLatestStatusForBookmaker(bookmaker);
            
            let icon = <Clock3Icon className="h-4 w-4" />;
            let badgeColor = "bg-gray-100 text-gray-800";
            let timeText = "No data";
            
            if (latestStatus.timestamp) {
              const minutesAgo = Math.floor((Date.now() - latestStatus.timestamp.getTime()) / 60000);
              
              if (latestStatus.status === "success") {
                icon = <CheckCircleIcon className="h-4 w-4 text-green-500" />;
                badgeColor = "bg-green-100 text-green-800";
                timeText = `${minutesAgo}m ago • ${latestStatus.matchesFound} matches`;
              } else {
                icon = <AlertCircleIcon className="h-4 w-4 text-red-500" />;
                badgeColor = "bg-red-100 text-red-800";
                timeText = `${minutesAgo}m ago • Error`;
              }
            }
            
            return (
              <div 
                key={bookmaker}
                className="flex items-center justify-between p-3 rounded-md border"
              >
                <div className="flex items-center space-x-2">
                  {icon}
                  <span className="font-medium">{bookmaker}</span>
                </div>
                <div className="flex flex-col items-end">
                  <Badge variant="outline" className={badgeColor}>
                    {latestStatus.status === "success" ? "OK" : "Error"}
                  </Badge>
                  <span className="text-xs text-muted-foreground mt-1">{timeText}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

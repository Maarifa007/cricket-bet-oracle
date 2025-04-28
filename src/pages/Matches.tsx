
import React from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { fetchMatchesToScrape } from "@/services/supabaseService";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

const Matches = () => {
  const { data: matches, isLoading } = useQuery({
    queryKey: ["matches-to-scrape"],
    queryFn: fetchMatchesToScrape,
    refetchInterval: 60 * 1000, // Refetch every 60 seconds
  });

  return (
    <AppLayout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Cricket Matches</h1>
        <Card>
          <CardHeader>
            <CardTitle>Match Management</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-60">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cricket-primary"></div>
              </div>
            ) : !matches || matches.length === 0 ? (
              <p className="text-muted-foreground">
                No matches found. Matches will appear here once discovered by the scraper.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Match Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Bookmaker</TableHead>
                      <TableHead>Last Scraped</TableHead>
                      <TableHead>Match URL</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {matches.map((match) => (
                      <TableRow key={match.id}>
                        <TableCell className="font-medium">{match.match_name}</TableCell>
                        <TableCell><StatusBadge status={match.match_status} /></TableCell>
                        <TableCell>{match.bookmaker}</TableCell>
                        <TableCell>
                          {match.last_scraped ? 
                            formatDistanceToNow(new Date(match.last_scraped), { addSuffix: true }) : 
                            'Never'}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          <a 
                            href={match.match_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {match.match_url}
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Matches;

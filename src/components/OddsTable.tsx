
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { OddsSnapshot } from "@/types";
import { formatDistanceToNow } from "date-fns";

interface OddsTableProps {
  oddsSnapshots: OddsSnapshot[];
  isLoading?: boolean;
}

export const OddsTable: React.FC<OddsTableProps> = ({ oddsSnapshots, isLoading = false }) => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Latest Odds</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-60">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cricket-primary"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Match</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Team 1</TableHead>
                  <TableHead>Odds</TableHead>
                  <TableHead>Team 2</TableHead>
                  <TableHead>Odds</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {oddsSnapshots.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No odds data available
                    </TableCell>
                  </TableRow>
                ) : (
                  oddsSnapshots.map((odds) => (
                    <TableRow key={odds.id}>
                      <TableCell className="font-medium">{odds.match_name}</TableCell>
                      <TableCell>{odds.source}</TableCell>
                      <TableCell>{odds.team_1_name}</TableCell>
                      <TableCell className="font-mono">{odds.odds_team_1.toFixed(2)}</TableCell>
                      <TableCell>{odds.team_2_name}</TableCell>
                      <TableCell className="font-mono">{odds.odds_team_2.toFixed(2)}</TableCell>
                      <TableCell>
                        <StatusBadge status={odds.match_status} />
                      </TableCell>
                      <TableCell title={new Date(odds.timestamp).toLocaleString()}>
                        {formatDistanceToNow(new Date(odds.timestamp), { addSuffix: true })}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

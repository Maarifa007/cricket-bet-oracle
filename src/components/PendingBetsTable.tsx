
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { Bet } from "@/types";
import { formatDistanceToNow } from "date-fns";

interface PendingBetsTableProps {
  bets: Bet[];
  isLoading?: boolean;
}

export const PendingBetsTable: React.FC<PendingBetsTableProps> = ({ bets, isLoading = false }) => {
  // Filter to just show pending bets
  const pendingBets = bets.filter(bet => bet.status === 'pending');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Bets</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cricket-primary"></div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Match ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Side</TableHead>
                <TableHead>Odds</TableHead>
                <TableHead>Stake</TableHead>
                <TableHead>Potential Payout</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingBets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No pending bets
                  </TableCell>
                </TableRow>
              ) : (
                pendingBets.map((bet) => (
                  <TableRow key={bet.id}>
                    <TableCell>{bet.match_id}</TableCell>
                    <TableCell>{bet.bet_type}</TableCell>
                    <TableCell>{bet.bet_side}</TableCell>
                    <TableCell className="font-mono">{bet.odds.toFixed(2)}</TableCell>
                    <TableCell className="font-mono">${bet.stake.toFixed(2)}</TableCell>
                    <TableCell className="font-mono">${bet.potential_payout.toFixed(2)}</TableCell>
                    <TableCell title={new Date(bet.created_at).toLocaleString()}>
                      {formatDistanceToNow(new Date(bet.created_at), { addSuffix: true })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

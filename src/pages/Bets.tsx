
import React from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { fetchBets } from "@/services/supabaseService";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

const Bets = () => {
  const { data: bets, isLoading } = useQuery({
    queryKey: ["all-bets"],
    queryFn: fetchBets,
    refetchInterval: 60 * 1000, // Refetch every 60 seconds
  });

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'win': return 'default'; // Changed from 'success' to 'default' for winning bets
      case 'lose': return 'destructive';
      case 'pending': return 'secondary';
      case 'push': return 'outline';
      case 'cancelled': return 'default';
      default: return 'default';
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Bet Management</h1>
        <Card>
          <CardHeader>
            <CardTitle>All Bets</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-60">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cricket-primary"></div>
              </div>
            ) : !bets || bets.length === 0 ? (
              <p className="text-muted-foreground">
                No bets found. Bets will appear here once created.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Match</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Selection</TableHead>
                      <TableHead>Odds</TableHead>
                      <TableHead>Stake</TableHead>
                      <TableHead>Potential Payout</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bets.map((bet) => (
                      <TableRow key={bet.id}>
                        <TableCell className="font-medium">{bet.match_id}</TableCell>
                        <TableCell>{bet.bet_type}</TableCell>
                        <TableCell>{bet.bet_side}</TableCell>
                        <TableCell>{bet.odds}</TableCell>
                        <TableCell>${bet.stake.toFixed(2)}</TableCell>
                        <TableCell>${bet.potential_payout.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant={getBadgeVariant(bet.status)}>
                            {bet.status.charAt(0).toUpperCase() + bet.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDistanceToNow(new Date(bet.created_at), { addSuffix: true })}</TableCell>
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

export default Bets;


import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GradingLog } from "@/types";
import { StatusBadge } from "@/components/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";

interface BetGradingHistoryProps {
  gradingLogs: GradingLog[];
  isLoading?: boolean;
}

export const BetGradingHistory: React.FC<BetGradingHistoryProps> = ({ gradingLogs, isLoading = false }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bet Grading</CardTitle>
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
                <TableHead>Bet ID</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Payout</TableHead>
                <TableHead>Graded</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gradingLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No grading logs available
                  </TableCell>
                </TableRow>
              ) : (
                gradingLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.bet_id}</TableCell>
                    <TableCell>
                      <StatusBadge status={log.grade_result} />
                    </TableCell>
                    <TableCell className="font-mono">
                      ${log.payout_amount.toFixed(2)}
                    </TableCell>
                    <TableCell title={new Date(log.graded_at).toLocaleString()}>
                      {formatDistanceToNow(new Date(log.graded_at), { addSuffix: true })}
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

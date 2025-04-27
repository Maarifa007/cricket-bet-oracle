
import React from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Bets = () => {
  return (
    <AppLayout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Bet Management</h1>
        <Card>
          <CardHeader>
            <CardTitle>Bet Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This page will display all bets and their current status.
              Future implementation will include bet history, manual grading options, and detailed analytics.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Bets;

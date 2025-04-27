
import React from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Matches = () => {
  return (
    <AppLayout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Cricket Matches</h1>
        <Card>
          <CardHeader>
            <CardTitle>Match Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This page will display all tracked cricket matches and allow match management.
              Future implementation will include match details, odds history, and match status updates.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Matches;

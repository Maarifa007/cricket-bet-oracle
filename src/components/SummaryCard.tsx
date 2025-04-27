
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleIcon, ClockIcon, TrophyIcon, ActivityIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
  trendValue,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && trendValue && (
          <div className="flex items-center space-x-1 mt-2">
            {trend === "up" && (
              <span className="text-xs text-green-600">↑ {trendValue}</span>
            )}
            {trend === "down" && (
              <span className="text-xs text-red-600">↓ {trendValue}</span>
            )}
            {trend === "neutral" && (
              <span className="text-xs text-gray-500">→ {trendValue}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const CardIcons = {
  activity: <ActivityIcon className="h-4 w-4" />,
  clock: <ClockIcon className="h-4 w-4" />,
  status: <CircleIcon className="h-4 w-4" />,
  trophy: <TrophyIcon className="h-4 w-4" />,
};

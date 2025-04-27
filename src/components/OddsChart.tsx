
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { OddsSnapshot } from "@/types";
import { format } from "date-fns";

interface OddsChartProps {
  match: string;
  oddsData: OddsSnapshot[];
  isLoading?: boolean;
}

export const OddsChart: React.FC<OddsChartProps> = ({ match, oddsData, isLoading = false }) => {
  // Filter and process data for the chart
  const processedData = React.useMemo(() => {
    if (!oddsData.length) return [];

    // Filter by match
    const matchOdds = oddsData.filter(odds => odds.match_id === match);
    
    // Sort by timestamp
    const sortedOdds = [...matchOdds].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    // Process for chart display
    return sortedOdds.map(odds => ({
      time: format(new Date(odds.timestamp), 'HH:mm'),
      team1Odds: odds.odds_team_1,
      team2Odds: odds.odds_team_2,
      source: odds.source
    }));
  }, [oddsData, match]);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>
          {isLoading ? "Loading..." : oddsData.find(o => o.match_id === match)?.match_name || "Match Odds History"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cricket-primary"></div>
          </div>
        ) : processedData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={processedData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                domain={['auto', 'auto']}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value: number) => [value.toFixed(2), "Odds"]}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="team1Odds"
                name={oddsData.find(o => o.match_id === match)?.team_1_name || "Team 1"}
                stroke="#14b8a6"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="team2Odds"
                name={oddsData.find(o => o.match_id === match)?.team_2_name || "Team 2"}
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex justify-center items-center h-64 text-muted-foreground">
            No odds data available for this match
          </div>
        )}
      </CardContent>
    </Card>
  );
};

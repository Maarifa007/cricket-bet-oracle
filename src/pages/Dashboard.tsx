
import React, { useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { SummaryCard, CardIcons } from "@/components/SummaryCard";
import { ScrapingControls } from "@/components/ScrapingControls";
import { ScrapeLogs } from "@/components/ScrapeLogs";
import { OddsTable } from "@/components/OddsTable";
import { BookmakerStatus } from "@/components/BookmakerStatus";
import { PendingBetsTable } from "@/components/PendingBetsTable";
import { BetGradingHistory } from "@/components/BetGradingHistory";
import { OddsChart } from "@/components/OddsChart";
import { useToast } from "@/components/ui/use-toast";
import {
  fetchOddsSnapshots,
  fetchMatchResults,
  fetchBets,
  fetchGradingLogs,
  fetchScrapeLogs,
  fetchMatchesToScrape,
  fetchSummaryStats,
} from "@/services/supabaseService";
import { bookmakers } from "@/services/mockData";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { toast } = useToast();
  const [isScrapingActive, setIsScrapingActive] = React.useState(true);
  const REFETCH_INTERVAL = 60 * 1000; // 60 seconds

  // Fetch data using React Query with polling
  const { data: oddsSnapshots, isLoading: oddsLoading } = useQuery({
    queryKey: ["odds"],
    queryFn: fetchOddsSnapshots,
    refetchInterval: REFETCH_INTERVAL,
  });

  const { data: matchResults, isLoading: resultsLoading } = useQuery({
    queryKey: ["results"],
    queryFn: fetchMatchResults,
    refetchInterval: REFETCH_INTERVAL,
  });

  const { data: bets, isLoading: betsLoading } = useQuery({
    queryKey: ["bets"],
    queryFn: fetchBets,
    refetchInterval: REFETCH_INTERVAL,
  });

  const { data: gradingLogs, isLoading: gradingLoading } = useQuery({
    queryKey: ["grading"],
    queryFn: fetchGradingLogs,
    refetchInterval: REFETCH_INTERVAL,
  });

  const { data: scrapeLogs, isLoading: logsLoading } = useQuery({
    queryKey: ["logs"],
    queryFn: fetchScrapeLogs,
    refetchInterval: REFETCH_INTERVAL,
  });

  const { data: matchesToScrape, isLoading: matchesLoading } = useQuery({
    queryKey: ["matches"],
    queryFn: fetchMatchesToScrape,
    refetchInterval: REFETCH_INTERVAL,
  });

  const { data: summaryStats, isLoading: statsLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchSummaryStats,
    refetchInterval: REFETCH_INTERVAL,
  });

  // Handle scraping toggle
  const handleToggleScraping = () => {
    setIsScrapingActive(!isScrapingActive);
    toast({
      title: isScrapingActive ? "Scraping paused" : "Scraping resumed",
      description: isScrapingActive
        ? "Odds scraping has been paused"
        : "Odds scraping has been resumed",
    });
  };

  return (
    <AppLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard
          title="Total Matches"
          value={statsLoading ? "..." : summaryStats?.total_matches || 0}
          icon={CardIcons.activity}
          description="Tracked matches"
        />
        <SummaryCard
          title="Live Matches"
          value={statsLoading ? "..." : summaryStats?.live_matches || 0}
          icon={CardIcons.status}
          description="Currently in progress"
          trend="up"
          trendValue="+2 since yesterday"
        />
        <SummaryCard
          title="Pending Bets"
          value={statsLoading ? "..." : summaryStats?.pending_bets || 0}
          icon={CardIcons.clock}
          description="Awaiting results"
        />
        <SummaryCard
          title="Scraping Success"
          value={statsLoading ? "..." : `${summaryStats?.success_rate || 0}%`}
          icon={CardIcons.trophy}
          description="Last 24 hours"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ScrapingControls
          isScrapingActive={isScrapingActive}
          onToggleScraping={handleToggleScraping}
          lastScrapeTime={summaryStats?.last_scrape}
        />
        <div className="md:col-span-2">
          <BookmakerStatus
            bookmakers={bookmakers}
            scrapeLogs={scrapeLogs || []}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ScrapeLogs logs={scrapeLogs || []} isLoading={logsLoading} />
        <OddsChart
          match="match1"
          oddsData={oddsSnapshots || []}
          isLoading={oddsLoading}
        />
      </div>

      <OddsTable oddsSnapshots={oddsSnapshots || []} isLoading={oddsLoading} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <PendingBetsTable bets={bets || []} isLoading={betsLoading} />
        <BetGradingHistory
          gradingLogs={gradingLogs || []}
          isLoading={gradingLoading}
        />
      </div>
    </AppLayout>
  );
};

export default Dashboard;

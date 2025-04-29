
// Re-export all service functions for convenient access
export {
  fetchLatestOdds as fetchOddsSnapshots,
  fetchOddsHistory,
  fetchScrapeLogsHistory as fetchScrapeLogs,
  getActiveBookmakers
} from './oddsService';

export {
  fetchAllBets as fetchBets,
  fetchUserBets,
  placeBet
} from './betService';

export {
  fetchMatchResults,
  fetchMatchesToScrape,
  addMatchToTrack,
  getMatchResultById
} from './matchService';

export {
  fetchSummaryStats,
  fetchGradingLogs,
  triggerManualScrape as triggerScrape,
  triggerBetGrading
} from './statsService';


// Re-export all service functions for convenient access
export {
  fetchLatestOdds,
  fetchOddsHistory,
  fetchScrapeLogsHistory,
  getActiveBookmakers
} from './oddsService';

export {
  fetchAllBets,
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

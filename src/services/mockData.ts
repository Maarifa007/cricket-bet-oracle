
import { 
  OddsSnapshot, 
  MatchResult, 
  Bet, 
  GradingLog, 
  ScrapeLog, 
  MatchToScrape,
  BookmakerSource,
  SummaryStats
} from '../types';

// Mock Odds data
export const mockOddsSnapshots: OddsSnapshot[] = [
  {
    id: '1',
    match_id: 'match1',
    match_name: 'India vs Australia',
    team_1_name: 'India',
    team_2_name: 'Australia',
    market_type: 'moneyline',
    odds_team_1: 1.85,
    odds_team_2: 1.95,
    match_status: 'live',
    timestamp: new Date().toISOString(),
    source: 'SportingIndex'
  },
  {
    id: '2',
    match_id: 'match1',
    match_name: 'India vs Australia',
    team_1_name: 'India',
    team_2_name: 'Australia',
    market_type: 'moneyline',
    odds_team_1: 1.75,
    odds_team_2: 2.05,
    match_status: 'live',
    timestamp: new Date(Date.now() - 60000).toISOString(),
    source: 'Spreadex'
  },
  {
    id: '3',
    match_id: 'match2',
    match_name: 'England vs New Zealand',
    team_1_name: 'England',
    team_2_name: 'New Zealand',
    market_type: 'moneyline',
    odds_team_1: 2.10,
    odds_team_2: 1.70,
    match_status: 'pregame',
    timestamp: new Date().toISOString(),
    source: 'Ladbrokes'
  }
];

// Mock Match Results
export const mockMatchResults: MatchResult[] = [
  {
    id: '1',
    match_id: 'match3',
    team_1_score: 325,
    team_2_score: 290,
    winner: 'team_1',
    result_status: 'completed',
    completed_at: new Date(Date.now() - 3600000).toISOString(),
  }
];

// Mock Bets
export const mockBets: Bet[] = [
  {
    id: '1',
    user_id: 'user1',
    match_id: 'match1',
    bet_type: 'moneyline',
    bet_side: 'team_1',
    odds: 1.85,
    stake: 100,
    potential_payout: 185,
    status: 'pending',
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '2',
    user_id: 'user2',
    match_id: 'match3',
    bet_type: 'moneyline',
    bet_side: 'team_1',
    odds: 1.75,
    stake: 200,
    potential_payout: 350,
    status: 'win',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    graded_at: new Date(Date.now() - 3600000).toISOString(),
  }
];

// Mock Grading Logs
export const mockGradingLogs: GradingLog[] = [
  {
    id: '1',
    bet_id: '2',
    grade_result: 'win',
    payout_amount: 350,
    graded_at: new Date(Date.now() - 3600000).toISOString(),
  }
];

// Mock Scrape Logs
export const mockScrapeLogs: ScrapeLog[] = [
  {
    id: '1',
    source: 'SportingIndex',
    url: 'https://sportingindex.com/cricket',
    status: 'success',
    matches_found: 5,
    timestamp: new Date(Date.now() - 60000).toISOString(),
  },
  {
    id: '2',
    source: 'Spreadex',
    url: 'https://spreadex.com/cricket',
    status: 'success',
    matches_found: 4,
    timestamp: new Date(Date.now() - 120000).toISOString(),
  },
  {
    id: '3',
    source: 'Ladbrokes',
    url: 'https://ladbrokes.com/cricket',
    status: 'error',
    matches_found: 0,
    error_message: 'Rate limited - 429 Too Many Requests',
    timestamp: new Date(Date.now() - 180000).toISOString(),
  }
];

// Mock Matches to Scrape
export const mockMatchesToScrape: MatchToScrape[] = [
  {
    id: '1',
    match_url: 'https://sportingindex.com/cricket/india-vs-australia',
    match_id: 'match1',
    match_name: 'India vs Australia',
    match_status: 'live',
    bookmaker: 'SportingIndex',
    last_scraped: new Date(Date.now() - 60000).toISOString(),
  },
  {
    id: '2',
    match_url: 'https://spreadex.com/cricket/india-vs-australia',
    match_id: 'match1',
    match_name: 'India vs Australia',
    match_status: 'live',
    bookmaker: 'Spreadex',
    last_scraped: new Date(Date.now() - 120000).toISOString(),
  },
  {
    id: '3',
    match_url: 'https://ladbrokes.com/cricket/england-vs-new-zealand',
    match_id: 'match2',
    match_name: 'England vs New Zealand',
    match_status: 'pregame',
    bookmaker: 'Ladbrokes',
    last_scraped: new Date(Date.now() - 180000).toISOString(),
  }
];

// Mock Summary stats
export const mockSummaryStats: SummaryStats = {
  total_matches: 15,
  live_matches: 3,
  total_odds_snapshots: 450,
  completed_matches: 7,
  pending_bets: 28,
  graded_bets: 142,
  last_scrape: new Date(Date.now() - 60000).toISOString(),
  success_rate: 92.5
};

export const bookmakers: BookmakerSource[] = [
  'SportingIndex',
  'Spreadex',
  'Ladbrokes',
  'Sportspreads'
];

// Mock API functions
export const fetchOddsSnapshots = async (): Promise<OddsSnapshot[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOddsSnapshots);
    }, 500);
  });
};

export const fetchMatchResults = async (): Promise<MatchResult[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMatchResults);
    }, 500);
  });
};

export const fetchBets = async (): Promise<Bet[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBets);
    }, 500);
  });
};

export const fetchGradingLogs = async (): Promise<GradingLog[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockGradingLogs);
    }, 500);
  });
};

export const fetchScrapeLogs = async (): Promise<ScrapeLog[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockScrapeLogs);
    }, 500);
  });
};

export const fetchMatchesToScrape = async (): Promise<MatchToScrape[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMatchesToScrape);
    }, 500);
  });
};

export const fetchSummaryStats = async (): Promise<SummaryStats> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSummaryStats);
    }, 500);
  });
};

// Mock function to trigger a scrape
export const triggerScrape = async (): Promise<{success: boolean, message: string}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Manual scrape initiated successfully' });
    }, 1000);
  });
};

// Mock function to trigger bet grading
export const triggerBetGrading = async (): Promise<{success: boolean, message: string}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Bet grading process initiated successfully' });
    }, 1000);
  });
};

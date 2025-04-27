
export interface OddsSnapshot {
  id?: string;
  match_id: string;
  match_name: string;
  team_1_name: string;
  team_2_name: string;
  market_type: MarketType;
  odds_team_1: number;
  odds_team_2: number;
  match_status: MatchStatus;
  timestamp: Date | string;
  source: BookmakerSource;
}

export interface MatchResult {
  id?: string;
  match_id: string;
  team_1_score: number;
  team_2_score: number;
  winner: string | null;
  result_status: ResultStatus;
  completed_at: Date | string;
}

export interface Bet {
  id: string;
  user_id: string;
  match_id: string;
  bet_type: BetType;
  bet_side: 'team_1' | 'team_2' | 'draw';
  odds: number;
  stake: number;
  potential_payout: number;
  status: BetStatus;
  created_at: Date | string;
  graded_at?: Date | string;
}

export interface GradingLog {
  id?: string;
  bet_id: string;
  grade_result: BetStatus;
  payout_amount: number;
  graded_at: Date | string;
}

export interface ScrapeLog {
  id?: string;
  source: BookmakerSource;
  url: string;
  status: 'success' | 'error';
  matches_found: number;
  error_message?: string;
  timestamp: Date | string;
}

export interface MatchToScrape {
  id?: string;
  match_url: string;
  match_id: string;
  match_name: string;
  match_status: MatchStatus;
  bookmaker: BookmakerSource;
  last_scraped?: Date | string;
}

export type MarketType = 'moneyline' | 'spread' | 'over_under' | 'outright';
export type MatchStatus = 'live' | 'pregame' | 'ended';
export type ResultStatus = 'completed' | 'abandoned' | 'tie';
export type BetType = 'moneyline' | 'spread' | 'over_under';
export type BetStatus = 'pending' | 'win' | 'lose' | 'push' | 'cancelled';
export type BookmakerSource = 'SportingIndex' | 'Spreadex' | 'Ladbrokes' | 'Sportspreads';

export interface SummaryStats {
  total_matches: number;
  live_matches: number;
  total_odds_snapshots: number;
  completed_matches: number;
  pending_bets: number;
  graded_bets: number;
  last_scrape: Date | string | null;
  success_rate: number;
}

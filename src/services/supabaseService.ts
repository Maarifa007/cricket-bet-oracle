
import { supabaseClient } from '@/lib/supabase';
import { OddsSnapshot, MatchResult, Bet, GradingLog, ScrapeLog, MatchToScrape, SummaryStats } from '@/types';

// Fetch latest odds snapshots from Supabase
export const fetchOddsSnapshots = async (): Promise<OddsSnapshot[]> => {
  try {
    const { data, error } = await supabaseClient
      .from('cricket_odds')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(10);
    
    if (error) throw error;
    
    // Parse the odds_json column to get our OddsSnapshot data
    if (data && data.length > 0) {
      return data[0].odds_json.snapshots as OddsSnapshot[];
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching odds snapshots:', error);
    return [];
  }
};

// Fetch match results
export const fetchMatchResults = async (): Promise<MatchResult[]> => {
  try {
    const { data, error } = await supabaseClient
      .from('match_results')
      .select('*')
      .order('completed_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching match results:', error);
    return [];
  }
};

// Fetch bets
export const fetchBets = async (): Promise<Bet[]> => {
  try {
    const { data, error } = await supabaseClient
      .from('bets')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching bets:', error);
    return [];
  }
};

// Fetch grading logs
export const fetchGradingLogs = async (): Promise<GradingLog[]> => {
  try {
    const { data, error } = await supabaseClient
      .from('grading_logs')
      .select('*')
      .order('graded_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching grading logs:', error);
    return [];
  }
};

// Fetch scrape logs
export const fetchScrapeLogs = async (): Promise<ScrapeLog[]> => {
  try {
    const { data, error } = await supabaseClient
      .from('scrape_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(10);
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching scrape logs:', error);
    return [];
  }
};

// Fetch matches to scrape
export const fetchMatchesToScrape = async (): Promise<MatchToScrape[]> => {
  try {
    const { data, error } = await supabaseClient
      .from('matches_to_scrape')
      .select('*')
      .order('last_scraped', { ascending: true });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching matches to scrape:', error);
    return [];
  }
};

// Fetch summary stats
export const fetchSummaryStats = async (): Promise<SummaryStats> => {
  try {
    const { data, error } = await supabaseClient
      .from('summary_stats')
      .select('*')
      .single();
    
    if (error) throw error;
    return data as SummaryStats;
  } catch (error) {
    console.error('Error fetching summary stats:', error);
    return {
      total_matches: 0,
      live_matches: 0,
      total_odds_snapshots: 0,
      completed_matches: 0,
      pending_bets: 0,
      graded_bets: 0,
      last_scrape: null,
      success_rate: 0
    };
  }
};

// Trigger manual scrape
export const triggerScrape = async (): Promise<{success: boolean, message: string}> => {
  try {
    const { data, error } = await supabaseClient.functions.invoke('trigger-scrape');
    
    if (error) throw error;
    return {
      success: true,
      message: data?.message || 'Manual scrape initiated successfully'
    };
  } catch (error) {
    console.error('Error triggering scrape:', error);
    return {
      success: false,
      message: 'Failed to trigger scrape'
    };
  }
};

// Trigger bet grading
export const triggerBetGrading = async (): Promise<{success: boolean, message: string}> => {
  try {
    const { data, error } = await supabaseClient.functions.invoke('grade-bets');
    
    if (error) throw error;
    return {
      success: true,
      message: data?.message || 'Bet grading process initiated successfully'
    };
  } catch (error) {
    console.error('Error triggering bet grading:', error);
    return {
      success: false,
      message: 'Failed to trigger bet grading'
    };
  }
};

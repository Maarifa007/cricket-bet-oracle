
import { supabaseClient } from '@/lib/supabase';
import { SummaryStats, GradingLog } from '@/types';

/**
 * Fetch summary statistics
 */
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
    // Return default empty stats
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

/**
 * Fetch grading logs
 */
export const fetchGradingLogs = async (): Promise<GradingLog[]> => {
  try {
    const { data, error } = await supabaseClient
      .from('grading_logs')
      .select('*')
      .order('graded_at', { ascending: false })
      .limit(20);
    
    if (error) throw error;
    
    return data as GradingLog[];
  } catch (error) {
    console.error('Error fetching grading logs:', error);
    return [];
  }
};

/**
 * Trigger a manual scrape via edge function
 */
export const triggerManualScrape = async (): Promise<{success: boolean, message: string}> => {
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

/**
 * Trigger bet grading via edge function
 */
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

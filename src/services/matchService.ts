
import { supabaseClient } from '@/lib/supabase';
import { MatchResult, MatchToScrape } from '@/types';

/**
 * Fetch all match results
 */
export const fetchMatchResults = async (): Promise<MatchResult[]> => {
  try {
    const { data, error } = await supabaseClient
      .from('match_results')
      .select('*')
      .order('completed_at', { ascending: false });
    
    if (error) throw error;
    
    return data as MatchResult[];
  } catch (error) {
    console.error('Error fetching match results:', error);
    return [];
  }
};

/**
 * Fetch matches being tracked for scraping
 */
export const fetchMatchesToScrape = async (): Promise<MatchToScrape[]> => {
  try {
    const { data, error } = await supabaseClient
      .from('matches_to_scrape')
      .select('*')
      .order('last_scraped', { ascending: true });
    
    if (error) throw error;
    
    return data as MatchToScrape[];
  } catch (error) {
    console.error('Error fetching matches to scrape:', error);
    return [];
  }
};

/**
 * Add a new match to track for odds
 */
export const addMatchToTrack = async (
  matchName: string,
  matchUrl: string,
  bookmaker: string
): Promise<{ success: boolean, message: string }> => {
  try {
    const { error } = await supabaseClient
      .from('matches_to_scrape')
      .insert([
        {
          match_name: matchName,
          match_url: matchUrl,
          match_status: 'pregame',
          bookmaker: bookmaker
        }
      ]);
    
    if (error) throw error;
    
    return { success: true, message: 'Match added successfully for tracking' };
  } catch (error) {
    console.error('Error adding match to track:', error);
    return { success: false, message: 'Failed to add match for tracking' };
  }
};

/**
 * Get match result by ID
 */
export const getMatchResultById = async (matchId: string): Promise<MatchResult | null> => {
  try {
    const { data, error } = await supabaseClient
      .from('match_results')
      .select('*')
      .eq('match_id', matchId)
      .single();
    
    if (error) throw error;
    
    return data as MatchResult;
  } catch (error) {
    console.error(`Error fetching result for match ${matchId}:`, error);
    return null;
  }
};

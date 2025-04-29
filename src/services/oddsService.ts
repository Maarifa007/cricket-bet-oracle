
import { supabaseClient } from '@/lib/supabase';
import { OddsSnapshot, ScrapeLog, BookmakerSource } from '@/types';

/**
 * Fetch the latest odds for each match from the database
 */
export const fetchLatestOdds = async (): Promise<OddsSnapshot[]> => {
  try {
    const { data, error } = await supabaseClient
      .from('cricket_odds')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(50);
    
    if (error) throw error;
    
    return data as OddsSnapshot[];
  } catch (error) {
    console.error('Error fetching latest odds:', error);
    return [];
  }
};

/**
 * Fetch odds history for a specific match
 */
export const fetchOddsHistory = async (matchId: string): Promise<OddsSnapshot[]> => {
  try {
    const { data, error } = await supabaseClient
      .from('cricket_odds')
      .select('*')
      .eq('match_id', matchId)
      .order('timestamp', { ascending: true });
    
    if (error) throw error;
    
    return data as OddsSnapshot[];
  } catch (error) {
    console.error(`Error fetching odds history for match ${matchId}:`, error);
    return [];
  }
};

/**
 * Fetch scrape logs for monitoring the scrapers
 */
export const fetchScrapeLogsHistory = async (): Promise<ScrapeLog[]> => {
  try {
    const { data, error } = await supabaseClient
      .from('scrape_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(20);
    
    if (error) throw error;
    
    return data as ScrapeLog[];
  } catch (error) {
    console.error('Error fetching scrape logs:', error);
    return [];
  }
};

/**
 * Get active bookmakers list
 */
export const getActiveBookmakers = async (): Promise<BookmakerSource[]> => {
  try {
    const { data, error } = await supabaseClient
      .from('bookmakers')
      .select('name')
      .eq('is_active', true);
    
    if (error) throw error;
    
    return data.map(item => item.name as BookmakerSource);
  } catch (error) {
    console.error('Error fetching active bookmakers:', error);
    // Return default bookmakers as fallback
    return ['SportingIndex', 'Spreadex', 'Ladbrokes', 'Sportspreads'];
  }
};


import { supabaseClient } from '@/lib/supabase';
import { OddsSnapshot } from '@/types';

export const getLatestOdds = async (): Promise<OddsSnapshot[]> => {
  try {
    const { data, error } = await supabaseClient
      .from('cricket_odds')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(1);
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      return data[0].odds_json.snapshots as OddsSnapshot[];
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching latest odds:', error);
    return [];
  }
};

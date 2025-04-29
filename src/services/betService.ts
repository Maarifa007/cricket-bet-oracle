
import { supabaseClient } from '@/lib/supabase';
import { Bet, BetStatus } from '@/types';
import { useToast } from '@/components/ui/use-toast';

/**
 * Fetch all bets from the database
 */
export const fetchAllBets = async (): Promise<Bet[]> => {
  try {
    const { data, error } = await supabaseClient
      .from('bets')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data as Bet[];
  } catch (error) {
    console.error('Error fetching bets:', error);
    return [];
  }
};

/**
 * Fetch bets for a specific user
 */
export const fetchUserBets = async (userId: string): Promise<Bet[]> => {
  try {
    const { data, error } = await supabaseClient
      .from('bets')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data as Bet[];
  } catch (error) {
    console.error(`Error fetching bets for user ${userId}:`, error);
    return [];
  }
};

/**
 * Place a new bet
 */
export const placeBet = async (
  matchId: string,
  betType: string,
  betSide: 'team_1' | 'team_2' | 'draw',
  odds: number,
  stake: number
): Promise<{ success: boolean, message: string, bet?: Bet }> => {
  try {
    // Get the current user
    const { data: { user } } = await supabaseClient.auth.getUser();
    
    if (!user) {
      return { success: false, message: 'You must be logged in to place a bet' };
    }
    
    // Calculate potential payout
    const potentialPayout = stake * odds;
    
    // Insert the bet into the database
    const { data, error } = await supabaseClient
      .from('bets')
      .insert([
        {
          user_id: user.id,
          match_id: matchId,
          bet_type: betType,
          bet_side: betSide,
          odds: odds,
          stake: stake,
          potential_payout: potentialPayout,
          status: 'pending' as BetStatus
        }
      ])
      .select()
      .single();
    
    if (error) throw error;
    
    return { 
      success: true, 
      message: 'Bet placed successfully!',
      bet: data as Bet
    };
  } catch (error) {
    console.error('Error placing bet:', error);
    return { 
      success: false, 
      message: 'Failed to place bet. Please try again.'
    };
  }
};

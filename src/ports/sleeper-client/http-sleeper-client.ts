import { SleeperLeague, SleeperLeagueDTO } from '@entities/sleeper/sleeper-league';
import { SleeperRoster, SleeperRosterDTO } from '../../entities/sleeper/sleeper-roster';
import { SleeperClient } from './sleeper-client';
import axios from 'axios';

export class HttpSleeperClient implements SleeperClient {
  private sleeperApiUrl = 'https://api.sleeper.app/v1';

  async getLeagueById(sleeperLeagueId: string): Promise<SleeperLeague> {
    try {
      const response = await axios.get(`${this.sleeperApiUrl}/league/${sleeperLeagueId}`);
      return this.convertSleeperLeagueDTOToSleeperLeague(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async doesSleeperLeagueExistBySleeperLeagueId(sleeperLeagueId: string): Promise<boolean> {
    const response = await axios.get(`${this.sleeperApiUrl}/league/${sleeperLeagueId}`);
    return !!response.data;
  }

  async getRostersForLeague(sleeperLeagueId: string): Promise<SleeperRoster[]> {
    const response = await axios.get(`${this.sleeperApiUrl}/league/${sleeperLeagueId}/rosters`);
    const sleeperLeagueRosters: SleeperRoster[] = response.data.map((sleeperRosterDTO: SleeperRosterDTO) => {
      return this.convertSleeperRosterDTOToSleeperRoster(sleeperRosterDTO);
    });

    return sleeperLeagueRosters;
  }

  private convertSleeperRosterDTOToSleeperRoster(sleeperRosterDTO: SleeperRosterDTO): SleeperRoster {
    return {
      rosterId: sleeperRosterDTO.roster_id,
      ownerId: sleeperRosterDTO.owner_id,
      leagueId: sleeperRosterDTO.league_id,
      starters: sleeperRosterDTO.starters,
      players: sleeperRosterDTO.players,
      reserve: sleeperRosterDTO.reserve,
      keepers: sleeperRosterDTO.keepers,
      settings: sleeperRosterDTO.settings,
      metadata: sleeperRosterDTO.metadata,
      coOwners: sleeperRosterDTO.co_owners,
      player_map: sleeperRosterDTO.player_map,
      taxi: sleeperRosterDTO.taxi,
    };
  }

  private convertSleeperLeagueDTOToSleeperLeague(sleeperLeagueDTO: SleeperLeagueDTO): SleeperLeague {
    return {
      leagueId: sleeperLeagueDTO.league_id,
      leagueName: sleeperLeagueDTO.name,
      rosterCount: sleeperLeagueDTO.total_rosters,
      rosterPositions: sleeperLeagueDTO.roster_positions,
      sport: sleeperLeagueDTO.sport,
      seasonType: sleeperLeagueDTO.season_type,
      seasonYear: sleeperLeagueDTO.season,
      previousLeagueId: sleeperLeagueDTO.previous_league_id,
      loserBracketId: sleeperLeagueDTO.loser_bracket_id.toString(),
      draftId: sleeperLeagueDTO.draft_id,
      bracketId: sleeperLeagueDTO.bracket_id.toString(),
    };
  }
}

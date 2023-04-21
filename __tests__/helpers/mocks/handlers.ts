/* eslint-disable unicorn/no-null */
import { rest } from 'msw';

export const handlers = [
  // sleeper-client.test.ts.getLeagueById()
  rest.get('https://api.sleeper.app/v1/league/1234', (_request, response, context) => {
    return response(
      context.status(200),
      context.json({
        league_id: '1234',
        name: 'Test League',
        total_rosters: 12,
        roster_positions: ['QB', 'RB', 'WR', 'TE', 'FLEX', 'D/ST', 'K'],
        sport: 'nfl',
        season_type: 'regular',
        season: 2020,
        previous_league_id: 'somePreviousLeagueId',
        loser_bracket_id: 1234,
        draft_id: 'someDraftId',
        bracket_id: 1234,
      })
    );
  }),
];

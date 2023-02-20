import axios from 'axios';

const host = process.env['STATS_API_URL'];

describe('league-controller', () => {
  it('creating and fetching a league', async () => {
    const leagueName = 'IntegrationTestLeague';

    const createLeagueResponse = await axios.post(`${host}leagues`, {
      leagueName,
    });
    const leagueId = createLeagueResponse.data;

    const response = await axios.get(`${host}leagues/${leagueId}`);
    // TODO: host can be an env. for replit, a secre

    // TODO: script for non replit needs to start and stop the app

    expect(response.data).toEqual({
      league: {
        name: leagueName,
        id: leagueId,
      },
    });
  });
});

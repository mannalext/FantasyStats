import axios from 'axios';

describe('league-controller', () => {
  const host = process.env['STATS_API_URL'];

  it('creating and fetching a league', async () => {
    const leagueName = 'IntegrationTestLeague';

    const createLeagueResponse = await axios.post(`${host}leagues`, {
      leagueName,
    });
    const leagueId = createLeagueResponse.data;

    const response = await axios.get(`${host}leagues/${leagueId}`);

    expect(response.data).toEqual({
      league: {
        name: leagueName,
        id: leagueId,
      },
    });
  });
});

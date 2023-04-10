import axios from 'axios';

describe('season-controller', () => {
  const host = process.env['STATS_API_URL'];

  it('creating a season', async () => {
    const leagueName = 'IntegrationTestLeague';
    const createLeagueResponse = await axios.post(`${host}leagues`, { leagueName });
    const leagueId = createLeagueResponse.data;
    const createSeasonResponse = await axios.post(`${host}seasons`, { leagueId });
    const findSeasonResponse = await axios.get(`${host}seasons/${createSeasonResponse.data}`);

    expect(createSeasonResponse.data).toEqual(findSeasonResponse.data.season.id);
  });

  it('fetching a season by id', async () => {
    const leagueName = 'IntegrationTestLeague';
    const createLeagueResponse = await axios.post(`${host}leagues`, { leagueName });
    const leagueId = createLeagueResponse.data;
    const createSeasonResponse = await axios.post(`${host}seasons`, { leagueId });
    const seasonId = createSeasonResponse.data;
    const fetchSeasonResponse = await axios.get(`${host}seasons/${seasonId}`);

    expect(fetchSeasonResponse.data).toEqual({
      season: {
        leagueId,
        id: seasonId,
        year: new Date().getFullYear(),
      },
    });
  });

  it('fetching a season by league and year', async () => {
    const leagueName = 'IntegrationTestLeague';
    const createLeagueResponse = await axios.post(`${host}leagues`, { leagueName });
    const leagueId = createLeagueResponse.data;
    const createSeasonResponse = await axios.post(`${host}seasons`, { leagueId });
    const fetchSeasonResponse = await axios.get(`${host}seasons/${leagueId}/${new Date().getFullYear()}`);

    expect(fetchSeasonResponse.data).toEqual({
      season: {
        leagueId,
        id: createSeasonResponse.data,
        year: new Date().getFullYear(),
      },
    });
  });
});

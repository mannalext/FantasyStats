import axios from 'axios';

describe('season-controller', () => {
  const host = process.env['STATS_API_URL'];
  const sleeperLeagueIdForDynasty2023 = '985676679735504896';

  // TODO: this intermittently fails. likely because the tests aren't isolated well enough?
  it('creating a season', async () => {
    const leagueName = 'IntegrationTestLeague';
    const createLeagueResponse = await axios.post(`${host}leagues`, { leagueName });
    const leagueId = createLeagueResponse.data;
    const createSeasonResponse = await axios.post(`${host}seasons`, { leagueId });
    const findSeasonResponse = await axios.get(`${host}seasons/${createSeasonResponse.data}`);

    expect(createSeasonResponse.data).toEqual(findSeasonResponse.data.id);
  });

  it('fetching a season by id', async () => {
    const leagueName = 'IntegrationTestLeague';
    const createLeagueResponse = await axios.post(`${host}leagues`, { leagueName });
    const leagueId = createLeagueResponse.data;
    const createSeasonResponse = await axios.post(`${host}seasons`, { leagueId });
    const seasonId = createSeasonResponse.data;
    const fetchSeasonResponse = await axios.get(`${host}seasons/${seasonId}`);

    expect(fetchSeasonResponse.data).toEqual({
      leagueId,
      id: seasonId,
      year: new Date().getFullYear(),
    });
  });

  it('fetching a season by league and year', async () => {
    const leagueName = 'IntegrationTestLeague';
    const createLeagueResponse = await axios.post(`${host}leagues`, { leagueName });
    const leagueId = createLeagueResponse.data;
    const createSeasonResponse = await axios.post(`${host}seasons`, { leagueId });
    const fetchSeasonResponse = await axios.get(`${host}seasons/${leagueId}/${new Date().getFullYear()}`);

    expect(fetchSeasonResponse.data).toEqual({
      leagueId,
      id: createSeasonResponse.data,
      year: new Date().getFullYear(),
    });
  });

  describe('sleeper seasons', () => {
    let leagueId: number;

    beforeAll(async () => {
      const leagueName = 'IntegrationTestLeagueForSleeperSeason';
      const createLeagueResponse = await axios.post(`${host}leagues`, { leagueName });
      leagueId = createLeagueResponse.data;
    });

    it('creating a sleeper season and fetching it by sleeper season id', async () => {
      const createSleeperSeasonResponse = await axios.post(`${host}seasons/sleeper`, {
        leagueId,
        sleeperLeagueId: sleeperLeagueIdForDynasty2023,
      });

      const fetchSleeperSeasonResponse = await axios.get(
        `${host}seasons/sleeper/external/${sleeperLeagueIdForDynasty2023}`
      );

      expect(fetchSleeperSeasonResponse.data).toEqual({
        leagueId,
        id: createSleeperSeasonResponse.data,
        sleeperLeagueId: sleeperLeagueIdForDynasty2023,
        year: new Date().getFullYear(),
      });
    });
  });
});

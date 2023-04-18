import axios from 'axios';

describe('teams-controller', () => {
  const host = process.env['STATS_API_URL'];

  it('creating a team', async () => {
    const leagueName = 'IntegrationTestLeague';
    const createLeagueResponse = await axios.post(`${host}leagues`, { leagueName });
    const leagueId = createLeagueResponse.data;
    const createSeasonResponse = await axios.post(`${host}seasons`, { leagueId });
    const seasonId = createSeasonResponse.data;
    const createOwnerResponse = await axios.post(`${host}owners`, { displayName: 'IntegrationTestOwner' });
    const ownerId = createOwnerResponse.data;

    const createTeamResponse = await axios.post(`${host}teams`, { seasonId, ownerId });
    const fetchTeamResponse = await axios.get(`${host}teams/${seasonId}/${ownerId}`);

    expect(createTeamResponse.data).toEqual(fetchTeamResponse.data.id);
  });

  it('fetching a team by season and owner', async () => {
    const leagueName = 'IntegrationTestLeague';
    const createLeagueResponse = await axios.post(`${host}leagues`, { leagueName });
    const leagueId = createLeagueResponse.data;
    const createSeasonResponse = await axios.post(`${host}seasons`, { leagueId });
    const seasonId = createSeasonResponse.data;
    const createOwnerResponse = await axios.post(`${host}owners`, { displayName: 'IntegrationTestOwner' });
    const ownerId = createOwnerResponse.data;
    const createTeamResponse = await axios.post(`${host}teams`, { seasonId, ownerId });
    const teamId = createTeamResponse.data;
    const fetchTeamResponse = await axios.get(`${host}teams/${seasonId}/${ownerId}`);

    expect(fetchTeamResponse.data).toEqual({
      seasonId,
      id: teamId,
      ownerId,
      wins: 0,
      losses: 0,
      ties: 0,
    });
  });

  it('fetching a team by id', async () => {
    const leagueName = 'IntegrationTestLeague';
    const createLeagueResponse = await axios.post(`${host}leagues`, { leagueName });
    const leagueId = createLeagueResponse.data;
    const createSeasonResponse = await axios.post(`${host}seasons`, { leagueId });
    const seasonId = createSeasonResponse.data;
    const createOwnerResponse = await axios.post(`${host}owners`, { displayName: 'IntegrationTestOwner' });
    const ownerId = createOwnerResponse.data;
    const createTeamResponse = await axios.post(`${host}teams`, { seasonId, ownerId });
    const teamId = createTeamResponse.data;
    const fetchTeamResponse = await axios.get(`${host}teams/${teamId}`);

    expect(fetchTeamResponse.data).toEqual({
      id: teamId,
      seasonId,
      ownerId,
      wins: 0,
      losses: 0,
      ties: 0,
    });
  });
});

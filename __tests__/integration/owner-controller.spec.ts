import axios from 'axios';

describe('owner-controller', () => {
  const host = process.env['STATS_API_URL'];

  it('creating an owner', async () => {
    const ownerName = 'IntegrationTestOwner';
    const createOwnerResponse = await axios.post(`${host}owners`, { ownerName });
    const findOwnerResponse = await axios.get(`${host}owners/${createOwnerResponse.data}`);

    expect(createOwnerResponse.data).toEqual(findOwnerResponse.data.owner.id);
  });

  it('fetching an owner by id', async () => {
    const ownerName = 'IntegrationTestOwner';
    const createOwnerResponse = await axios.post(`${host}owners`, { ownerName });
    const ownerId = createOwnerResponse.data;
    const fetchOwnerResponse = await axios.get(`${host}owners/${ownerId}`);

    expect(fetchOwnerResponse.data).toEqual({
      owner: {
        id: ownerId,
        displayName: ownerName,
      },
    });
  });
});

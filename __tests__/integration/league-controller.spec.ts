import axios from 'axios';

const host = process.env['STATS_API_URL'];

describe('league-controller', () => {
  /**
   * TODO:
   * 1. import app from app.ts
   * 2. feed it to supertest?
   * 3. invoke a get on that supertest object to see if it hits my route
   * 4. observe the response
   *
   * also:
   * - figure out how this is going to play with the real/fake ports infrastructure
   * - how to make these idempotent?
   * - should they be run separately from the unit tests? (probably)
   * - jest configuration to make all the above happen?
   */

  it('does a thing', async () => {
    const response = await axios.get(`${host}leagues/48`); // TODO: parameterize
    // TODO: host can be an env. for replit, a secret

    // TODO: idempotency

    // TODO: script for non replit needs to start and stop the app

    console.log(response.data);

    expect(response.data).toEqual(123);
  });
});

import { app } from '../../src/app';
import supertest from 'supertest';

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
  it('does a thing', () => {
    expect(true);
  });
});

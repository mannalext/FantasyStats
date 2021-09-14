/**
 * TODO:
 * some of this can be salvaged for the eventual service layer whose job it will be to
 * get and parse json on a weekly basis. this is meant mainly to test what we've got so far
 */

import { insert } from '@/db/owners';


// TODO: pg authentication failing / fantasy-stats-database doesn't actually exist?
export const insertOwners = async (usersJson: string): Promise<void> => {
  console.log('in here we will do a thing');
  insert({
    ownerId: 1234,
    displayName: 'alex',
  });
};

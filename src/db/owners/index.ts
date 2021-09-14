import { OwnerInsertValues } from '@/types';
import { query } from '@/db';

export const insert = async (ownerInserValues: OwnerInsertValues): Promise<void> => {
  await query(
    'INSERT INTO owners (owner_id, display_name) VALUES ($1, $2)',
    [ ownerInserValues.ownerId,
      ownerInserValues.displayName,
    ],
  );
};

export const select = async (ownerId: number): Promise<void> => {
  await query(
    'SELECT * FROM owners WHERE owner_id = $1',
    [ ownerId ],
  );
};

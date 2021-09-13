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

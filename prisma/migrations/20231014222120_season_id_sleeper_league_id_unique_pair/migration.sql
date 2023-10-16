/*
  Warnings:

  - A unique constraint covering the columns `[season_id,sleeper_league_id]` on the table `sleeperSeasons` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "sleeperSeasons_season_id_sleeper_league_id_key" ON "sleeperSeasons"("season_id", "sleeper_league_id");

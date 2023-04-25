-- CreateTable
CREATE TABLE "sleeperSeasons" (
    "season_id" INTEGER NOT NULL,
    "sleeper_league_id" VARCHAR(100) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "sleeperSeasons_sleeper_league_id_key" ON "sleeperSeasons"("sleeper_league_id");

-- AddForeignKey
ALTER TABLE "sleeperSeasons" ADD CONSTRAINT "fk_season" FOREIGN KEY ("season_id") REFERENCES "seasons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

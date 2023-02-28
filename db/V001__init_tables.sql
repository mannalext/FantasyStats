CREATE TABLE leagues (
  id SERIAL PRIMARY KEY,
  name varchar(100) NOT NULL
);

CREATE TABLE seasons (
  id SERIAL UNIQUE,
  league_id bigint NOT NULL,
  year int NOT NULL,
  PRIMARY KEY (league_id, year),
  CONSTRAINT fk_league
    FOREIGN KEY(league_id)
      REFERENCES leagues(id)
);

CREATE TABLE owners (
  id SERIAL PRIMARY KEY,
  display_name varchar(50) NOT NULL
);

CREATE TABLE teams (
  id SERIAL UNIQUE
  season_id bigint NOT NULL,
  owner_id bigint NOT NULL,
  wins int NOT NULL,
  losses int NOT NULL,
  ties int NOT NULL,
  PRIMARY KEY (season_id, owner_id),
  CONSTRAINT fk_season
    FOREIGN KEY(season_id) 
	    REFERENCES seasons(id),
  CONSTRAINT fk_owner
    FOREIGN KEY (owner_id)
      REFERENCES owners(id)
);
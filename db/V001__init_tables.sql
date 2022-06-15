CREATE TABLE leagues (
  league_id SERIAL PRIMARY KEY,
  name varchar(100) NOT NULL
);

CREATE TABLE seasons (
  season_id bigint PRIMARY KEY,
  league_id int NOT NULL,
  year int NOT NULL,
  CONSTRAINT fk_league
    FOREIGN KEY(league_id)
      REFERENCES leagues(league_id)
);

CREATE TABLE owners (
  owner_id uuid,
  display_name varchar(50) NOT NULL,
  PRIMARY KEY (owner_id)
);

CREATE TABLE teams (
  season_id bigint NOT NULL,
  owner_id uuid NOT NULL,
  wins int NOT NULL,
  losses int NOT NULL,
  ties int NOT NULL,
  PRIMARY KEY (season_id, owner_id),
  CONSTRAINT fk_season
    FOREIGN KEY(season_id) 
	    REFERENCES seasons(season_id),
  CONSTRAINT fk_owner
    FOREIGN KEY (owner_id)
      REFERENCES owners(owner_id)
);
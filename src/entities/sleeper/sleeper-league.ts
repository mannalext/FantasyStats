/* eslint-disable unicorn/prevent-abbreviations */
/**
 * A Sleeper League is the closest sleeper analog to a Season in my application. They create a new 'League' object every season
 */
export class SleeperLeague {
  leagueId: string;
  leagueName: string;
  rosterCount: number;
  sport: string;
  seasonType: string;
  seasonYear: number;
  rosterPositions: SleeperRosterPositionsDTO;
  previousLeagueId: string;
  loserBracketId: string;
  draftId: string;
  bracketId: string;

  constructor(
    leagueId: string,
    leagueName: string,
    rosterCount: number,
    sport: string,
    seasonType: string,
    seasonYear: number,
    rosterPositions: SleeperRosterPositionsDTO,
    previousLeagueId: string,
    loserBracketId: string,
    draftId: string,
    bracketId: string
  ) {
    this.leagueId = leagueId;
    this.leagueName = leagueName;
    this.rosterCount = rosterCount;
    this.sport = sport;
    this.seasonType = seasonType;
    this.seasonYear = seasonYear;
    this.rosterPositions = rosterPositions;
    this.previousLeagueId = previousLeagueId;
    this.loserBracketId = loserBracketId;
    this.draftId = draftId;
    this.bracketId = bracketId;
  }
}
export class SleeperLeagueDTO {
  total_rosters: number;
  status: string;
  sport: string;
  shard: number;
  settings: SleeperLeagueSettingsDTO;
  season_type: string;
  season: number;
  scoring_settings: SleeperScoringSettingsDTO;
  roster_positions: SleeperRosterPositionsDTO;
  previous_league_id: string;
  name: string;
  metadata: SleeperLeagueMetadataDTO;
  loser_bracket_id: number;
  league_id: string;
  last_transaction_id: number;
  last_read_id: string;
  last_pinned_message_id: string;
  last_message_time: number;
  last_message_text_map: string;
  last_message_id: string;
  last_message_attachment: string;
  last_author_is_bot: boolean;
  last_author_id: string;
  last_author_display_name: string;
  last_author_avatar: string;
  group_id: string;
  draft_id: string;
  display_order: number;
  company_id: string;
  bracket_id: number;
  avatar: string;

  constructor(
    total_rosters: number,
    status: string,
    sport: string,
    shard: number,
    settings: SleeperLeagueSettingsDTO,
    season_type: string,
    season: number,
    scoring_settings: SleeperScoringSettingsDTO,
    roster_positions: SleeperRosterPositionsDTO,
    previous_league_id: string,
    name: string,
    metadata: SleeperLeagueMetadataDTO,
    loser_bracket_id: number,
    league_id: string,
    last_transaction_id: number,
    last_read_id: string,
    last_pinned_message_id: string,
    last_message_time: number,
    last_message_text_map: string,
    last_message_id: string,
    last_message_attachment: string,
    last_author_is_bot: boolean,
    last_author_id: string,
    last_author_display_name: string,
    last_author_avatar: string,
    group_id: string,
    draft_id: string,
    display_order: number,
    company_id: string,
    bracket_id: number,
    avatar: string
  ) {
    this.total_rosters = total_rosters;
    this.status = status;
    this.sport = sport;
    this.shard = shard;
    this.settings = settings;
    this.season_type = season_type;
    this.season = season;
    this.scoring_settings = scoring_settings;
    this.roster_positions = roster_positions;
    this.previous_league_id = previous_league_id;
    this.name = name;
    this.metadata = metadata;
    this.loser_bracket_id = loser_bracket_id;
    this.league_id = league_id;
    this.last_transaction_id = last_transaction_id;
    this.last_read_id = last_read_id;
    this.last_pinned_message_id = last_pinned_message_id;
    this.last_message_time = last_message_time;
    this.last_message_text_map = last_message_text_map;
    this.last_message_id = last_message_id;
    this.last_message_attachment = last_message_attachment;
    this.last_author_is_bot = last_author_is_bot;
    this.last_author_id = last_author_id;
    this.last_author_display_name = last_author_display_name;
    this.last_author_avatar = last_author_avatar;
    this.group_id = group_id;
    this.draft_id = draft_id;
    this.display_order = display_order;
    this.company_id = company_id;
    this.bracket_id = bracket_id;
    this.avatar = avatar;
  }
}

export class SleeperLeagueSettingsDTO {
  daily_waivers_last_ran: number;
  reserve_allow_cov: number;
  reserve_slots: number;
  leg: number;
  offseason_adds: number;
  bench_lock: number;
  trade_review_days: number;
  league_average_match: number;
  waiver_type: number;
  max_keepers: number;
  type: number;
  pick_tracking: number;
  disable_trades: number;
  daily_wavers: number;
  taxi_years: number;
  trade_deadlin: number;
  veto_show_votes: number;
  reserve_allow_sus: number;
  reserve_allow_out: number;
  playoff_round_type: number;
  waiver_day_of_week: number;
  taxi_allow_vets: number;
  reserve_allow_dnr: number;
  veto_auto_poll: number;
  commissioner_direct_invite: number;
  reserve_allow_doubtful: number;
  waiver_clear_days: number;
  playoff_week_start: number;
  daily_waviers_days: number;
  last_scored_leg: number;
  taxi_slots: number;
  playoff_type: number;
  daily_waivers_hour: number;
  num_teams: number;
  veto_votes_needed: number;
  playoff_teams: number;
  playoff_seed_type: number;
  start_week: number;
  reserve_allow_na: number;
  draft_rounds: number;
  taxi_deadline: number;
  capacity_override: number;
  disable_adds: number;
  waiver_budget: number;
  last_report: number;
  best_ball: number;

  constructor(
    daily_waivers_last_ran: number,
    reserve_allow_cov: number,
    reserve_slots: number,
    leg: number,
    offseason_adds: number,
    bench_lock: number,
    trade_review_days: number,
    league_average_match: number,
    waiver_type: number,
    max_keepers: number,
    type: number,
    pick_tracking: number,
    disable_trades: number,
    daily_wavers: number,
    taxi_years: number,
    trade_deadlin: number,
    veto_show_votes: number,
    reserve_allow_sus: number,
    reserve_allow_out: number,
    playoff_round_type: number,
    waiver_day_of_week: number,
    taxi_allow_vets: number,
    reserve_allow_dnr: number,
    veto_auto_poll: number,
    commissioner_direct_invite: number,
    reserve_allow_doubtful: number,
    waiver_clear_days: number,
    playoff_week_start: number,
    daily_waviers_days: number,
    last_scored_leg: number,
    taxi_slots: number,
    playoff_type: number,
    daily_waivers_hour: number,
    num_teams: number,
    veto_votes_needed: number,
    playoff_teams: number,
    playoff_seed_type: number,
    start_week: number,
    reserve_allow_na: number,
    draft_rounds: number,
    taxi_deadline: number,
    capacity_override: number,
    disable_adds: number,
    waiver_budget: number,
    last_report: number,
    best_ball: number
  ) {
    this.daily_waivers_last_ran = daily_waivers_last_ran;
    this.reserve_allow_cov = reserve_allow_cov;
    this.reserve_slots = reserve_slots;
    this.leg = leg;
    this.offseason_adds = offseason_adds;
    this.bench_lock = bench_lock;
    this.trade_review_days = trade_review_days;
    this.league_average_match = league_average_match;
    this.waiver_type = waiver_type;
    this.max_keepers = max_keepers;
    this.type = type;
    this.pick_tracking = pick_tracking;
    this.disable_trades = disable_trades;
    this.daily_wavers = daily_wavers;
    this.taxi_years = taxi_years;
    this.trade_deadlin = trade_deadlin;
    this.veto_show_votes = veto_show_votes;
    this.reserve_allow_sus = reserve_allow_sus;
    this.reserve_allow_out = reserve_allow_out;
    this.playoff_round_type = playoff_round_type;
    this.waiver_day_of_week = waiver_day_of_week;
    this.taxi_allow_vets = taxi_allow_vets;
    this.reserve_allow_dnr = reserve_allow_dnr;
    this.veto_auto_poll = veto_auto_poll;
    this.commissioner_direct_invite = commissioner_direct_invite;
    this.reserve_allow_doubtful = reserve_allow_doubtful;
    this.waiver_clear_days = waiver_clear_days;
    this.playoff_week_start = playoff_week_start;
    this.daily_waviers_days = daily_waviers_days;
    this.last_scored_leg = last_scored_leg;
    this.taxi_slots = taxi_slots;
    this.playoff_type = playoff_type;
    this.daily_waivers_hour = daily_waivers_hour;
    this.num_teams = num_teams;
    this.veto_votes_needed = veto_votes_needed;
    this.playoff_teams = playoff_teams;
    this.playoff_seed_type = playoff_seed_type;
    this.start_week = start_week;
    this.reserve_allow_na = reserve_allow_na;
    this.draft_rounds = draft_rounds;
    this.taxi_deadline = taxi_deadline;
    this.capacity_override = capacity_override;
    this.disable_adds = disable_adds;
    this.waiver_budget = waiver_budget;
    this.last_report = last_report;
    this.best_ball = best_ball;
  }
}

export class SleeperScoringSettingsDTO {
  idp_tkl_ast: number;
  st_ff: number;
  idp_ff: number;
  pts_allow_7_13: number;
  def_st_ff: number;
  rec_yd: number;
  fum_rec_td: number;
  pts_allow_35p: number;
  pts_allow_28_34: number;
  fum: number;
  yds_allow_0_100: number;
  rush_yd: number;
  idp_qb_hit: number;
  yds_allow_100_199: number;
  pass_td: number;
  blk_kick: number;
  pass_yd: number;
  safe: number;
  idp_fum_rec: number;
  def_td: number;
  fgm_50p: number;
  def_st_td: number;
  idp_pass_def: number;
  fum_rec: number;
  yds_allow_300_349: number;
  rush_2pt: number;
  xpm: number;
  pts_allow_21_27: number;
  yds_allow_500_549: number;
  fgm_20_29: number;
  idp_sack: number;
  pts_allow_1_6: number;
  fum_lost: number;
  def_st_fum_rec: number;
  int: number;
  idp_pass_def_3p: number;
  idp_def_td: number;
  fgm_0_19: number;
  pts_allow_14_20: number;
  idp_safe: number;
  yds_allow_200_299: number;
  rec: number;
  idp_int: number;
  ff: number;
  fgmiss: number;
  st_fum_rec: number;
  idp_tkl_solo: number;
  idp_tkl_loss: number;
  rec_2pt: number;
  fgm: number;
  yds_allow_350_399: number;
  yds_allow_550p: number;
  idp_tkl: number;
  rush_td: number;
  xpmiss: number;
  fgm_30_39: number;
  idp_blk_kick: number;
  yds_allow_400_449: number;
  rec_td: number;
  st_td: number;
  yds_allow_450_499: number;
  pass_2pt: number;
  pts_allow_0: number;
  pass_int: number;
  fgm_40_49: number;
  sack: number;

  constructor(
    idp_tkl_ast: number,
    st_ff: number,
    idp_ff: number,
    pts_allow_7_13: number,
    def_st_ff: number,
    rec_yd: number,
    fum_rec_td: number,
    pts_allow_35p: number,
    pts_allow_28_34: number,
    fum: number,
    yds_allow_0_100: number,
    rush_yd: number,
    idp_qb_hit: number,
    yds_allow_100_199: number,
    pass_td: number,
    blk_kick: number,
    pass_yd: number,
    safe: number,
    idp_fum_rec: number,
    def_td: number,
    fgm_50p: number,
    def_st_td: number,
    idp_pass_def: number,
    fum_rec: number,
    yds_allow_300_349: number,
    rush_2pt: number,
    xpm: number,
    pts_allow_21_27: number,
    yds_allow_500_549: number,
    fgm_20_29: number,
    idp_sack: number,
    pts_allow_1_6: number,
    fum_lost: number,
    def_st_fum_rec: number,
    int: number,
    idp_pass_def_3p: number,
    idp_def_td: number,
    fgm_0_19: number,
    pts_allow_14_20: number,
    idp_safe: number,
    yds_allow_200_299: number,
    rec: number,
    idp_int: number,
    ff: number,
    fgmiss: number,
    st_fum_rec: number,
    idp_tkl_solo: number,
    idp_tkl_loss: number,
    rec_2pt: number,
    fgm: number,
    yds_allow_350_399: number,
    yds_allow_550p: number,
    idp_tkl: number,
    rush_td: number,
    xpmiss: number,
    fgm_30_39: number,
    idp_blk_kick: number,
    yds_allow_400_449: number,
    rec_td: number,
    st_td: number,
    yds_allow_450_499: number,
    pass_2pt: number,
    pts_allow_0: number,
    pass_int: number,
    fgm_40_49: number,
    sack: number
  ) {
    this.idp_tkl_ast = idp_tkl_ast;
    this.st_ff = st_ff;
    this.idp_ff = idp_ff;
    this.pts_allow_7_13 = pts_allow_7_13;
    this.def_st_ff = def_st_ff;
    this.rec_yd = rec_yd;
    this.fum_rec_td = fum_rec_td;
    this.pts_allow_35p = pts_allow_35p;
    this.pts_allow_28_34 = pts_allow_28_34;
    this.fum = fum;
    this.yds_allow_0_100 = yds_allow_0_100;
    this.rush_yd = rush_yd;
    this.idp_qb_hit = idp_qb_hit;
    this.yds_allow_100_199 = yds_allow_100_199;
    this.pass_td = pass_td;
    this.blk_kick = blk_kick;
    this.pass_yd = pass_yd;
    this.safe = safe;
    this.idp_fum_rec = idp_fum_rec;
    this.def_td = def_td;
    this.fgm_50p = fgm_50p;
    this.def_st_td = def_st_td;
    this.idp_pass_def = idp_pass_def;
    this.fum_rec = fum_rec;
    this.yds_allow_300_349 = yds_allow_300_349;
    this.rush_2pt = rush_2pt;
    this.xpm = xpm;
    this.pts_allow_21_27 = pts_allow_21_27;
    this.yds_allow_500_549 = yds_allow_500_549;
    this.fgm_20_29 = fgm_20_29;
    this.idp_sack = idp_sack;
    this.pts_allow_1_6 = pts_allow_1_6;
    this.fum_lost = fum_lost;
    this.def_st_fum_rec = def_st_fum_rec;
    this.int = int;
    this.idp_pass_def_3p = idp_pass_def_3p;
    this.idp_def_td = idp_def_td;
    this.fgm_0_19 = fgm_0_19;
    this.pts_allow_14_20 = pts_allow_14_20;
    this.idp_safe = idp_safe;
    this.yds_allow_200_299 = yds_allow_200_299;
    this.rec = rec;
    this.idp_int = idp_int;
    this.ff = ff;
    this.fgmiss = fgmiss;
    this.st_fum_rec = st_fum_rec;
    this.idp_tkl_solo = idp_tkl_solo;
    this.idp_tkl_loss = idp_tkl_loss;
    this.rec_2pt = rec_2pt;
    this.fgm = fgm;
    this.yds_allow_350_399 = yds_allow_350_399;
    this.yds_allow_550p = yds_allow_550p;
    this.idp_tkl = idp_tkl;
    this.rush_td = rush_td;
    this.xpmiss = xpmiss;
    this.fgm_30_39 = fgm_30_39;
    this.idp_blk_kick = idp_blk_kick;
    this.yds_allow_400_449 = yds_allow_400_449;
    this.rec_td = rec_td;
    this.st_td = st_td;
    this.yds_allow_450_499 = yds_allow_450_499;
    this.pass_2pt = pass_2pt;
    this.pts_allow_0 = pts_allow_0;
    this.pass_int = pass_int;
    this.fgm_40_49 = fgm_40_49;
    this.sack = sack;
  }
}

export type SleeperRosterPositionsDTO = Position[];

export type Position =
  | 'RB'
  | 'QB'
  | 'WR'
  | 'TE'
  | 'FLEX'
  | 'D/ST'
  | 'K'
  | 'BN'
  | 'IR'
  | 'RES'
  | 'DL'
  | 'LB'
  | 'S'
  | 'CB';

export class SleeperLeagueMetadataDTO {
  latest_league_winner_roster_id: string;
  keeper_deadline: string;
  auto_continue: string;

  constructor(latest_league_winner_roster_id: string, keeper_deadline: string, auto_continue: string) {
    this.latest_league_winner_roster_id = latest_league_winner_roster_id;
    this.keeper_deadline = keeper_deadline;
    this.auto_continue = auto_continue;
  }
}

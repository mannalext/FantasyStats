import { StatsRepository } from './stats/stats-repository';
import { PgStatsRepository } from './stats/pg-stats-repository';
import { InMemoryStatsRepository } from './stats/in-memory-stats-repository';
import { HttpSleeperClient } from './sleeper-client/http-sleeper-client';
import { SleeperClient } from './sleeper-client/sleeper-client';

export interface Ports {
  statsRepository: StatsRepository;
  sleeperClient: SleeperClient;
}

let ports: Ports;

export async function getPorts(): Promise<Ports> {
  if (process.env.USE_FAKE_PORTS === 'true') {
    ports = ports || createFakePorts();
  } else if (process.env.NODE_ENV === 'test') {
    ports = ports || createSandboxPorts();
  } else {
    ports = ports || (await createRealPorts());
  }

  return ports;
}

function createFakePorts(): Ports {
  return {
    statsRepository: new InMemoryStatsRepository(),
    sleeperClient: {} as unknown as SleeperClient, // TODO: decide whether to continue with the in-memory stuff or not
  };
}

function createSandboxPorts(): Ports {
  return {
    statsRepository: new PgStatsRepository(),
    sleeperClient: new HttpSleeperClient(),
  };
}

async function createRealPorts(): Promise<Ports> {
  return {
    statsRepository: new PgStatsRepository(),
    sleeperClient: new HttpSleeperClient(),
  };
}

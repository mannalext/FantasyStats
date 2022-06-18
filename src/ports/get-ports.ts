import { StatsRepository } from './stats/stats-repository';
import { PgStatsRepository } from './stats/pg-stats-repository';
import { InMemoryStatsRepository } from './stats/in-memory-stats-repository';

export interface Ports {
  statsRepository: StatsRepository;
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
  };
}

function createSandboxPorts(): Ports {
  return {
    statsRepository: new PgStatsRepository(),
  };
}

async function createRealPorts(): Promise<Ports> {
  return {
    statsRepository: new PgStatsRepository(),
  };
}

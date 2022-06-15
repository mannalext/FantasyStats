import { StatsRepository } from './stats/stats-repository';
import { PgStatsRepository } from './stats/pg-stats-repository';

export interface Ports {
  statsRepository: StatsRepository;
}

let ports: Ports;

export async function getPorts(): Promise<Ports> {
  if (process.env.USE_FAKE_PORTS === 'true') {
    ports = ports || createFakePorts();
  } else if (process.env.NODE_ENV === 'test') {
    await getConnection(); // TODO: this might not be necessary?
    ports = ports || createSandboxPorts();
  } else {
    await getConnection();
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

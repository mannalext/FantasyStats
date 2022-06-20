import { getPorts, Ports } from '../../src/ports/get-ports';
import { StatsRepository } from '../../src/ports/stats/stats-repository';

export interface PortsForTesting extends Ports {
  statsRepository: StatsRepository;
}

let _portsForTesting: PortsForTesting;

export async function setupPortsForTesting(): Promise<void> {
  const ports = await getPorts();
  _portsForTesting = ports as PortsForTesting;
}

export function getPortsForTesting(): PortsForTesting {
  return _portsForTesting;
}

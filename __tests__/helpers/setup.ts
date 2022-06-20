import { getPorts } from '../../src/ports/get-ports';
import { setupPortsForTesting } from './ports-for-testing';

beforeAll(async () => {
  await setupPortsForTesting();
});

beforeEach(async () => {
  await clearRepositories();
});

async function clearRepositories() {
  const ports = await getPorts();
  for (const port of Object.values(ports)) {
    if (port.deleteAll) {
      await port.deleteAll();
    }
  }
  jest.resetAllMocks();
}

import { ProviderExampleProvider } from './ProviderExampleProvider';
import { mockServices } from '@backstage/backend-test-utils';

describe('ProviderExampleProvider', () => {
  it('should read entities from the target', async () => {
    const logger = mockServices.logger.mock();
    const provider = new ProviderExampleProvider({
      id: 'test',
      target: 'https://example.com',
      logger: mockServices.logger.mock(),
      taskRunner: { run: jest.fn() },
    });

    const entities = await provider.read({ logger });

    expect(entities).toEqual([]);
  });
})

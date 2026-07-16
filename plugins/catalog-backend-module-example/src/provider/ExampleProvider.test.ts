import { ExampleProvider } from './ExampleProvider';
import { mockServices } from '@backstage/backend-test-utils';

describe('ExampleProvider', () => {
  it('should read entities from the target', async () => {
    const logger = mockServices.logger.mock();
    const provider = new ExampleProvider({
      id: 'test',
      target: 'https://example.com',
      logger: mockServices.logger.mock(),
      taskRunner: { run: jest.fn() },
    });

    const entities = await provider.read({ logger });

    expect(entities).toEqual([]);
  });
})

import { Config } from '@backstage/config';
import { serializeError, stringifyError } from '@backstage/errors';
import {
  DeferredEntity,
  EntityProvider,
  EntityProviderConnection,
} from '@backstage/plugin-catalog-node';
import { randomUUID } from 'node:crypto';
import { readProviderConfigs } from './readProviderConfigs';
import {
  LoggerService,
  SchedulerService,
  SchedulerServiceTaskRunner,
} from '@backstage/backend-plugin-api';

export type ProviderExampleProviderOptions = {
  /**
   * The logger to use.
   */
  logger: LoggerService;

  /**
   * Scheduler used to schedule refreshes based on
   * the schedule config.
   */
  scheduler: SchedulerService;
};

export class ProviderExampleProvider implements EntityProvider {
  static fromConfig(
    configRoot: Config,
    options: ProviderExampleProviderOptions,
  ): ProviderExampleProvider[] {
    return readProviderConfigs(configRoot).map(providerConfig => {
      return new ProviderExampleProvider({
        id: providerConfig.id,
        target: providerConfig.target,
        logger: options.logger,
        taskRunner: options.scheduler.createScheduledTaskRunner(
          providerConfig.schedule,
        ),
      });
    });
  }

  readonly #id: string;
  readonly #target: string;
  readonly #logger: LoggerService;
  readonly #taskRunner: SchedulerServiceTaskRunner;

  constructor(options: {
    id: string;
    target: string;
    logger: LoggerService;
    taskRunner: SchedulerServiceTaskRunner;
  }) {
    this.#id = options.id;
    this.#target = options.target;
    this.#logger = options.logger;
    this.#taskRunner = options.taskRunner;
  }

  /** {@inheritdoc @backstage/plugin-catalog-node#EntityProvider.getProviderName} */
  getProviderName() {
    return `ProviderExampleProvider:${this.#id}`;
  }

  /** {@inheritdoc @backstage/plugin-catalog-node#EntityProvider.connect} */
  async connect(connection: EntityProviderConnection) {
    const id = `${this.getProviderName()}:refresh`;

    // Schedule a refresh task to be run periodically
    await this.#taskRunner.run({
      id,
      fn: async () => {
        const logger = this.#logger.child({
          taskId: id,
          taskInstanceId: randomUUID(),
        });

        try {
          const entities = await this.read({ logger });

          logger.info(`Read ${entities.length} entities`);

          await connection.applyMutation({
            type: 'full',
            entities,
          });
        } catch (error) {
          const err = error instanceof Error ? error : new Error(stringifyError(error));
          logger.error(`Refresh failed: ${stringifyError(error)}`, serializeError(err));
        }
      },
    });
  }

  /**
   * Reads entities to be added to the catalog.
   */
  async read(options: { logger: LoggerService }): Promise<DeferredEntity[]> {
    const { logger } = options;

    logger.info(`Reading entities from ${this.#target}`);

    // TODO: Implement entity reading logic from the target
    const entities: DeferredEntity[] = [];

    return entities;
  }
}

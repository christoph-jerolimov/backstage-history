import {
  coreServices,
  createBackendModule,
  readSchedulerServiceTaskScheduleDefinitionFromConfig,
} from '@backstage/backend-plugin-api';
import { searchIndexRegistryExtensionPoint } from '@backstage/plugin-search-backend-node/alpha';
import { ExampleCollatorFactory } from './collator/ExampleCollatorFactory';

const DEFAULT_SCHEDULE = {
  frequency: { minutes: 10 },
  timeout: { minutes: 15 },
  initialDelay: { seconds: 3 },
};

export const searchModuleExample = createBackendModule({
  pluginId: 'search',
  moduleId: 'example-collator',
  register({ registerInit }) {
    registerInit({
      deps: {
        config: coreServices.rootConfig,
        logger: coreServices.logger,
        scheduler: coreServices.scheduler,
        indexRegistry: searchIndexRegistryExtensionPoint,
      },
      async init({ config, logger, scheduler, indexRegistry }) {
        const scheduleConfig = config
          .getOptionalConfig('search.collators.example')
          ?.getOptionalConfig('schedule');

        const schedule = scheduleConfig
          ? readSchedulerServiceTaskScheduleDefinitionFromConfig(scheduleConfig)
          : DEFAULT_SCHEDULE;

        indexRegistry.addCollator({
          schedule: scheduler.createScheduledTaskRunner(schedule),
          factory: ExampleCollatorFactory.fromConfig(config, { logger }),
        });
      },
    });
  },
});

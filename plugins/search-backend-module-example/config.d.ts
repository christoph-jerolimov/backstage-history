import { SchedulerServiceTaskScheduleDefinitionConfig } from '@backstage/backend-plugin-api';

export interface Config {
  search?: {
    collators?: {
      /**
       * Configuration options for the example collator.
       */
      example?: {
        /**
         * The schedule for how often to run the collation job.
         */
        schedule?: SchedulerServiceTaskScheduleDefinitionConfig;
      };
    };
  };
}

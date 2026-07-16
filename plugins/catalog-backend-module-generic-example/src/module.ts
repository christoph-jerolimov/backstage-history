import {
  coreServices,
  createBackendModule,
} from '@backstage/backend-plugin-api';

export const catalogModuleGenericExample = createBackendModule({
  pluginId: 'catalog',
  moduleId: 'generic-example',
  register(reg) {
    reg.registerInit({
      deps: { logger: coreServices.logger },
      async init({ logger }) {
        logger.info('Hello World!');
      },
    });
  },
});

import {
  coreServices,
  createBackendModule,
} from '@backstage/backend-plugin-api';
import { catalogProcessingExtensionPoint } from '@backstage/plugin-catalog-node';
import { ExampleProvider } from './provider/ExampleProvider';

export const catalogModuleExample = createBackendModule({
  moduleId: 'example-provider',
  pluginId: 'catalog',
  register({ registerInit }) {
    registerInit({
      deps: {
        logger: coreServices.logger,
        config: coreServices.rootConfig,
        scheduler: coreServices.scheduler,
        processing: catalogProcessingExtensionPoint,
      },
      async init({ logger, scheduler, config, processing }) {
        processing.addEntityProvider(
          ExampleProvider.fromConfig(config, {
            logger,
            scheduler,
          }),
        );
      }
    });
  },
})

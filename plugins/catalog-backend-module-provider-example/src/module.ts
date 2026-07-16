import {
  coreServices,
  createBackendModule,
} from '@backstage/backend-plugin-api';
import { catalogProcessingExtensionPoint } from '@backstage/plugin-catalog-node';
import { ProviderExampleProvider } from './provider/ProviderExampleProvider';

export const catalogModuleProviderExample = createBackendModule({
  moduleId: 'provider-example-provider',
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
          ProviderExampleProvider.fromConfig(config, {
            logger,
            scheduler,
          }),
        );
      }
    });
  },
})

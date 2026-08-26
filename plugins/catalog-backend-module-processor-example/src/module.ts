import {
  coreServices,
  createBackendModule,
} from '@backstage/backend-plugin-api';
import { catalogProcessingExtensionPoint } from '@backstage/plugin-catalog-node';
import { ProcessorExampleProcessor } from './processor/ProcessorExampleProcessor';

export const catalogModuleProcessorExample = createBackendModule({
  pluginId: 'catalog',
  moduleId: 'processor-example-processor',
  register({ registerInit }) {
    registerInit({
      deps: {
        config: coreServices.rootConfig,
        catalog: catalogProcessingExtensionPoint,
      },
      async init({ catalog, config }) {
        catalog.addProcessor(ProcessorExampleProcessor.fromConfig(config));
      },
    });
  },
});

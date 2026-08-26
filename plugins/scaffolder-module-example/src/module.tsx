import { createFrontendModule } from '@backstage/frontend-plugin-api';
import { ExampleFieldExtension } from './extensions/ExampleFieldExtension';

export const scaffolderModuleExample = createFrontendModule({
  pluginId: 'scaffolder',
  extensions: [ExampleFieldExtension],
});

import { coreServices, createBackendModule } from '@backstage/backend-plugin-api';
import { policyExtensionPoint } from '@backstage/plugin-permission-node/alpha';
import { ExamplePolicy } from './policy/ExamplePolicy';

export const permissionModuleExample = createBackendModule({
  pluginId: 'permission',
  moduleId: 'example',
  register({ registerInit }) {
    registerInit({
      deps: {
        policy: policyExtensionPoint,
        userInfo: coreServices.userInfo,
      },
      async init({ policy, userInfo }) {
        policy.setPolicy(new ExamplePolicy(userInfo));
      },
    });
  },
});

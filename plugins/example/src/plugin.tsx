import {
  createFrontendPlugin,
  PageBlueprint,
} from '@backstage/frontend-plugin-api';

import { rootRouteRef } from './routes';

export const page = PageBlueprint.make({
  params: {
    path: '/example',
    routeRef: rootRouteRef,
    loader: () =>
      import('./components/TodoPage').then(m => (
        <m.TodoPage />
      )),
  },
});

export const examplePlugin = createFrontendPlugin({
  pluginId: 'example',
  info: { packageJson: () => import('../package.json') },
  extensions: [page],
  routes: {
    root: rootRouteRef,
  }
});

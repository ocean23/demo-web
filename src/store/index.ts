import type { App } from 'vue';
import { createStore, createLogger } from 'vuex';

const debug = process.env.NODE_ENV !== 'production';

const modulesFiles = require.context('./modules', true, /\.ts/);

const modules = modulesFiles.keys().reduce((module, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  // eslint-disable-next-line no-param-reassign
  module[moduleName] = value.default;
  return module;
}, {} as any);

const store = createStore({
  modules,
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});

export function setupStore(app: App<Element>) {
  app.use(store);
}

export default store;

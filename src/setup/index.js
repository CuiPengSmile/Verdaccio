import router from '../router';
import store from '../store';

import { executor } from '../utils/require';

const init = () => {
  executor(require.context('.', false, /\.pre\.js$/), { router, store });

  return {
    router,
    store
  };
};

export { init };

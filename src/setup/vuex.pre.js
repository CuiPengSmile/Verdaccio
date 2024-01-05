import { executor } from '../utils/require';

export default payload => {
  executor(require.context('../store', false, /\.vuex\.js$/), payload);
};

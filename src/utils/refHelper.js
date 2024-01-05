let _showGlobalMessage = null;

export default class {
  /* 设置message提示 */
  static setGlobalMessageRef = (ref) => {
    _showGlobalMessage = ref;
  };
  /* 获取message提示 */
  static getGlobalMessageRef = () => {
    _showGlobalMessage;
  };
}

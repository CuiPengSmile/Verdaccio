import refHelper from "./refHelper";
import LeftControl from "../components/left-menu/control/left-control";

export default class {
  /* 定义message方法 */
  static onShowMessage(msg, type) {
    const ref = refHelper.getGlobalMessageRef();
    if (ref) {
      ref.showMessage(msg, type);
    }
  }

  /* 侧边菜单栏 */
  static toggleLeftPanel() {
    if (LeftControl.getLeftPanelVisible()) {
      LeftControl.setLeftPanelVisible(false);
    } else {
      LeftControl.setLeftPanelVisible(true);
    }
  }
}

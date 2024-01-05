import _ from "lodash";
import Global from "@/utils/global";

export default class {
  /** 获取left panel visible */
  static getLeftPanelVisible() {
    return _.get(
      Global.store,
      "state.application.left-control.leftPanelVisible"
    );
  }

  /** 设置left panel visible */
  static setLeftPanelVisible(visible) {
    Global.store.commit(
      "application/left-control/setLeftPanelVisible",
      visible
    );
  }
}

/**
 * default application plugin
 *   说明
 *     application plugin示例
 *
 *   message服务
 *     key: broad, action: plugin-ready, params: [pluginName] 向所有插件广播functional plugin ready状态, [pluginName] => any, 注意针对broad其action需要保持全局唯一
 *     key: broad, action: plugin-unready, params: [pluginName] 向所有插件广播functional plugin unready状态, [pluginName] => any
 *     key: broad, action: modal-active, params: [pluginName, applicationFullMode] 向所有插件广播functional plugin成功进入modal状态, [pluginName, applicationFullMode] => any
 *     key: broad, action: modal-inactive, params: [pluginName, applicationFullMode] 向所有插件广播functional plugin成功退出modal状态, [pluginName, applicationFullMode] => any
 *     key: broad, action: application-full 向所有插件广播application container成功进入full模式, () => any
 *     key: broad, action: application-recover 向所有插件广播application container成功退出full模式, () => any
 *
 *     key: function, action: string, params: array, 远程函数调用, action指定要调用的frame实例方法名称, params指定要传递给要调用的frame实例方法的参数数组, params会被解构后作为入参
 *
 *   message请求
 *     key: token, action: query, 从frame中获取未验证的token
 *     key: token, action: remove, 登出
 *
 *     key: param, action: instant, 查询instant param
 *     key: param, action: sticky, 查询sticky param
 *
 *     key: full, action: enter, 使application container进入full模式, 若application container已处于full模式, 则忽略该指令并返回 { result: false }
 *     key: full, action: exit, 使application container退出full模式, 若application container未处于full模式, 则忽略该指令并返回 { result: false }
 *
 *     key: navigator, action: query, 查询目前所有application plugins数组
 *     key: navigator, action: change, params: [applicationId, pluginUrl, extend], 改变当前application, 将移除所有已存在的application队列, params指定要跳转到的application plugin的id和url和临时参数extend, 返回操作后的applications数组
 *     key: navigator, action: stack, params: [applicationId, pluginUrl, extend], 堆叠application, params指定要堆叠的application plugin的id和url和临时参数extend, 返回操作后的applications数组
 *     key: navigator, action: replace, params: [applicationId, pluginUrl, extend], 替换当前最上层的application, params指定要替换的application plugin的id和url和临时参数extend, 返回操作后的applications数组
 *     key: navigator, action: remove, params: [applicationId], 移除给定的application, params指定要替换的application plugin的id, 返回操作后的applications数组
 *     key: navigator, action: window, params: [applicationId, pluginUrl, extend, features], 使用打开新窗口的方式打开plugin plugin, 返回新打开window对应的window.name
 *
 *     key: redirect, action: error, params: [reason], 重定向到error页
 *     key: redirect, action: login, 重定向到login页
 *     key: redirect, action: url, params: [url], 重定向指定的地址
 *
 *     key: notify, action: success, params: [notifyContent, detailParamObj, vanishDelay], notify success data, params中notifyContent表示要显示的文字内容, detailParamObj表示显示detail并设置click参数(回调), vanishDelay表示自动消失延迟时间(ms)
 *     key: notify, action: info, params: [notifyContent, detailParamObj, vanishDelay], notify info data, params同上
 *     key: notify, action: warn, params: [notifyContent, detailParamObj, vanishDelay], notify warn data, params同上
 *     key: notify, action: error, params: [notifyContent, detailParamObj, vanishDelay], notify error data, params同上
 *
 *     key: function, action: string, params: array, 远程函数调用, action指定要调用的frame实例方法名称, params指定要传递给要调用的frame实例方法的参数数组, params会被解构后作为入参
 *
 *   emit events
 *     init-error, 初始化失败, error => any
 *     init-success, 初始化成功, () => any
 *     plugin-ready, functional plugin ready, params => any
 *     plugin-unready, functional plugin unready, params => any
 *     modal-active, functional plugin modal active, params => any
 *     modal-inactive, functional plugin modal inactive, params => any
 *     application-full, application container enter full mode, params => any
 *     application-recover, application container exit full mode, params => any
 *     application-update, application队列发生变化, applications => any;
 *     function-invoke, 接收到远程function调用指令时触发, (action, params, result) => any
 *
 * @author Ro6in
 */

import { ApplicationPlugin } from '@divinity/uidp-frame-default';
import RESOURCE from '@/utils/plugin/resource';

export default class extends ApplicationPlugin {
  constructor() {
    super();
  }
  /**
   * 初始化plugin
   */
  async init() {
    await super.init();

    this.querier.query = async event => {
      const { payload } = event.data;

      if (payload && typeof payload === 'object') {
        const { key, action, params } = payload;
        switch (key) {
          case 'broad':
            // Ro6in: 注意broad无需进行未支持的action处理, 静默应答即可
            // Ro6in: 注意无法获取打打开自身时的application update通知
            if (action === 'plugin-ready') {
              this.emit('plugin-ready', params);
              return { result: true };
            } else if (action === 'plugin-unready') {
              this.emit('plugin-unready', params);
              return { result: true };
            } else if (action === 'modal-active') {
              this.emit('modal-active', params);
              return { result: true };
            } else if (action === 'modal-inactive') {
              this.emit('modal-inactive', params);
              return { result: true };
            } else if (action === 'application-full') {
              this.emit('application-full', params);
              return { result: true };
            } else if (action === 'application-recover') {
              this.emit('application-recover', params);
              return { result: true };
            } else if (action === 'application-update') {
              if (Array.isArray(params)) {
                const [applications] = params;
                this.emit('application-update', applications);
                return { result: true };
              }

              return { result: null };
            }

            return { result: null };
          case 'function':
            // 通用本地函数远程调用支持
            try {
              const result = await this[action](...(Array.isArray(params) ? params : []));
              this.emit('function-invoke', action, params, result);

              return { result };
            } catch (error) {
              return { error: `[${RESOURCE.FUNCTION_REQUEST_EXCEPTION}] ${error.message}` };
            }
          default:
            return { error: RESOURCE.UNSUPPORT_REQUEST_KEY };
        }
      } else {
        return { error: RESOURCE.INVALID_REQUEST_PAYLOAD };
      }
    };

    try {
      this.emit('init-success');
    } catch (error) {
      this.emit('init-error', error);
    }
  }
}

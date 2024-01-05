import {
  SlaveRequesterFactory as RequesterFactory,
  MasterExecutorFactory as ExecutorFactory
} from '@divinity/package-message-frame';
import io from 'socket.io-client';

// 插件类型名称
const PLUGIN_TYPE_NAMES = {
  USER_PLUGIN: 'user-plugin',
  MENU_PLUGIN: 'menu-plugin',
  MESSAGE_PLUGIN: 'message-plugin',
  TOOLS_PLUGIN: 'tools-plugin'
};
/**
 *  全屏或退出全屏
 * @param {初始化注册的插件对象} plugin
 * @param {是否全屏，默认非全屏} isFull
 * @returns
 */
export async function fullScreenToggle(plugin, isFull = false) {
  if (!plugin) return new Error('plugin参数缺少');
  let result = null;
  result = await plugin.cross.requestMaster(RequesterFactory.requesters.data, {
    key: 'full',
    action: isFull ? 'exit' : 'enter'
  });
  return result && result.result;
}

// 导航类型
export const NAVIGATOR_ACTION = {
  CHANGE: 'change',
  STACK: 'stack',
  REPLACE: 'replace',
  REMOVE: 'remove'
};
/**
 * 页面导航工具方法
 * @param {action 为导航类型,默认为CHANGE类型，pageParams 页面传递参数} param0
 * @returns
 */
export async function navigator({ plugin, menuId, action = NAVIGATOR_ACTION.CHANGE, pageParams = null }) {
  if (!plugin) return new Error('plugin参数缺少');
  if (!menuId) return new Error('menuId 不能为空');
  let params = [menuId];
  pageParams && params.push(pageParams);
  return plugin.parseResponse(
    await plugin.cross.requestMaster(
      RequesterFactory.requesters.forward,
      {
        key: 'navigator',
        action,
        params
      },
      {
        extend: {
          target: PLUGIN_TYPE_NAMES.MENU_PLUGIN,
          type: ExecutorFactory.executors.data
        }
      }
    )
  );
}
/**
 * 获取用户信息
 * @param {初始化注册的插件对象} plugin
 * @returns 用户信息
 */
export async function fetchUserInfo(plugin) {
  if (!plugin) return new Error('plugin参数缺少');
  return plugin.parseResponse(
    await plugin.cross.requestMaster(
      RequesterFactory.requesters.forward,
      {
        key: 'user',
        action: 'query'
      },
      {
        extend: {
          target: PLUGIN_TYPE_NAMES.USER_PLUGIN,
          type: ExecutorFactory.executors.data
        }
      }
    )
  );
}
/**
 * 获取
 * @param {初始化注册的插件} plugin
 * @returns
 */
export async function fetchPermissions(plugin) {
  if (!plugin) return new Error('plugin参数缺少');
  return plugin.parseResponse(
    await plugin.cross.requestMaster(
      RequesterFactory.requesters.forward,
      {
        key: 'permission',
        action: 'query'
      },
      {
        extend: {
          target: PLUGIN_TYPE_NAMES.MENU_PLUGIN,
          type: ExecutorFactory.executors.data
        }
      }
    )
  );
}

/**
 * 消息订阅推送
 * @param {房间Id} roomId
 * @param {回调，参数接收} cb
 */
export async function newsSubscription(token, roomId, cb) {
  const websocketApiUrl = window.settings?.websocketApiUrl;
  // if (!websocketApiUrl) return new Error('websocketApiUrl 未配置，请检查配置');
  const socket = io(websocketApiUrl, {
    path: '/io',
    query: {
      token: token,
      roomId: `channel-${roomId}`,
      roomFeature: JSON.stringify({
        uniqueUserRoom: false,
        uniqueUserRoomLastIn: false
      })
    }
  });
  // 监听 socket 连接
  socket.on('connect', () => {
    if (socket.connected) {
      socket.on('room-push', data => {
        typeof cb === 'function' && cb(data);
      });
    }
  });
  // 监听 socket 断连
  socket.on('disconnect', reason => {
    // 服务器断连，重连
    if (reason === 'io server disconnect') {
      socket.connect();
    }
  });
  // 连接异常
  socket.on('connect_error', error => {
    console.error('socket:', error);
  });
}

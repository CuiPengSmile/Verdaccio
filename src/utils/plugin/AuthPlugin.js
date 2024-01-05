import { ApplicationRequest } from '@xy/package-backend-request';
import { ApplicationEnv as Env } from '@xy/package-environment-config';
import { fetchPermissions } from './pluginHelper';
import { VuexHelper } from '@xy/package-vue-utils';
import {
  SlaveRequesterFactory as RequesterFactory,
  MasterExecutorFactory as ExecutorFactory
} from '@divinity/package-message-frame';
import { VuexHelper } from '@xy/package-vue-utils';
const permissionMixin = VuexHelper.VuexMixinFactory.createMixin('global/permission', {
  mutations: ['setPermissions']
});

export default {
  mixins: [permissionMixin],
  methods: {
    async pluginInit(Plugin, { beforeInit } = {}) {
      const plugin = new Plugin();
      this.plugin = plugin;

      if (typeof beforeInit === 'function') {
        beforeInit();
      }
      try {
        await plugin.init();
      } catch (error) {
        console.log(error);
      }
    },
    async initSuccess() {
      if (typeof this.setToken === 'function') {
        //生产环境
        if (!Env.production) {
          const token =
            'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJsaXVjaHVuIiwidXNlck5hbWUiOiJsaXVjaHVuIiwidXNlckFsaWFzIjoi5YiY5rezIiwib3JnSWQiOiIzMTAxMDE1MDAwMDAiLCJvcmdOYW1lIjoi5aSW5rup5rK75a6J5rS-5Ye65omAIiwiZXhwIjoxNjQ4MDMwNjE3LCJpYXQiOjE2NDU0Mzg2MTd9.sR8--ijyfcHEPZ4TF1n4BxHU1ZCMccq6OV1hjy5me_g';
          this.plugin.token = token;
        }

        if (this.plugin && this.plugin.token) {
          try {
            this.setToken(this.plugin.token);
            ApplicationRequest.initRequestParams(this.plugin);
            ApplicationRequest.registerPrivateRequest(this.plugin.token);
          } catch (e) {
            console.log(e);
          }
        }
      }
      this.loading = false;
    },
    initError(error) {
      console.error('init-error:', error);
      this.loading = false;
    },

    async handlePermission() {
      let result = [];
      if (!Env.production) {
        this.setPermissions([
          { menuId: 'SPDY-PLAN-SORT', status: 1 },
          { menuId: 'VOICE', status: 1 },
          { menuId: 'PTZ-PRESET-SET', status: 1 },
          { menuId: 'PTZ-PRESET-USE', status: 1 },
          { menuId: 'VIDEO-TRANSFER', status: 1 },
          { menuId: 'VIDEO-LOCAL', status: 1 }
        ]);
      } else {
        result = await fetchPermissions(this.plugin);
        if (Array.isArray(result) && result.length > 0) {
          this.setPermissions(result);
        }
      }
    },
    //获取用户消息部分
    async requestUserInfo() {
      if (Env.production) {
        return this.plugin.parseResponse(
          await this.plugin.cross.requestMaster(
            RequesterFactory.requesters.forward,
            {
              key: 'user',
              action: 'query'
            },
            {
              extend: {
                target: 'user-plugin',
                type: ExecutorFactory.executors.data
              }
            }
          )
        );
      }
    }
  }
};

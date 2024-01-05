const PKG = require("./package.json");

const tag = {
  moduleName: PKG.name,
  moduleAlias: `${PKG.zhName}`,
  branches: {
    // 分支名称
    dev: {
      majorVersion: `${PKG.name}-v${PKG.version}`,
      // 若为开发分支, 统一设置为development
      secondaryVersion: "development",
    },
    test: {
      majorVersion: `${PKG.name}-v${PKG.version}`,
      // 若为开发分支, 统一设置为development
      secondaryVersion: "development",
    },
  },
};

module.exports = tag;

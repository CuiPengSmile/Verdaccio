const path = require("path");
const fs = require("fs");
const os = require("os");
const tag = require("../.tag.js");

/* 生成version文件 */
const createVersionFile = () => {
  const branch = tag.branches["dev"];
  if (!branch) {
    throw new Error("current git branch invalid for .tag.js");
  }
  const version = {
    // 主要tag
    moduleName: tag.moduleName,
    moduleAlias: tag.moduleAlias,
    // 次要tag, 通过当前分支识别
    moduleVer: branch.majorVersion,
    moduleSubVer: branch.secondaryVersion,
    // 当前分支名
    gitBranchName: process.env.GIT_BRANCH_NAME,
    // gitlab project url
    gitRemoteUrl: process.env.GIT_PROJECT_URL,
    // 构建主机名
    gitBuildHost: os.hostname(),
    // 构建时间
    gitBuildTime: process.env.APPLICATION_BUILD_TIME,
    // 当前git用户
    gitBuildUserName: process.env.APPLICATION_BUILD_USER,
    // 当前git提交号
    gitCommitId: process.env.GIT_COMMIT_ID,
    // 当前git提交描述
    gitCommitMessage: process.env.GIT_COMMIT_MESSAGE,
    // 当前git提交时间
    gitCommitTime: process.env.GIT_COMMIT_TIME,
    // 当前commit提交用户
    gitCommitUserName: process.env.GIT_COMMIT_USER,
  };

  // 写入version文件
  fs.writeFileSync(
    path.resolve(__dirname, "..", "./.version.json"),
    JSON.stringify(version)
  );
};

module.exports = {
  createVersionFile,
};

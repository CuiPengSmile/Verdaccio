const path = require("path");
const { createVersionFile } = require("./webpack/version-creator");
const { name } = require("./package.json");

// // 当前分支名
// const gitBranchName = process.env.GIT_BRANCH_NAME;
// // 当前git提交号
// const gitCommitId = process.env.GIT_COMMIT_ID;
// // 当前git提交时间
// const gitCommitUser = process.env.GIT_COMMIT_USER;
// // 当前git提交时间
// const gitCommitTime = process.env.GIT_COMMIT_TIME;
// // gitlab project url
// const gitProjectUrl = process.env.GIT_PROJECT_URL;
// // 当前git用户
// const applicationBuildUser = process.env.APPLICATION_BUILD_USER;
// // 构建时间
// const applicationBuildTime = process.env.APPLICATION_BUILD_TIME;

// 生成version文件
createVersionFile();
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === "production" ? `./${name}/` : "./",
  outputDir: name,
  assetsDir: "",
  // webpack得相关配置
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
        components: resolve(__dirname, "@/components"),
      },
    },
  },
  chainWebpack: (config) => {
    // 移除prefetch插件
    config.plugins.delete("prefetch");
    // html-webpack-plugin
    // config.plugin("html").tap((options) => {
    //   options.forEach((option) => {
    //     option.meta = {
    //       "git-branch-name": gitBranchName,
    //       "git-commit-id": gitCommitId,
    //       "git-commit-user": gitCommitUser,
    //       "git-commit-time": gitCommitTime,
    //       "git-project-url": gitProjectUrl,
    //       "application-build-user": applicationBuildUser,
    //       "application-build-time": applicationBuildTime,
    //     };
    //   });

    //   return options;
    // });
  },
  devServer: {
    port: 8088,
    host: "0.0.0.0",
    https: false,
    open: true,
    client: {
      overlay: false,
    },
  },
};

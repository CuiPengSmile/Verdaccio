const { spawnSync } = require("child_process");

// 字符串补齐函数
const pad = (data) => data.toString().padStart(2, "0");
// 格式化时间函数
const formatDateString = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
// 去除字符串空格
const trim = (string) => string.replace(/"/g, "").replace(/\n/g, "");

// 获取当前分支名
let git = spawnSync("git", ["branch", "--show-current"]);
const branchName = trim(git.stdout.toString("utf8"));

// 获取当前git提交号(%H完整hash, %h short hash)
git = spawnSync("git", ["log", "-1", '--pretty=format:"%H"']);
const commitId = trim(git.stdout.toString("utf8"));

// 获取当前git提交描述(subject)
git = spawnSync("git", ["log", "-1", '--pretty=format:"%s"']);
const commitSubject = trim(git.stdout.toString("utf8"));

// 获取当前git提交时间
git = spawnSync("git", ["log", "-1", '--pretty=format:"%cd"']);
const commitTime = formatDateString(new Date(git.stdout.toString("utf8")));

// 获取当前git提交用户
git = spawnSync("git", ["log", "-1", '--pretty=format:"%cn"']);
const commitUser = trim(git.stdout.toString("utf8"));

// gitlab project url
git = spawnSync("git", ["remote", "get-url", "origin"]);
const projectUrl = trim(git.stdout.toString("utf8"));

// 获取当前git用户
git = spawnSync("git", ["config", "user.name"]);
const buildUser = trim(git.stdout.toString("utf8"));

// 构建时间
const buildTimeString = formatDateString(new Date());

module.exports = {
  GIT_BRANCH_NAME: branchName,
  GIT_COMMIT_ID: commitId,
  GIT_COMMIT_SUBJECT: commitSubject,
  GIT_COMMIT_USER: commitUser,
  GIT_COMMIT_TIME: commitTime,
  GIT_PROJECT_URL: projectUrl,
  APPLICATION_BUILD_USER: buildUser,
  APPLICATION_BUILD_TIME: buildTimeString,
};

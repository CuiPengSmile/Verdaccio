const Mock = require("mockjs");
const Random = Mock.Random;

const list = [
  {
    // 自增ID
    id: Random.increment(),
    // 中文名字 | 姓 | 名
    chinaNname: Random.cname(),
    // 英文名 | firatname | lastname | 带中间字的
    engName: Random.name(),
    // 身份证
    identify: Random.id(),
    // 标题
    title: Random.ctitle(),
    // 数字 最小1 最大100
    status: Random.integer(0, 3),
    // 图片
    imageUrl: Random.image("200x100", "#ffcc33", "#FFF", "png", "文字"),
    // 日期 时间 YYYY-MM-DD HH:mm:ss
    createDate: Random.datetime(),
    // 当前日期
    nowDate: Random.now(),
    // 内容
    word: Random.cword(),
    // 一段文本 1段-100段
    content: Random.cparagraph(1, 2),
    // 英文 内容
    sentence: Random.sentence(),
    // 省 city zip couty 等
    province: Random.province(),
    // 区域
    region: Random.region(),

    china_first: Random.cfirst(),
    china_last: Random.clast(),
    eng_first: Random.first(),
    eng_last: Random.last(),
    // 长度为4的字符串
    string: Random.string(4),
    // 数字 浮点数
    num: Random.float(1, 10, 1, 4),
    // 数字 字符串
    numString: Random.character("number"),
    // 日期 YYYY-MM-DD
    date: Random.date(),
    // 时间 HH:mm:ss
    time: Random.time(),
    // 颜色 hex  rgb
    color: Random.color(),
    // ip 域名 网址
    ip: Random.ip(),
    url: Random.url(),
  },
  {
    // 自增ID
    id: Random.increment(),
    // 中文名字 | 姓 | 名
    chinaNname: Random.cname(),
    // 英文名 | firatname | lastname | 带中间字的
    engName: Random.name(),
    // 身份证
    identify: Random.id(),
    // 标题
    title: Random.ctitle(),
    // 数字 最小1 最大100
    status: Random.integer(0, 3),
    // 图片
    imageUrl: Random.image("200x100", "#ffcc33", "#FFF", "png", "文字"),
    // 日期 时间 YYYY-MM-DD HH:mm:ss
    createDate: Random.datetime(),
    // 当前日期
    nowDate: Random.now(),
    // 内容
    word: Random.cword(),
    // 一段文本 1段-100段
    content: Random.cparagraph(1, 2),
    // 英文 内容
    sentence: Random.sentence(),
    // 省 city zip couty 等
    province: Random.province(),
    // 区域
    region: Random.region(),

    china_first: Random.cfirst(),
    china_last: Random.clast(),
    eng_first: Random.first(),
    eng_last: Random.last(),
    // 长度为4的字符串
    string: Random.string(4),
    // 数字 浮点数
    num: Random.float(1, 10, 1, 4),
    // 数字 字符串
    numString: Random.character("number"),
    // 日期 YYYY-MM-DD
    date: Random.date(),
    // 时间 HH:mm:ss
    time: Random.time(),
    // 颜色 hex  rgb
    color: Random.color(),
    // ip 域名 网址
    ip: Random.ip(),
    url: Random.url(),
  },
  {
    // 自增ID
    id: Random.increment(),
    // 中文名字 | 姓 | 名
    chinaNname: Random.cname(),
    // 英文名 | firatname | lastname | 带中间字的
    engName: Random.name(),
    // 身份证
    identify: Random.id(),
    // 标题
    title: Random.ctitle(),
    // 数字 最小1 最大100
    status: Random.integer(0, 3),
    // 图片
    imageUrl: Random.image("200x100", "#ffcc33", "#FFF", "png", "文字"),
    // 日期 时间 YYYY-MM-DD HH:mm:ss
    createDate: Random.datetime(),
    // 当前日期
    nowDate: Random.now(),
    // 内容
    word: Random.cword(),
    // 一段文本 1段-100段
    content: Random.cparagraph(1, 2),
    // 英文 内容
    sentence: Random.sentence(),
    // 省 city zip couty 等
    province: Random.province(),
    // 区域
    region: Random.region(),

    china_first: Random.cfirst(),
    china_last: Random.clast(),
    eng_first: Random.first(),
    eng_last: Random.last(),
    // 长度为4的字符串
    string: Random.string(4),
    // 数字 浮点数
    num: Random.float(1, 10, 1, 4),
    // 数字 字符串
    numString: Random.character("number"),
    // 日期 YYYY-MM-DD
    date: Random.date(),
    // 时间 HH:mm:ss
    time: Random.time(),
    // 颜色 hex  rgb
    color: Random.color(),
    // ip 域名 网址
    ip: Random.ip(),
    url: Random.url(),
  },
];

const data = Mock.mock("/mock/dataList", {
  code: 200,
  data: Random.pick(list, 3),
});

export default { data };

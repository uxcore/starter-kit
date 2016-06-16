/**
 * 国际化资源文件索引命名规范：
 * - 全局公用资源：global.xxx
 * - 模块所属资源：moduleName.xxx
 * - 页面所属资源：pageName.xxx
 */
'use strict';

module.exports = {
    'page1.demo': '演示',
    'i18n': '国际化支持',
    'changeServer': ' 改变 `abc.json` 里的 `options.vars.locale` 为 `en`, 重启服务器，访问 serverip:port/?locale=zh-cn 查看变化'
};

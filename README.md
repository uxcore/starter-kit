## starter-kit

---

UXCore starter kit Powered by [Nowa](http://nowa-webpack.github.io/web/index.html?en)

**RUN `npm install` first**

## Directory structure

```
.
├── abc.json  ------------------------- nowa config file
├── favicon.ico  ---------------------- favicon
├── html  ----------------------------- html folder
│   └── index.html  ------------------- project entry
├── package.json  --------------------- npm config file
├── README.md  ------------------------ readme
└── src  ------------------------------ source folder
    ├── app  -------------------------- project-level source
    │   ├── app.js  ------------------- project-level javascript
    │   ├── app.less  ----------------- project-level style
    ├── components  ------------------- project components
    ├── i18n  ------------------------- i18n folder
    │   ├── en.js
    │   ├── index.js  ----------------- i18n loader
    │   └── zh-cn.js
    ├── images  ----------------------- image folder
    └── pages  ------------------------ page folder
        └── demo  --------------------- some page
            ├── index.js  ------------- entry file
            ├── actions.js  ----------- reflux actions of the page
            ├── store.js  ------------- reflux store of the page
            ├── PageDemo.js  ---------- react view of the page
            └── PageDemo.less  -------- style of the page
```

## Commands

- development

```
npm start
```

> this command will start a local server（[http://localhost:3000/](http://localhost:3000/) ）and watch the change of the source file.

- building for production

```
npm run build
```

- building uxcore

```
npm run lib
```

- 更多命令和参数（端口、代理、依赖库、国际化、热构建、https……）

请查看 nowa 的官方文档：

[https://nowa-webpack.github.io/](https://nowa-webpack.github.io/)

## 页面引用资源列表

项目在本地调试以及打包过程中会输出以下入口文件：

- 如果存在 `app/app.js` 的话，则输出 `app.js`。
- 如果在 `app/app.js` 中引入了样式资源，则输出 `app.css`。
- 如果存在 `pages/page/index.js` 的话，则输出 `page.js`（此处 page 泛指 pages 目录下的任意目录名）。
- 如果在 `page.js` 中引入了样式资源，则输出 `page.css`。

对于一个页面，除了引入外部资源外，一般需要引入 `app.css`、`page.css`、`app.js`、`page.js` 这几个文件。

本地调试服务器并不会向文件系统写入任何文件，请求的资源只存在于内存中。

## 构建变量和输出文件名后缀

`abc.json` 中提供了运行时变量和构建变量以供运行时和构建时进行变量注入。

### 运行时变量（vars）

运行时变量的定义形如：

```
{
    "vars": {
        "locale": "zh-cn",
        "container": "nw",
        "__LOCAL__": true
    }
}
```

> 这里定义的变量将以全局变量的形式，在 `nowa server` 时注入到代码中。

### 构建变量（buildvars）

构建变量的定义形如：

```
{
    "buildvars": {
        "locale": [ "zh-cn", "en" ],
        "container": [ "dingding", "nw" ]
    }
}
```

> 构建变量和运行时变量作用类似，但同一变量允许有多个候选值，构建器将根据不同的候选值对每个 js 生成不同后缀的文件。

> 例如，以上例子对于 app.js 将生成这些文件：app-zh-cn-dingding.js、app-zh-cn-nw.js、app-en-dingding.js、app-en-nw.js，每个文件中的 locale 和 container 变量分别对应到其后缀所指明的值。

> `buildvars` 会自动包含 `vars` 中的定义。

> 当某个变量仅有一个候选值时，将不会添加文件后缀。

## CSS约定

具体请参考[这里](http://gitlab.alibaba-inc.com/uxcore/uxcore-kuma/tree/master)。

## 外部工具

脚手架默认引入了以下外部工具库：

| 类库 | 全局名称 |
| ---- | ------ |
| React | React |
| Reflux | Reflux |
| ReactDOM | ReactDOM |
| Lodash | _ |
| jQuery | $ |
| NattyDB | NattyDB |

> [React](http://reactjs.cn/) 和 [Refulx](https://github.com/reflux/refluxjs) 的使用，请参考各自的官方文档。

## Uxcore 模块

Uxcore 组件库请参考[这里](http://uxco.re/)。

### 定制 Uxcore

可通过在 abc.json 中增加相应配置来定制项目所需的 Uxcore，详见 [nowa-lib 插件](https://www.npmjs.com/package/nowa-lib)。

## 国际化解决方案

`src/i18n` 目录为国际化文案资源文件存放目录，其中除了 `index.js` 之外的文件均为国际化语言资源文件。

`index.html` 中通过请求不同后缀的 js 文件（home-zh-cn.js、home-en.js）来指定当前使用语言。

可以修改 `abc.json` 中的 `options.vars.locale` 变量的值来指定当前调试环境使用的语言。

js文件中可使用如下方法来注入国际化文案：

```js
let i18n = require('i18n');
...
i18n("key"[, argv1[, argv2...]])
```

首先会找到对应的语言资源文件，然后通过 key 对应到文案模板。

如果文案中有 `{0}{1}` 变量，将使用 argvX 参数进行替换，更详细的使用说明请参考[这里](https://www.npmjs.com/package/i18n-helper)。

- 国际化资源文件索引命名规范：
  - 全局公用资源：global.xxx
  - 模块所属资源：moduleName.xxx
  - 页面所属资源：pageName.xxx

## 项目中使用图标（或图片）

### 使用图标（svg）

我们推荐使用 svg 作为图标解决方案。

require svg 文件路径将直接返回包含这个 svg 的 react component。

```js
let Star = require('./star.svg');
...
render() {
    return (
        <Star className="star"/>
    );
}
```

### 使用图片（png、jpg、jpeg、gif）

在 js 中 require（或在 css 中 url）一个相对路径的图片资源，将返回这个图片内容的 data-uri。

```js
let img = require('./img.png');
...
render() {
    return (
        <img src={img} alt=""/>
    );
}
```

```css
.abc {
    background-image: url(./img.png);
}
```

## 数据层和模拟数据解决方案

- 请参考 [NattyDB 官方文档](http://jias.github.io/natty-db/)。

## 其他

- 建议使用 [es6](http://es6.ruanyifeng.com/) 进行编码。



## 启动

```shell
  yarn
  yarn dev

  yarn build # 打包
```

## 目录结构

```bash
my-project/
│
├── public/                    # 公共资源文件，未经过打包处理，直接输
│
├── src/                       # 源代码目录，存放所有业务代码
│   ├── apis/                  # API 
│   ├── assets/                # 需要通过 import 引入的静态资源（图片、样式等）
│   ├── components/            # 可复用的通用组件
│   ├── config/                # 项目的全局配置文件
│   ├── enums/                 # 存放项目中的枚举类型
│   ├── hooks/                 # 自定义的 React Hooks
│   ├── layouts/               # 页面布局相关的组件
│   ├── pages/                 # 页面级别的组件，每个页面单独一个文件夹
│   ├── router/                # 路由配置
│   ├── services/              # 请求封装
│   ├── store/                 # 全局状态管理
│   ├── styles/                # 全局样式文件
│   ├── types/                 # TypeScript 类型定义
│   ├── utils/                 # 通用工具函数
│   ├── App.tsx                # 顶层应用组件
│   └── main.tsx               # 应用程序入口文件
│
├── .env.development           # 开发环境下的环境变量配置文件
├── .env.production            # 生产环境下的环境变量配置文件
├── .gitignore                 # Git 忽略文件配置
├── .prettierrc                # Prettier 代码格式化配置
├── eslint.config.js           # ESLint 配置文件
├── index.html                 # 入口 HTML 文件
├── package.json               # 项目的依赖和脚本配置文件
├── README.md                  # 项目说明文件
├── tsconfig.app.json          # 应用的 TypeScript 配置文件
├── tsconfig.json              # TypeScript 全局配置文件
├── tsconfig.node.json         # Node.js 环境的 TypeScript 配置
├── vite.config.ts             # Vite 项目的配置文件
└── yarn.lock                  # Yarn 依赖锁定文件

```
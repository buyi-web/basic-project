/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 环境变量
  readonly VITE_APP_BASE_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

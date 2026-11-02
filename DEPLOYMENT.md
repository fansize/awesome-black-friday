# Cloudflare Worker 部署

站点：https://blackfriday.langtangs.com

备用地址：https://blackfriday-deals.langtang.workers.dev

Worker：`blackfriday-deals`，账户在 `cloudflare.config.ts` 中固定。

## 环境

- Python 3。
- 使用系统 PATH 中的 Node.js；cf 支持的范围记录在 `package.json` 的 `engines` 中。本机已验证 Node 26.13.0。
- pnpm。安装依赖：`pnpm install --frozen-lockfile`。
- Cloudflare 登录：`pnpm exec cf auth login`（尚未登录时）。

本项目使用 cf + Cloudflare Vite 插件 2.0 beta，不依赖 Wrangler。
`cf` 全局版本与项目版本分别安装；项目脚本使用锁定的项目版本。

## 日常操作

```sh
pnpm dev            # 生成网页并启动本地预览；按 Ctrl+C 结束
pnpm build          # 生成网页并构建部署产物
pnpm check:deploy   # 生成、构建和检查，不上传
pnpm deploy         # 生成、构建、上传并发布
```

README 内容变动后重新运行生成或重启预览；Python 数据源没有自动热更新。

`site/template.html` 是页面模板；`scripts/build_site.py` 从 README 生成 `_site/`。
Vite 将 `_site/` 作为 publicDir 原样复制，再生成 `.cloudflare/output/v0/`。
不要手工维护 `_site/` 或 `.cloudflare/`。

`pnpm deploy` 显式串联 Python 与 cf。直接运行 `cf deploy` 不会生成最新的 README 内容。

网页的投稿、订阅和源码链接保留原项目设置；分享图片指向本站。
现有 `.github/workflows/pages.yml` 仍然只控制 GitHub Pages，不会更新这个 Worker。
本地目录当前不是 Git checkout；未配置自动发布。

## 验收

检查首页、产品卡片、分类、搜索、Logo、Umami 追踪，以及手机宽度布局。
检查 `/assets/brand/social-preview.png` 可访问，不存在的路径返回 404。

## 域名与追踪

`cloudflare.config.ts` 的 `worker.domains` 管理自定义域名；部署时由 cf 应用域名绑定。
页面模板包含 Umami defer 脚本，website ID 为 `27710ffa-d76c-4594-a78f-37b7ed2fceb6`。
网站不渲染赞助商，也不将 README 的赞助商信息打包到页面数据中。
所有构建命令直接使用系统 Node，无需额外 PATH 设置。

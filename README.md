# Northstar ERP / Next.js Full-Stack Supply Chain Workbench

这个仓库现在已经重构成单个 Next.js 全栈项目：

- Next.js App Router
- 页面与 API 共用同一套供应链领域模型
- 供应链领域模型
- Cloudflare 部署 via OpenNext
- 当前优先域：供应链系统
- 设计规范：根目录 `DESIGN.md`（当前切换为 Apple / mac 风格）

## 当前结构

```text
.
├── app
│   ├── api
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
├── lib
│   └── supply-chain
├── public
├── DESIGN.md
├── next.config.ts
└── wrangler.toml
```

## 已完成内容

### 1) 单项目全栈化
原本的 React 前端 + NestJS API 已收敛成一个 Next.js 工程：

- UI 页面在 `app/page.tsx`
- API 路由在 `app/api/**/route.ts`
- 领域数据与聚合逻辑在 `lib/supply-chain/*`

### 2) 供应链接口
可用接口：

- `GET /api/health`
- `GET /api/supply-chain/overview`
- `GET /api/supply-chain/suppliers`
- `GET /api/supply-chain/warehouses`
- `GET /api/supply-chain/inventory`
- `GET /api/supply-chain/purchase-orders`
- `GET /api/supply-chain/receipts`

### 3) 首页
首页就是供应链控制塔，包含：

- KPI 指标卡
- 采购流程看板
- 异常中心
- 供应商矩阵
- 库存风险清单
- 采购订单列表
- 仓储网络
- 到货与质检
- 库存台账快照
- ERP 后续模块路线图

## 本地开发

安装依赖：

```bash
npm install
```

启动开发：

```bash
npm run dev
```

打开：

```text
http://localhost:3100
```

说明：这台机器的 `3000` 和 `3001` 端口已经被其他本地服务占用，所以本项目开发端口改成了 `3100`。

## 生产构建

```bash
npm run build
npm run start
```

## Cloudflare 部署

这个项目已经改造成“单项目部署”模式，目标是通过 OpenNext for Cloudflare 部署。
同时已经配置了 Cloudflare D1 数据库绑定：`DB`。

本地构建 Cloudflare 产物：

```bash
npm run cf:build
```

本地预览 Cloudflare Worker：

```bash
npm run cf:preview
```

部署到 Cloudflare：

```bash
npm run cf:deploy
```

说明：
- `wrangler.toml` 已补齐
- 需要本机先完成 `wrangler login`
- 项目会作为单个 Cloudflare Worker / Next.js 应用部署

## 当前数据层说明

当前已经接入 Cloudflare D1 持久化，供应链数据会优先从 D1 读取。
在本地如果没有 D1 绑定，则会自动退回到内存种子数据，方便继续开发。

后续还可以继续扩展成：

- D1 + 更完整事务建模
- KV / Redis 作为缓存层
- R2 作为附件/单据归档层
- Queue / Event Bus 作为异步流程层

## 下一步建议

下一阶段最值得继续做的是：

1. 采购申请 -> 审批 -> PO -> 收货闭环
2. 供应商主数据维护
3. 库存台账与出入库流水
4. 安全库存与补货建议
5. 质检闭环
6. 权限体系与组织架构

## 文档

- `DESIGN.md`
- `docs/plans/2026-04-13-erp-supply-chain-refactor-plan.md`
- `docs/deployment/cloudflare-pages-and-api.md`（旧的双服务部署说明，现可作为迁移参考）

# Lingo Sprint / Next.js 语言学习网站原型

这个仓库已经重构成一个移动端优先的语言学习网站原型，产品方向参考多邻国一类的轻量闯关式学习体验。

当前重点：
- 英语学习主线
- 日语学习主线
- 手机端优先布局
- 连续学习、任务流、微课节奏、奖励反馈
- 明亮轻快的学习型视觉风格

## 当前产品定位

首页现在不是 ERP / 电商工作台，而是语言学习产品首页，重点展示：
- Hero 区：说明产品目标与学习体验
- 英语 / 日语双课程路径
- 今日任务流
- 关卡设计与移动端交互原则
- 课程切入点与后续迭代路线图

另外已经补上两个继续深入的页面：
- `/learn/english` 与 `/learn/japanese`：课程路径页
- `/lesson/[track]/[lesson]`：微课任务页原型

## 技术栈

- Next.js App Router
- React 19
- TypeScript
- 纯 CSS（`app/globals.css`）

## 当前结构

```text
.
├── app
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── layout
│   └── supply-chain
├── public
├── DESIGN.md
├── next.config.ts
└── wrangler.toml
```

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

## 下一步建议

建议继续按下面顺序推进：

1. 把 lesson 页继续做成真实可操作练习流
2. 接入词汇卡片、答题、跟读、错题回放等真实交互
3. 增加学习档案、连续打卡和经验值系统
4. 接入 AI 教练能力，支持口语纠错和写作反馈
5. 用 D1 保存学习记录、用户体系和复习队列
6. 增加登录体系与个性化课程推荐

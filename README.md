# 高等代数英文讲堂

以定义、定理与证明为核心的英文板书讲稿，使用 LaTeX 排版数学公式。

## 在线阅读

[打开讲稿网站](https://creamcubes.github.io/algebra-blackboard-notes/)

覆盖北大《高等代数》第五版第二章《行列式》§1—§8及第三章《线性方程组》§1—§7，包含星号节。以正文定义、定理、性质、推论及证明为主，不含章后习题。具体范围见 [正文覆盖记录](content/COVERAGE.md)。

支持逐节阅读、纯板书模式、中文提示，以及英文公式读法。按教材章节连续组织，不划分讲次或安排分钟，使用者自主控制范围与时间。

## 本地运行

需要 Node.js 24 和 npm。

```sh
npm ci
npm run dev
```

## 维护讲稿

先阅读 [长期要求](LECTURE_REQUIREMENTS.md)，再编辑最新 `content/lecture-source.json`。每一节包含标题、`chapter`章号、`source`教材节与页码及正文块；正文块可以是 `text`、`statement`（加粗完整陈述）、`heading`、`cue` 或 `math`。数学块使用 `latex` 字段保存 LaTeX 源码。

```json
{ "type": "math", "text": "", "latex": "\\det(A^{\\mathsf T})=\\det A" }
```

`npm run build` 会先校验并渲染全部公式，再生成静态网站。无须外部公式服务。`app/lecture.json` 是生成文件，不应手动编辑。不要运行历史生成脚本覆盖当前 JSON。

## 发布

GitHub Pages 使用 GitHub Actions。向 `main` 推送更新后，工作流自动构建并发布 `dist/client`。

如更改仓库名，需要同步更新工作流里的 `PAGES_BASE_PATH` 和上面的访问链接。个人主页仓库（`用户名.github.io`）应将该路径设为空。

## 内容来源

讲稿参考北大《高等代数》第五版第二章第33—64页和第三章第70—103页，使用英文说明和数学推导。仓库不包含教材 PDF 或扫描页。

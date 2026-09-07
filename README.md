# 高等代数英文讲堂

以定义、定理与证明为核心的英文板书讲稿，使用 LaTeX 排版数学公式。

## 在线阅读

[打开讲稿网站](https://creamcubes.github.io/algebra-blackboard-notes/)

第一讲涵盖北大《高等代数》第五版第二章的排列与 n 阶行列式，至 §3 结束：逆序与奇偶排列、对换定理、行列式定义、三角行列式、一般项符号与转置不变性。

支持逐节阅读、纯板书模式、中文提示，以及英文公式读法。每讲按约50分钟口述与板书安排，实际时长需试讲校准。

## 本地运行

需要 Node.js 24 和 npm。

```sh
npm ci
npm run dev
```

## 维护讲稿

编辑 `content/lecture-source.json`。每一节包含标题、时间及正文块；正文块可以是 `text`、`heading`、`cue` 或 `math`。数学块使用 `latex` 字段保存 LaTeX 源码。

```json
{ "type": "math", "text": "", "latex": "\\det(A^{\\mathsf T})=\\det A" }
```

`npm run build` 会先校验并渲染全部公式，再生成静态网站。无须外部公式服务。`app/lecture.json` 是生成文件，不应手动编辑。`content/revise-lecture.mjs` 保存了当前版本的讲稿生成过程；一般更新直接编辑 JSON 即可。

## 发布

GitHub Pages 使用 GitHub Actions。向 `main` 推送更新后，工作流自动构建并发布 `dist/client`。

如更改仓库名，需要同步更新工作流里的 `PAGES_BASE_PATH` 和上面的访问链接。个人主页仓库（`用户名.github.io`）应将该路径设为空。

## 内容来源

讲稿参考北大《高等代数》第五版第二章第33—40页，使用重新组织的英文说明和数学推导。仓库不包含教材 PDF、扫描页或其他个人文件。

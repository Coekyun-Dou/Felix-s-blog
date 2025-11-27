# 📚 内容修改指南

本指南将帮助你修改博客内容、更新阅读页面照片和信息。

## 1. 📝 添加/修改博客文章

### 位置
博客文章存放在：`src/content/blog/`

### 如何添加新博客

1. 在 `src/content/blog/` 目录下创建新的 `.mdx` 文件
2. 文件名使用英文和短横线，例如：`my-new-post.mdx`

### 博客文件格式

```markdown
---
title: '你的博客标题'
description: '博客简短描述，会显示在列表页'
date: '2025-03-25'
---

# 这是一级标题

这里是正文内容，支持 Markdown 语法。

## 二级标题

- 列表项 1
- 列表项 2

### 三级标题

你可以插入代码：

\`\`\`javascript
console.log('Hello World');
\`\`\`

也可以插入图片、链接等等。
```

### 示例

查看现有文章作为参考：
- `src/content/blog/appreciate.mdx`
- `src/content/blog/llm-workflow.mdx`

---

## 2. 📖 修改阅读页面

### 位置
阅读页面配置文件：`src/config/books.ts`

### 如何修改书籍信息

打开 `src/config/books.ts`，找到对应的书籍对象：

```typescript
{
  id: 1,                    // 书籍唯一ID（不要重复）
  title: '书籍标题 1',       // ⬅️ 修改这里：书名
  author: '作者名称',        // ⬅️ 修改这里：作者
  cover: coverImage,        // 封面图片URL
  rating: 5,               // ⬅️ 修改这里：评分（1-5）
  readDate: '2024-01',     // ⬅️ 修改这里：阅读日期
  review: '这是一本很棒的书...', // ⬅️ 修改这里：书评
  tags: ['小说', '科幻']    // ⬅️ 修改这里：标签
}
```

### 如何添加新书

在 `books` 数组中添加新对象：

```typescript
export const books: Array<BookType> = [
  // ... 现有的书籍
  {
    id: 16,  // 新的ID
    title: '新书名',
    author: '新作者',
    cover: coverImage,
    rating: 5,
    readDate: '2025-04',
    review: '我的读后感...',
    tags: ['标签1', '标签2']
  }
]
```

### 如何删除书籍

直接删除对应的对象即可。

---

## 3. 🖼️ 更换书籍封面

### 方法1：统一更换所有封面

打开 `src/config/books.ts`，修改第一行的 `coverImage` 变量：

```typescript
// 当前的封面
const coverImage = 'https://github.com/Coekyun-Dou/Felix-s-blog/blob/main/image/%E6%88%91%E4%BB%AC%E4%BB%A8.jpg?raw=true'

// 改成你的新图片URL
const coverImage = 'https://你的图片链接.com/image.jpg'
```

### 方法2：为每本书设置不同封面

1. 上传图片到 GitHub 仓库或图床
2. 获取图片的直链（GitHub 图片记得加 `?raw=true`）
3. 修改对应书籍的 `cover` 字段：

```typescript
{
  id: 1,
  title: '书名',
  cover: 'https://你的图片链接.com/book1.jpg', // ⬅️ 单独设置
  // ...
}
```

### GitHub 图片直链获取方法

1. 上传图片到 GitHub 仓库
2. 点击图片，获取 URL
3. 在 URL 后面添加 `?raw=true`
4. 例如：`https://github.com/用户名/仓库/blob/main/图片.jpg?raw=true`

---

## 4. 🎨 修改阅读页标题和描述

打开 `src/config/books.ts`，找到最底部的配置：

```typescript
export const readingPageConfig = {
  headline: '我的阅读',           // ⬅️ 修改这里：页面标题
  description: '记录阅读过的好书，分享读书心得与感悟。' // ⬅️ 修改这里：页面描述
}
```

---

## 5. 📸 添加本地图片（推荐方法）

### 方法1：使用 public 文件夹

1. 将图片放到 `public/images/books/` 目录（需要先创建这个文件夹）
2. 在 `books.ts` 中使用相对路径：

```typescript
{
  id: 1,
  cover: '/images/books/book1.jpg',  // 注意开头的 /
  // ...
}
```

### 方法2：使用图床（推荐）

使用免费图床服务（如 imgur.com、sm.ms）上传图片，获取直链使用。

---

## 6. 🔄 修改后如何查看效果

1. 保存文件后，开发服务器会自动刷新
2. 在浏览器中访问对应页面：
   - 博客列表：`http://localhost:3000/blogs`
   - 阅读页面：`http://localhost:3000/reading`
3. 如果没有自动刷新，手动刷新浏览器（F5）

---

## 7. ⚠️ 注意事项

### 图片配置
如果使用新的远程图片域名，需要在 `next.config.mjs` 中添加配置：

```javascript
{
  protocol: 'https',
  hostname: '新图片域名.com'
}
```

修改配置后需要**重启开发服务器**。

### 文件命名规范
- 博客文件：使用英文和短横线，如 `my-blog-post.mdx`
- 图片文件：避免使用中文和特殊字符，如 `book-cover-1.jpg`

### Markdown 语法
博客支持完整的 Markdown 语法，包括：
- 标题、列表、引用
- 代码块（支持语法高亮）
- 图片、链接
- 表格
- 等等...

---

## 📞 需要帮助？

如果在修改过程中遇到问题：
1. 检查文件路径是否正确
2. 检查语法是否有错误（特别是逗号、引号）
3. 查看浏览器控制台是否有错误信息
4. 重启开发服务器试试

祝你使用愉快！🎉


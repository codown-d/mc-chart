import { fileURLToPath } from 'url';
import express from 'express';
import path from 'path'; // 导入 path 模块

// 处理 __dirname 的问题（在 ES 模块中没有 __dirname）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = 3099;

// 指定静态资源目录
const staticDir = path.join(__dirname, '/dist');
app.use(express.static(staticDir));
app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://43.143.215.181:9999',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  })
);
// app.use(
//   '/api',
//   createProxyMiddleware({
//     target: 'http://43.143.215.181:9999',
//     changeOrigin: true,
//     pathRewrite: { '^/api': '' },
//   })
// );
app.get('*', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});


// 添加一个简单的路由
app.get('/', (req, res) => {
  res.send('Hello, this is an Express server!');
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

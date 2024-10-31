const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');  // 引入 mongoose
const Blog = require('./models/Blog'); // 引入博客模型
const app = express();

// 允许跨域请求
app.use(cors());

// 添加解析 JSON 的中间件
app.use(express.json());

// 连接到本地的 MongoDB 数据库
mongoose.connect('mongodb://localhost:27017/myBlog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 监听 MongoDB 数据库连接状态
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB 连接错误:'));
db.once('open', () => {
  console.log('成功连接到 MongoDB');
});

// 定义API接口，返回动态的标题
app.get('/api/title', (req, res) => {
  const title = '强风吹拂，聚散流云'; // 动态生成或修改标题
  res.json({ title });
});

// 返回背景图片的URL
app.get('/api/background', (req, res) => {
  const backgroundImageUrl = 'https://raw.githubusercontent.com/sundusk/blogBackImage/main/one.png'; // GitHub图片URL
  res.json({ backgroundImage: backgroundImageUrl });
});

// 创建新的博客文章
app.post('/api/blog', async (req, res) => {
  const { title, content } = req.body;
  try {
    const newBlog = new Blog({ title, content });
    await newBlog.save();
    res.json({ message: '博客文章创建成功' });
  } catch (error) {
    res.status(500).json({ error: '创建博客文章时出错' });
  }
});

// 获取所有博客文章
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: '获取博客列表时出错' });
  }
});

// 设置服务器监听端口
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
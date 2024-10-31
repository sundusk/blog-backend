const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

// 创建模型
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
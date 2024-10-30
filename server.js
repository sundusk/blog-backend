const express = require('express');
const cors = require('cors');
const app = express();

// 允许跨域请求
app.use(cors());

// 定义API接口，返回动态的标题
app.get('/api/title', (req, res) => {
  const title = '强风吹拂，聚散流云'; // 你可以在这里动态生成或修改标题
  res.json({
    title  // 只返回title
  });
});

app.get('/api/background', (req, res) => {
    const backgroundImageUrl = 'https://raw.githubusercontent.com/sundusk/blogBackImage/main/one.png'; // GitHub图片URL
    res.json({
      backgroundImage: backgroundImageUrl  // 返回背景图片的URL
    });
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models/job'); // Sequelize 데이터베이스 동기화
const jobRoutes = require('./routes/jobRoutes');
const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');
const companyRoutes = require('./routes/companyRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
const PORT = 443;

// 미들웨어 설정
app.use(bodyParser.json());
app.use(express.json());

// 데이터베이스 연결
sequelize
  .authenticate()
  .then(() => {
    console.log('데이터베이스 연결 성공...');
    return sequelize.sync(); // 모델과 데이터베이스 동기화
  })
  .then(() => {
    console.log('데이터베이스 동기화 완료...');
  })
  .catch((err) => {
    console.error('데이터베이스 연결 실패:', err.message);
  });

// 라우터 연결
app.use('/api/auth', authRoutes);         // 회원 관리 API
app.use('/api/jobs', jobRoutes);         // 채용 공고 API
app.use('/api/applications', applicationRoutes); // 지원 API
app.use('/api/bookmarks', bookmarkRoutes);       // 북마크 API
app.use('/api/companies', companyRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버 실행 중: https://10.0.0.131:${PORT}`);
});


// POST 요청: 크롤링 수행
// app.post('/api/crawl', async (req, res) => {
//   const { keyword, pages } = req.body;
//   try {
//     await crawlSaramin(keyword, pages || 1);
//     res.status(200).send('Crawling completed successfully.');
//   } catch (err) {
//     console.error('Error during crawling:', err.message);
//     res.status(500).send(`Error during crawling: ${err.message}`);
//   }
// });

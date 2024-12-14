const fs = require('fs');
const mysql = require('mysql2');
const csvParser = require('csv-parser');

// MySQL 데이터베이스 연결 설정
const db = mysql.createConnection({
  host: '113.198.66.75', // 원격 데이터베이스 IP
  user: 'yys3504', // 데이터베이스 사용자 이름
  password: '1234', // 데이터베이스 비밀번호
  database: 'saramin', // 데이터베이스 이름
  port: 13131, // MySQL 포트
});

// 데이터베이스 연결 확인
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1); // 연결 실패 시 종료
  }
  console.log('Connected to the database.');
});

// CSV 파일 경로
const filePath = './random_50_jobs.csv';

// CSV 파일 읽고 데이터 삽입
fs.createReadStream(filePath)
  .pipe(csvParser())
  .on('data', (row) => {
    const sql = `
      INSERT INTO jobs 
      (job_group, badge, company_name, title, deadline, address_main, address_total, experience, education, employment_type, salary, tech_stack, createdAt, crawledAt, url, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [
      row.job_group,
      row.badge,
      row.company_name,
      row.title,
      row.deadline,
      row.address_main,
      row.address_total,
      row.experience,
      row.education,
      row.employment_type,
      row.salary,
      row.tech_stack,
      row.createdAt,
      row.crawledAt,
      row.url,
      row.description,
    ], (err) => {
      if (err) {
        console.error('Error inserting data:', err.message);
      }
    });
  })
  .on('end', () => {
    console.log('CSV file processed successfully.');
    db.end(); // 데이터베이스 연결 종료
  })
  .on('error', (err) => {
    console.error('Error reading CSV file:', err.message);
  });

const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key'; // 하드코딩된 키

/**
 * JWT 토큰 생성 함수
 * @param {string} userId - 사용자 ID
 * @returns {string} - 생성된 JWT 토큰
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
};

/**
 * JWT 토큰 검증 함수
 * @param {string} token - JWT 토큰
 * @returns {object} - 검증된 payload
 */
const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = { generateToken, verifyToken };

## 참고사항
- 크롤링 과정에서 block을 당한 것으로 추정되어 크롤링 데이터가 아닌 데이터 샘플을 이용하여 구현하였습니다.

## 주소
- 배포 주소: http://113.198.66.75:17131 (https 포트 - 443)
- DB 주소: http://113.198.66.75:13131 (범용 포트 - 3000)
- Swagger 배포 : http://113.198.66.75:17131/api-docs/

# 과정
- npm install
- node index.js

# 엔드 포인트 별 주요 기능
- 회원가입 (POST, api/auth/register)
- Required Responce Body: "username":string, "email":string, "password": string

- 로그인 (POST, api/auth/login)
- Required Responce Body: "email":string, "password":string
- 나오는 토큰을 swagger의 경우 Authorize에 기입
- Postman의 경우 Headers에 Authorization : Bearer <토큰> 기입

- 회원정보 조회 (GET, api/auth/profile)

- 회원 탈퇴 (DELETE, api/auth/profile)
-------------------------------------------------------------
- 채용 공고 목록 조회 (GET, api/jobs)

- 채용 공고 등록 (POST, api/jobs)
- Required Responce Body: "title":string, "company_name":string, "employment_type":string, "tech_stack":string, "salary":string

- 채용 공고 수정 (PUT, api/jobs/{id})
- Required Responce Body: "title":string, "salary":string

- 채용 공고 삭제 (DELETE, api/jobs/{id})
-------------------------------------------------------------
- 지원하기 (POST, api/applications)
- Required Responce Body: "job_id":Integer

- 지원 내역 조회 (GET, api/applications)

- 지원 취소 (DELETE, api/applications/{id})
-------------------------------------------------------------
- 북마크 추가/제거 (POST, api/bookmarks)
- Required Responce Body: "user_id":INTEGER, "job_id":INTEGER

- 북마크 목록 조회 (GET, api/bookmarks)
-------------------------------------------------------------
- 피드백 등록 (POST, api/feedbacks)
- Required Responce Body: "company_id:INTEGER, "comment":STRING, "rating":INTEGER

- 회사별 피드백 조회 (GET, api/feedbacks/{company_id})

- 피드백 삭제 (DELETE, api/feedbacks/{id})
-------------------------------------------------------------
- 모든 회사 조회 (GET, api/companies)

- 회사 등록 (POST, api/companies)
- Required Responce Body: "name":STRING, "location":STRING, "industry":STRING, "size":STRING, "description":STRING

- 특정 회사 조회 (GET, api/companies/{id})

- 회사 정보 수정 (PUT, api/companies/{id})
- Required Responce Body: "name":STRING, "location":STRING, "industry":STRING, "size":STRING, "description":STRING

- 회사 삭제 (DELETE, api/companies/{id})
-------------------------------------------------------------

## 프로젝트 주요 구조 설명
**root/index.js**
- 서버의 진입점. 앱 실행 및 포트 설정

**root/app.js**
- csv데이터를 원격 DB에 옮기기 위한 JS파일일

**root/controllers**
- API 요청을 담당하는 비즈니스 로직 폴더

**root/models**
- MYSQL 스키마 정의 폴더

**root/routes**
- 엔드포인트 정의 폴더

**root/view**
- response 정의 폴더

**root/utils/jwtUtils.js**
- jwt 토큰 발급 로직 구현 파일

**root/middleware/authMiddleware.js**
- 미들웨어 파일

**root/services/crawl.js**
- 크롤링 로직 파일(실제 수행 x)

FROM node:10

## 앱 디렉터리 생성
WORKDIR /usr/src/app

COPY ./backend/package*.json ./

RUN npm install

# 프로젝트 복사
COPY . .

# backend 부분으로 이동
WORKDIR ./backend

EXPOSE 3000
CMD ["npm", "start"]
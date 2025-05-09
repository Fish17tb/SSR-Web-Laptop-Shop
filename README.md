# Web Laptop Shop

## Giới thiệu

Dự án **Web Laptop Shop** là một ứng dụng web sử dụng Express kết hợp với TypeScript, Prisma ORM và MySQL nhằm xây dựng hệ thống quản lý cửa hàng bán laptop.

## Cấu trúc dự án
```
web-laptop-shop/
      ├── src/                    # Mã nguồn chính (server, routes, controllers, etc.)
      ├── dist/                   # Mã đã biên dịch từ TypeScript
      ├── node_modules/           # Thư viện phụ thuộc
      ├── .env                    # Biến môi trường
      ├── tsconfig.json           # Cấu hình TypeScript
      ├── package.json            # Thông tin và script dự án
      ├── prisma/                 # Schema và migration cho Prisma
      └── README.md               # Hướng dẫn sử dụng
```
## Cài đặt

Yêu cầu cài đặt [Node.js](https://nodejs.org/) phiên bản 20.x và MySQL.

1. **Clone repo:**

   ```sh
   git clone https://github.com/your-username/web-laptop-shop.git
   cd web-laptop-shop
Cài đặt dependencies:

npm install
Cấu hình biến môi trường:

Tạo file .env và thêm chuỗi kết nối cơ sở dữ liệu:

env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"

Khởi tạo Prisma Client và migration:
npx prisma generate
npx prisma migrate dev
Scripts

Chạy môi trường phát triển:
npm run dev

Chạy ở chế độ debug:
npm run start:debug

Kiểm tra placeholder test:
npm test
Công nghệ sử dụng
Node.js 20+

Express 5.0.1

TypeScript 5.7.3

Prisma ORM 6.3.0

MySQL (thông qua mysql2)

EJS 3.1.10

dotenv 16.4.7

ts-node, tsconfig-paths, nodemon cho phát triển

Tác giả
Nguyên Vũ - GitHub

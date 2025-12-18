# Movie Management System

## Quick Start với Docker

### Yêu cầu
- Docker
- Docker Compose

### Cách chạy

1. Clone repository:
```bash
git clone <repository-url>
cd movie-management-system
```

2. Cấu hình môi trường:
```bash
# Copy file .env.example thành .env và chỉnh sửa các thông tin nhạy cảm
cp .env.example .env
# Chỉnh sửa file .env với các giá trị phù hợp
```

3. Chạy ứng dụng:
```bash
docker-compose up -d
```

4. Truy cập ứng dụng:
- Mở trình duyệt và vào: **http://localhost:3000**

### Tài khoản Admin

Thông tin đăng nhập admin được cấu hình trong file `.env`:
- **Username**: Giá trị của `ADMIN_USERNAME` (mặc định: `admin`)
- **Password**: Giá trị của `ADMIN_PASSWORD` (mặc định: `123456`)

### Cấu hình môi trường (.env)

File `.env` chứa các thông tin nhạy cảm:
- Database credentials
- Django secret key
- Admin user credentials
- MySQL root password

**Lưu ý**: File `.env` đã được thêm vào `.gitignore` và sẽ không được commit lên repository. Hãy sử dụng `.env.example` làm template.

### Các lệnh hữu ích

```bash
# Xem logs
docker-compose logs -f

# Dừng ứng dụng
docker-compose down

# Khởi động lại
docker-compose restart

# Xem trạng thái
docker-compose ps
```

### Cấu trúc

- **Frontend**: Nginx serving static files trên port 3000
- **Backend**: Django API trên port 8000 (internal)
- **Database**: MySQL trên port 3306 (internal)

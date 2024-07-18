**Hướng dẫn chạy code:**
B1: Cài đặt thư viện:
- Vào thư mục chính của dự án: movie-management-system
- Nhập câu lệnh pip install -r requirements.txt
  
B2: Cài đặt MySQL
- Vào trang chủ MySQL https://www.mysql.com/ tải bản phù hợp với máy tính về rồi cài đặt
  
B3: Import data vào MySQL
- Trong MySQL chọn Server -> Data Import -> Chọn Import Self-Contained File, xong rồi chọn file data.sql
- Sau đó tạo new schema tên data -> Start Import
  
B4: Cài đặt cấu hình
- Vào Film_BE -> Film_BE -> settings.py, cuộn xuống dưới tìm mục DATABASES, cấu hình phù hợp với name là 'data'
  
B5: Cập nhật link ảnh
- Nhập py ./Crawl/autoUpdate/update.py
  
B5: Train model gợi ý
- Nhập py ./Film_BE/App_Film_BE/Recommendation/Collaborative/auto_train.py
- Vào ./Film_BE/App_Film_BE/Recommendation/Content-Based, chạy file content_based.ipynb
  
B6: Bắt đầu chạy chương trình
- Chạy BE: Vào Film_BE nhập câu lệnh "py manage.py migrate", xong rồi nhập câu lệnh "py manage.py runserver"
- Chạy FE: Cài đặt LiveServer, nhấn vào Film_FE -> templates -> home.html rồi chạy
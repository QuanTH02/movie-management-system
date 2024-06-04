import csv

def remove_rows_with_zero(filepath):
    # Mở file CSV để đọc
    with open(filepath, 'r') as csvfile:
        reader = csv.reader(csvfile)
        
        # Đọc dữ liệu từ file CSV và lọc ra các dòng không chứa ",0"
        rows = [row for row in reader if ",0" not in ','.join(row)]
    
    # Ghi lại dữ liệu đã lọc vào file CSV
    with open(filepath, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(rows)

# Đường dẫn đến file CSV của bạn
file_path = 'output1.csv'

# Gọi hàm để xóa các dòng chứa ",0" từ file CSV và ghi lại file
remove_rows_with_zero(file_path)

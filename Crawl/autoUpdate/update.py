import mysql.connector

def execute_sql_file(filename, connection):
    with open(filename, 'r', encoding='utf-8') as file:
        sql_script = file.read()

    cursor = connection.cursor()
    for result in cursor.execute(sql_script, multi=True):
        pass
    connection.commit()

conn = mysql.connector.connect(host = "localhost", password = "123456", user = "root")
mycursor = conn.cursor()

execute_sql_file('./update.sql', conn)

conn.close()
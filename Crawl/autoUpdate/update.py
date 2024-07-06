import mysql.connector

def execute_sql_file(filename, connection, chunk_size=1000):
    with open(filename, 'r', encoding='utf-8') as file:
        sql_commands = []
        for line in file:
            sql_commands.append(line.strip())
            if len(sql_commands) >= chunk_size:
                execute_sql_commands(sql_commands, connection)
                sql_commands = []
        
        if sql_commands:
            execute_sql_commands(sql_commands, connection)

def execute_sql_commands(sql_commands, connection):
    cursor = connection.cursor()
    for sql_command in sql_commands:
        if sql_command.strip():
            cursor.execute(sql_command)
    connection.commit()
    cursor.close()

conn = mysql.connector.connect(host="localhost", password="123456", user="root")
try:
    execute_sql_file('./update.sql', conn)
finally:
    conn.close()

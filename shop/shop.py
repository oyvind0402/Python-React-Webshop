from flask import Flask
import mysql.connector
from flask import jsonify

app = Flask(__name__)

def openDatabase():
    return mysql.connector.connect(user='root', host='db', port='3306', password='root', database='Portfolio2Webshop')

@app.route('/')
def index():
    return "Flask inside Docker!"

@app.route('/users')
def showusers():
    db = openDatabase()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM user')
    result = [{"id": id, "username": username, "password": password} for (id, username, password) in cursor]
    cursor.close()
    db.close()
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')

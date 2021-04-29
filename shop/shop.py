from flask import Flask, jsonify, send_from_directory
import mysql.connector

app = Flask(__name__, static_folder="/shop/static", static_url_path="")

def openDatabase():
    return mysql.connector.connect(user='root', host='db', port='3306', password='root', database='Portfolio2Webshop')

@app.route('/', defaults={"path": "index.html"})
@app.route('/<path>')
def index(path):
    return send_from_directory("/shop/static", path)

@app.route('/api/users', methods=["GET"])
def getUsers():
    db = openDatabase()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM user')
    result = [{"id": id, "username": username, "password": password} for (id, username, password) in cursor]
    cursor.close()
    db.close()
    return jsonify(result), 200

@app.route('/api/products', methods=["GET"])
def getProducts():
    db = openDatabase()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM product')
    result = [{"id": id, "name": name, "price": price, "brand": brand, "category": category} for (id, name, price, brand, category) in cursor]
    cursor.close()
    db.close()
    return jsonify(result), 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)

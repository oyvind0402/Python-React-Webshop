from flask import Flask, jsonify, send_from_directory, request
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

@app.route('/api/product/<int:productid>', methods=["GET"])
def getProduct(productid):
    db = openDatabase()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM product WHERE id=%s', [productid])
    result = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(result), 200

@app.route('/api/product/add', methods=["POST"])
def addProduct():
    name = request.form['name']
    price = request.form['price']
    description = request.form['description']
    brand = request.form['brand']
    category = request.form['category']
    cursor.execute('INSERT INTO product (name, description, price, brand, category) VALUES (%s, %s, %s, %s, %s)', (name, description, price, brand, category))
    result = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(result), 201

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)

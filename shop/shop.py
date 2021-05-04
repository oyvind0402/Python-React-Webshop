from flask import Flask, jsonify, send_from_directory, request, redirect
import mysql.connector
from werkzeug.utils import secure_filename
import os

app = Flask(__name__, static_folder="/shop/static", static_url_path="")
app.config['SECRET_KEY'] = "AWdad12e+1daw::d1__123123dadaodo"

UPLOAD_FOLDER = 'static/images'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

images = set(['png', 'jpg', 'jpeg'])

def validFile(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in images

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
    result = [{"id": id, "brand": brand, "name": name, "price": price, "color": color, "system": system, "storage": storage, "short_desc": short_desc, "long_desc": long_desc, "image": image} for (id, brand, name, price, color, system, storage, short_desc, long_desc, image) in cursor]
    cursor.close()
    db.close()
    return jsonify(result), 200

@app.route('/api/product/<int:productid>', methods=["GET"])
def getProduct(productid):
    db = openDatabase()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM product WHERE id=%s', [productid])
    result = [{"id": id, "brand": brand, "name": name, "price": price, "color": color, "system": system, "storage": storage, "short_desc": short_desc, "long_desc": long_desc, "image": image} for (id, brand, name, price, color, system, storage, short_desc, long_desc, image) in cursor]
    cursor.close()
    db.close()
    return jsonify(result[0]), 200

@app.route('/api/product/add', methods=["POST"])
def addProduct():
    db = openDatabase()
    cursor = db.cursor()
    form = request.form
    brand = form.get('brand')
    name = form.get('name')
    price = form.get('price')
    color = form.get('color')
    system = form.get('system')
    storage = form.get('storage')
    short_desc = form.get('short_desc')
    long_desc = form.get('long_desc')
    if not request.files.get('image'):
        filename = 'default-product-pic.png'
        cursor.execute("INSERT INTO product (brand, name, price, color, system, storage, short_desc, long_desc, image) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)", (brand, name, price, color, system, storage, short_desc, long_desc, filename))
        db.commit()
        cursor.close()
        db.close()
        return redirect("http://localhost:5000/adminindex.html")
    file = request.files['image']
    if file and validFile(file.filename):     
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        cursor.execute("INSERT INTO product (brand, name, price, color, system, storage, short_desc, long_desc, image) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)", (brand, name, price, color, system, storage, short_desc, long_desc, filename))
        db.commit()
        cursor.close()
        db.close()
        return redirect("http://localhost:5000/adminindex.html")
    return redirect("http://localhost:5000/adminindex.html"), 400

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)

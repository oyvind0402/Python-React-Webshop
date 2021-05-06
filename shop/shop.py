from flask import Flask, jsonify, send_from_directory, request, redirect
import mysql.connector
from werkzeug.utils import secure_filename
import os

app = Flask(__name__, static_folder="/shop/static", static_url_path="")
app.config['SECRET_KEY'] = "AWdad12e+1daw::d1__123123dadaodo"

UPLOAD_FOLDER = 'static/images'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

extensions = set(['png', 'jpg', 'jpeg'])

def validFile(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in extensions

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
    result = [{"id": id, "name": name, "username": username, "password": password, "email": email} for (id, name, username, password, email) in cursor]
    cursor.close()
    db.close()
    return jsonify(result), 200


@app.route('/api/users/<int:userid>', methods=["GET"])
def getUser(userid):
    db = openDatabase()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM user WHERE id=%s', [userid])
    result = [{"id": id, "name": name, "username": username, "password": password, "email": email} for (id, name, username, password, email) in cursor]
    cursor.close()
    db.close()
    return jsonify(result), 200


@app.route('/api/user/add', methods=["POST"])
def addUser():
    db = openDatabase()
    cursor = db.cursor()
    form = request.form
    name = form.get('name')
    username = form.get('username')
    password = form.get('password')
    #Can do hashing of the password here if we want
    email = form.get('email')
    cursor.execute('INSERT INTO user (name, username, password, email) VALUES (%s, %s, %s, %s)', (name, username, password, email))
    db.commit()
    cursor.close()
    db.close()
    return "Successfully registered user: {}".format(username), 201


@app.route('/api/user/<int:userid>/delete', methods=["DELETE"])
def deleteUser(userid):
    db = openDatabase()
    cursor = db.cursor()
    cursor.execute('DELETE FROM user WHERE id=%s', [userid])
    db.commit()
    cursor.close()
    db.close()
    return "User with id: {} deleted.".format(userid), 204


@app.route('/api/products', methods=["GET"])
def getProducts():
    db = openDatabase()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM product')
    result = [{"id": id, "brand": brand, "name": name, "price": price, "color": color, "operatingsystem": operatingsystem, "storage": storage, "short_desc": short_desc, "long_desc": long_desc, "image": image} for (id, brand, name, price, color, operatingsystem, storage, short_desc, long_desc, image) in cursor]
    cursor.close()
    db.close()
    return jsonify(result), 200


@app.route('/api/product/<int:productid>', methods=["GET"])
def getProduct(productid):
    db = openDatabase()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM product WHERE id=%s', [productid])
    result = [{"id": id, "brand": brand, "name": name, "price": price, "color": color, "operatingsystem": operatingsystem, "storage": storage, "short_desc": short_desc, "long_desc": long_desc, "image": image} for (id, brand, name, price, color, operatingsystem, storage, short_desc, long_desc, image) in cursor]
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
    operatingsystem = form.get('operatingsystem')
    storage = form.get('storage')
    short_desc = "This is the new " + name + " from " + brand + "."
    long_desc = "The " + name + " from " + brand + ", which costs " + price + "kr, is in the lovely color of " + color + ". It runs on " + operatingsystem + " and has " + storage + "GB of storage."
    if not request.files.get('image'):
        filename = 'default-product-pic.png'
        cursor.execute("INSERT INTO product (brand, name, price, color, operatingsystem, storage, short_desc, long_desc, image) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)", (brand, name, price, color, operatingsystem, storage, short_desc, long_desc, filename))
        db.commit()
        cursor.close()
        db.close()
        return "Successfully added product named {}, no picture added, default picture will be chosen.".format(name), 201
    file = request.files['image']
    if file and validFile(file.filename):     
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        cursor.execute("INSERT INTO product (brand, name, price, color, operatingsystem, storage, short_desc, long_desc, image) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)", (brand, name, price, color, operatingsystem, storage, short_desc, long_desc, filename))
        db.commit()
        cursor.close()
        db.close()
        return "Successfully added product named {}, product picture included.".format(name), 201
    return "Could not add the product, the image chosen had the wrong extension.", 400


@app.route('/api/product/<int:productid>/delete', methods=["DELETE"])
def deleteProduct(productid):
    db = openDatabase()
    cursor = db.cursor()
    cursor.execute('DELETE FROM product WHERE id=%s', [productid])
    db.commit()
    cursor.close()
    db.close()
    return "Product with id: {} deleted.".format(productid), 204


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)

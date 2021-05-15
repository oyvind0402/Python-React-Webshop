from flask import Flask, jsonify, send_from_directory, request, Blueprint
from flask_cors import CORS
import mysql.connector
import os
import base64
from werkzeug.utils import secure_filename
import bcrypt
import jwt


app = Flask(__name__, static_folder="/shop/static", static_url_path="")


#To eliminate CORS errors when doing post and get requests from localhost
CORS(app)
#For headers on responses
app.config['SECRET_KEY'] = "AWdad12e+1daw::d1__123123dadaodo"


#The upload settings
UPLOAD_FOLDER = "static/images"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
extensions = set(['png', 'jpg', 'jpeg'])

def validFile(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in extensions


#Function for opening the database
def openDatabase():
    return mysql.connector.connect(user='root', host='db', port='3306', password='root', database='Portfolio2Webshop')


#For JWT Authentication
JWT_SECRET_KEY = "Aowidha9owd0192j1pond09h0h9AAD_A_DAwpdoa0w9j1"

def validate_user_input(**kwargs):
    if len(kwargs["email"]) <= 255 and len(kwargs["password"]) <= 255:
        return True
    else:
        return False

def generate_hash(password, password_salt):
    passwordhash = bcrypt.hashpw(password, password_salt)
    return passwordhash

#Validating user input when logging in - creating a JWT token for authentication.
def validate_user(email, password):
    db = openDatabase()
    cursor = db.cursor()
    
    cursor.execute('SELECT * FROM user WHERE email=%s', [email])
    user = [{"id": id, "name": name, "username": username, "password_salt": password_salt, "password_hash": password_hash, "email": email} for (id, name, username, password_salt, password_hash, email) in cursor]

    if user is None:
        return False
    else:
        if len(user) == 1:
            user_password_hash = user[0]["password_hash"]

            if bcrypt.checkpw(password.encode('utf-8'), user_password_hash.encode('utf-8')):
                userid = user[0]["id"]
                jwtencoded = jwt.encode({"id": userid}, JWT_SECRET_KEY, algorithm="HS256")
                jwt_token = str(jwtencoded).split(".")[1]
                db.close()
                cursor.close()
                return jwt_token
            else:
                return False
        else:
            return False

#To give some sort of frontend for the flask API server
@app.route('/', defaults={"path": "index.html"})
@app.route('/<path>')
def index(path):
    return send_from_directory("/shop/static", path)


#Getting all users
@app.route('/api/users', methods=["GET"])
def getUsers():
    db = openDatabase()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM user')
    result = [{"id": id, "name": name, "username": username, "password_salt": password_salt, "password_hash": password_hash, "email": email} for (id, name, username, password_salt, password_hash, email) in cursor]
    cursor.close()
    db.close()
    response = jsonify(result)
    return response, 200


#Getting one user
@app.route('/api/users/<int:userid>', methods=["GET"])
def getUser(userid):
    db = openDatabase()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM user WHERE id=%s', [userid])
    result = [{"id": id, "name": name, "username": username, "password_salt": password_salt, "password_hash": password_hash, "email": email} for (id, name, username, password_salt, password_hash, email) in cursor]
    cursor.close()
    db.close()
    response = jsonify(result)
    return response, 200


#Route for registering
@app.route('/api/register', methods=["POST"])
def registerUser():
    db = openDatabase()
    cursor = db.cursor()
    form = request.form
    name = form.get('name')
    username = form.get('username')
    password = form.get('password')
    email = form.get('email')

    if validate_user_input(email=email, password=password):
        password_salt = bcrypt.gensalt()
        password_hash = generate_hash(password.encode('utf-8'), password_salt)
        cursor.execute('INSERT INTO user (name, username, password_salt, password_hash, email) VALUES (%s, %s, %s, %s, %s)', (name, username, password_salt, password_hash, email))
        db.commit()
        cursor.close()
        db.close()
        return "", 204
    else:
        return jsonify({"msg": "Registration failed."}), 400


#Route for logging in
@app.route('/api/login', methods=["POST"])
def loginUser():
    form = request.form
    email = form.get('email')
    password = form.get('password')
    token = validate_user(email, password)

    if token:
        return jsonify({"jwt_token": token}), 200
    else:
        return jsonify({"msg": "Authentication failed"}), 401


#Editing a user
@app.route('/api/user/<int:userid>/update', methods=["PUT"])
def editUser(userid):
    db = openDatabase()
    cursor = db.cursor()
    form = request.form
    name = form.get('name')
    username = form.get('username')
    password = form.get('password')
    email = form.get('email')
    password_salt = generate_salt()
    password_hash = generate_hash(password, password_salt)
    cursor.execute('UPDATE user SET name=%s, username=%s, password_salt=%s, password_hash=%s, email=%s WHERE id=%s', (name, username, password_salt, password_hash, email, userid))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({"msg": "User updated."}), 200


#Deleting a user
@app.route('/api/user/<int:userid>/delete', methods=["DELETE"])
def deleteUser(userid):
    db = openDatabase()
    cursor = db.cursor()
    cursor.execute('DELETE FROM user WHERE id=%s', [userid])
    db.commit()
    cursor.close()
    db.close()
    return "", 204


#Getting all products
@app.route('/api/products', methods=["GET"])
def getProducts():
    db = openDatabase()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM product')
    result = [{"id": id, "brand": brand, "name": name, "price": price, "color": color, "operatingsystem": operatingsystem, "storage": storage, "short_desc": short_desc, "long_desc": long_desc, "image": image} for (id, brand, name, price, color, operatingsystem, storage, short_desc, long_desc, image) in cursor]
    cursor.close()
    db.close()
    response = jsonify(result)
    return response, 200


#Getting one product
@app.route('/api/product/<int:productid>', methods=["GET"])
def getProduct(productid):
    db = openDatabase()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM product WHERE id=%s', [productid])
    result = [{"id": id, "brand": brand, "name": name, "price": price, "color": color, "operatingsystem": operatingsystem, "storage": storage, "short_desc": short_desc, "long_desc": long_desc, "image": image} for (id, brand, name, price, color, operatingsystem, storage, short_desc, long_desc, image) in cursor]
    cursor.close()
    db.close()
    response = jsonify((result[0]))
    return response, 200


#Getting distinct values from products
@app.route('/api/product/distinctvalues', methods=["GET"])
def getValues():
    db = openDatabase()
    cursor = db.cursor()
    #Getting the distinct values for some columns of values
    cursor.execute('SELECT DISTINCT brand, color, storage FROM product')
    results = [{"brand": brand, "color": color, "storage": storage} for (brand, color, storage) in cursor]
    response = []
    
    brands = ["brand"]
    prices = ["price"]
    colors = ["color"]
    storages = ["storage"]
    specific_brands = []
    specific_colors = []
    specific_storages = []
    specific_prices = []
    
    for result in results:
        if result["brand"] not in specific_brands:
            specific_brands.append(result["brand"])
        if result["color"] not in specific_colors:
            specific_colors.append(result["color"])
        if result["storage"] not in specific_storages:
            specific_storages.append(result["storage"])

    specific_storages.sort()
    brands.append(specific_brands)
    colors.append(specific_colors)
    storages.append(specific_storages)

    response.append(brands)
    response.append(colors)
    response.append(storages)

    #Getting minimum and maximum price for the filter in the frontend
    cursor.execute('SELECT MIN(price) FROM product')
    results = cursor.fetchone()
    specific_prices.append(results[0])
    cursor.execute('SELECT MAX(price) FROM product')
    results = cursor.fetchone()
    specific_prices.append(results[0])
    prices.append(specific_prices)

    response.append(prices)

    cursor.close()
    db.close()
    return jsonify(response), 200


#Adding a product
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
        file = open("./static/images/default-product-pic.png", "rb");
        image = base64.b64encode(file.read())
        cursor.execute("INSERT INTO product (brand, name, price, color, operatingsystem, storage, short_desc, long_desc, image) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)", (brand, name, price, color, operatingsystem, storage, short_desc, long_desc, image))
        db.commit()
        cursor.close()
        db.close()
        file.close()
        return jsonify({"msg": "Successfully added product named {}, no picture added, default picture will be chosen.".format(name)}), 201
    file = request.files['image']
    if file and validFile(file.filename): 
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
        filepath = f"static/images/{file.filename}"
        file = open(filepath, "rb")
        image = base64.b64encode(file.read())
        cursor.execute("INSERT INTO product (brand, name, price, color, operatingsystem, storage, short_desc, long_desc, image) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)", (brand, name, price, color, operatingsystem, storage, short_desc, long_desc, image))
        db.commit()
        cursor.close()
        db.close()
        file.close()
        return jsonify({"msg": "Successfully added product named {}, product picture included.".format(name)}), 201
    return jsonify({"msg": "Could not add the product, the image chosen had the wrong extension."}), 400


#Editing a product
@app.route('/api/product/update/<int:productid>', methods=["POST"])
def editProduct(productid):
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
        cursor.execute("UPDATE product SET brand=%s, name=%s, price=%s, color=%s, operatingsystem=%s, storage=%s, short_desc=%s, long_desc=%s WHERE id=%s", (brand, name, price, color, operatingsystem, storage, short_desc, long_desc, productid))
        db.commit()
        cursor.close()
        db.close()
        return jsonify({"msg": "Product updated."}), 201
    file = request.files['image']
    if file and validFile(file.filename):
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
        filepath = f"static/images/{file.filename}"
        file = open(filepath, "rb")
        image = base64.b64encode(file.read())
        cursor.execute("UPDATE product SET brand=%s, name=%s, price=%s, color=%s, operatingsystem=%s, storage=%s, short_desc=%s, long_desc=%s, image=%s WHERE id=%s", (brand, name, price, color, operatingsystem, storage, short_desc, long_desc, image, productid))
        db.commit()
        cursor.close()
        db.close()
        return jsonify({"msg": "Product updated."}), 201
    return jsonify({"msg": "Could not update the product, invalid image extension."}), 400


#Deleting a product, had to make it POST couldnt use DELETE with flask
@app.route('/api/product/delete/<int:productid>', methods=["POST"])
def deleteProduct(productid):
    db = openDatabase()
    cursor = db.cursor()
    cursor.execute('DELETE FROM product WHERE id=%s', [productid])
    db.commit()
    cursor.close()
    db.close()
    return "", 204

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
    #Below is for SSL/TLS
    #Need to add "pyopenssl" to requirements.txt for it to work
    #This will change the url for localhost from http to https
    #, ssl_context='adhoc')

from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from prometheus_flask_exporter import PrometheusMetrics
import requests
import mysql.connector
import os
import base64
from werkzeug.utils import secure_filename
import bcrypt
import jwt
import time
import warnings
import re

#Removing errors that appear through unverified HTTPS requests
warnings.filterwarnings('ignore', message='Unverified HTTPS request')


app = Flask(__name__)


#Adding prometheus scraping of the flask API
PrometheusMetrics(app)


#To eliminate CORS errors when doing post and get requests from localhost
CORS(app)
#For headers on responses
app.config['SECRET_KEY'] = "AWdad12e+1daw::d1__123123dadaodo"


#The upload settings - making only .png files valid.
UPLOAD_FOLDER = "static/images"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
extensions = set(['png'])

def validFile(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in extensions


#Function for opening the database
def openDatabase():
    return mysql.connector.connect(user='root', host='db', port='3306', password='root', database='Portfolio2Webshop')


#For JWT Authentication
JWT_SECRET_KEY = "Aowidha9owd0192j1pond09h0h9AAD_A_DAwpdoa0w9j1"

def generate_hash(password, password_salt):
    passwordhash = bcrypt.hashpw(password, password_salt)
    return passwordhash


#For email validation
regex = '^(\w|\.|\_|\-)+[@](\w|\_|\-|\.)+[.]\w{2,3}$'
def validate_email(email):
    if re.search(regex, email):
        return True
    else:
        return False


#Creating a basic front for the API
@app.route('/')
def index():
    return '<div style="text-align: center; margin-top: 200px; font-size: 30px;">This is the webshop API.<br/><br/>Go to <a href="https://localhost:5000/api/users">Users</a> to see all users.<br/>Go to <a href="https://localhost:5000/api/products">Products</a> to see all products.</div>'


#To remove the favicon 404 response
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')


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
    if len(result) < 1:
        return {"msg": "Could not get user"}, 404
    else:
        response = jsonify(result[0])
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
    cursor.execute('SELECT * FROM user WHERE email=%s', [email])
    result = cursor.fetchone()

    #If the user exists
    if result is None:
        #If the email is valid
        if validate_email(email):
            password_salt = bcrypt.gensalt()
            password_hash = generate_hash(password.encode('utf-8'), password_salt)
            cursor.execute('INSERT INTO user (name, username, password_salt, password_hash, email) VALUES (%s, %s, %s, %s, %s)', (name, username, password_salt, password_hash, email))
            db.commit()
            cursor.close()
            db.close()
            return jsonify({"msg": "User created with email {} and username {}".format(email, username)}), 201
        else:
            return jsonify({"msg": "Invalid email address!"}), 400
    else:
        return jsonify({"msg": "There already is a user with that email address."}), 400


#Route for logging in
@app.route('/api/login', methods=["POST"])
def loginUser():
    db = openDatabase()
    cursor = db.cursor()
    
    form = request.form
    email = form.get('email')
    password = form.get('password')

    cursor.execute('SELECT * FROM user WHERE email=%s', [email])
    user = [{"id": id, "name": name, "username": username, "password_salt": password_salt, "password_hash": password_hash, "email": email} for (id, name, username, password_salt, password_hash, email) in cursor]
    
    #If the user doesnt exist
    if len(user) < 1:
        return jsonify({"msg": "No account registered with that email"}), 400
    else:
        if len(user) == 1:
            user_password_hash = user[0]["password_hash"]

            if bcrypt.checkpw(password.encode('utf-8'), user_password_hash.encode('utf-8')):
                userid = user[0]["id"]
                jwtencoded = jwt.encode({"id": userid}, JWT_SECRET_KEY, algorithm="HS256")
                token = str(jwtencoded).split(".")[1]
                db.close()
                cursor.close()
                return jsonify({"id": user[0]["id"], "name": user[0]["name"], "username": user[0]["username"], "email": user[0]["email"], "jwt_token": token}), 200
            else:
                return jsonify({"msg": "Incorrect password"}), 401


#Getting all products
@app.route('/api/products', methods=["GET"])
def getProducts():
    db = openDatabase()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM product WHERE deleted=0')
    result = [{"id": id, "brand": brand, "name": name, "price": price, "color": color, "operatingsystem": operatingsystem, "storage": storage, "short_desc": short_desc, "long_desc": long_desc, "image": image, "deleted": deleted} for (id, brand, name, price, color, operatingsystem, storage, short_desc, long_desc, image, deleted) in cursor]
    cursor.close()
    db.close()
    response = jsonify(result)
    return response, 200


#Getting all products that are deleted (they are still stored, so that they can be used in the future, if needed!)
@app.route('/api/deletedproducts', methods=["GET"])
def getDeletedProducts():
    db = openDatabase()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM product WHERE deleted=1')
    result = [{"id": id, "brand": brand, "name": name, "price": price, "color": color, "operatingsystem": operatingsystem, "storage": storage, "short_desc": short_desc, "long_desc": long_desc, "image": image, "deleted": deleted} for (id, brand, name, price, color, operatingsystem, storage, short_desc, long_desc, image, deleted) in cursor]
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
    result = [{"id": id, "brand": brand, "name": name, "price": price, "color": color, "operatingsystem": operatingsystem, "storage": storage, "short_desc": short_desc, "long_desc": long_desc, "image": image, "deleted": deleted} for (id, brand, name, price, color, operatingsystem, storage, short_desc, long_desc, image, deleted) in cursor]
    cursor.close()
    db.close()

    if len(result) < 1:
        return jsonify({"msg": "Could not find product"}), 404
    else:
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
    if request.files.get('image') is None:
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
    else:
        return jsonify({"msg": "Could not add the product, the image chosen had the wrong extension."}), 400


#Editing a product
@app.route('/api/product/update/<int:productid>', methods=["POST"])
def editProduct(productid):
    db = openDatabase()
    cursor = db.cursor()

    #Getting the current values in case the admin doesnt want to update some values
    response = requests.get("https://localhost:5000/api/product/{}".format(productid), verify=False)
    response = response.json()

    form = request.form

    #If the brand needs to be updated
    if form.get('brand'):
        brand = form.get('brand')
    else:
        brand = response["brand"]

    #If the name needs to be updated
    if form.get('name'):
        name = form.get('name')
    else:
        name = response["name"]

    #If the price needs to be updated
    if form.get('price'):
        price = form.get('price')
    else:
        price = response["price"]

    #If the color needs to be updated
    if form.get('color'):
        color = form.get('color')
    else:
        color = response["color"]

    #If the operatingsystem needs to be updated
    if form.get('operatingsystem'):
        operatingsystem = form.get('operatingsystem')
    else:
        operatingsystem = response["operatingsystem"]

    #If the storage needs to be updated
    if form.get('storage'):
        storage = form.get('storage')
    else:
        storage = response["storage"]

    short_desc = "This is the new " + name + " from " + brand + "."
    long_desc = "The " + name + " from " + brand + ", which costs " + str(price) + "kr, is in the lovely color of " + color + ". It runs on " + operatingsystem + " and has " + str(storage) + "GB of storage."
    if request.files.get('image') is None:
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
    cursor.execute('UPDATE product SET deleted=1 WHERE id=%s', [productid])
    db.commit()
    cursor.close()
    db.close()
    return "", 204


@app.route('/api/deletedproducts/add/<int:productid>', methods=["POST"])
def addDeletedProduct(productid):
    db = openDatabase()
    cursor = db.cursor()
    cursor.execute('UPDATE product SET deleted=0 WHERE id=%s', [productid])
    db.commit()
    cursor.close()
    db.close()
    return jsonify({"msg": "Product successfully added to the database again!"}), 201


#Adding an orderdetail for an order
@app.route('/api/orderdetail/add', methods=["POST"])
def addOrderDetails():
    db = openDatabase()
    cursor = db.cursor()
    form = request.form
    if form:
        orderid = form.get('orderID')
        productid = form.get('productID')
        quantity = form.get('quantity')
        cursor.execute("INSERT INTO OrderDetails (orderID, productID, quantity) VALUES (%s, %s, %s)", (orderid, productid, quantity))
        db.commit()
        cursor.close()
        db.close()
        return jsonify({"msg": "Orderdetails placed for orderid={}.".format(orderid)}), 201
    else:
        return jsonify({"msg": "You tried adding orderdetails with no form-data added."}), 404


#Adding an order for a user
@app.route('/api/user/<int:userid>/order', methods=["POST"])
def addOrder(userid):
    db = openDatabase()
    cursor = db.cursor()
    form = request.form
    if form:
        recipient = form.get('recipient')
        address = form.get('address')
        phone = form.get('phone')
        now = time.strftime('%Y-%m-%d %H:%M:%S')
        cursor.execute('INSERT INTO UserOrder (userID, orderDate, address, recipient, phone) VALUES (%s, %s, %s, %s, %s)', (userid, now, address, recipient, phone))
        id = cursor.lastrowid
        db.commit()
        cursor.close()
        db.close()
        return jsonify({"orderID": id}), 201
    else:
        return jsonify({"msg": "You tried adding an order with no form-data added."}), 404


#Route to get all orderids for a user
@app.route('/api/user/<int:userid>/orderids', methods=["GET"])
def getAllOrders(userid):
    db = openDatabase()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM UserOrder WHERE userID=%s', [userid])
    result = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(result), 200


#Getting a users orders
@app.route('/api/user/<int:userid>/orders', methods=["GET"])
def getOrders(userid):
    db = openDatabase()
    cursor = db.cursor()
    response = requests.get("https://localhost:5000/api/user/{}/orderids".format(userid), verify=False)
    response = response.json()
    #If the user has order(s)
    if len(response):
        sql_query = "SELECT OD.orderID, OD.productID, OD.quantity, UD.address, UD.recipient, UD.phone FROM OrderDetails as OD INNER JOIN UserOrder as UD on OD.orderID=UD.id WHERE UD.userID=%s"
        cursor.execute(sql_query, [userid])
        specific_order = []
        result = [{"orderID": orderID, "productID": productID, "quantity": quantity, "address": address, "recipient": recipient, "phone": phone} for (orderID, productID, quantity, address, recipient, phone) in cursor]
        sorted_result = sorted(result, key=lambda result: result["orderID"])
        previous_id = sorted_result[0]["orderID"]
        previous_address = sorted_result[0]["address"]
        previous_phonenr = sorted_result[0]["phone"]
        previous_recipient = sorted_result[0]["recipient"]
        product = requests.get("https://localhost:5000/api/product/{}".format(sorted_result[0]["productID"]), verify=False)
        product = product.json()
        product["quantity"] = sorted_result[0]["quantity"]
        prod_list = []
        prod_list.append(product)
        del product["image"]
        specific_order.append({"orderID": previous_id, "address": previous_address, "recipient": previous_recipient, "phone": previous_phonenr, "products": prod_list})
        amount = 0
        first = True

        for result in sorted_result:
            #If its a new orderID
            if result["orderID"] is not specific_order[amount]["orderID"]:
                amount += 1
                product = requests.get("https://localhost:5000/api/product/{}".format(result["productID"]), verify=False)
                product = product.json()
                del product["image"]
                product["quantity"] = result["quantity"]
                specific_order.append({"orderID": result["orderID"], "address": result["address"], "recipient": result["recipient"], "phone": result["phone"], "products": [product]})
            #If its not a new orderID - add the product to the exisiting orderIDs product-list
            else:
                #If its the first element in the list
                if first:
                    first = False
                    pass
                else:
                    product = requests.get("https://localhost:5000/api/product/{}".format(result["productID"]), verify=False)
                    product = product.json()
                    del product["image"]
                    product["quantity"] = result["quantity"]
                    prod_list_copy = []
                    for product2 in specific_order[amount]["products"]:
                        prod_list_copy.append(product2)
                    prod_list_copy.append(product)
                    specific_order[amount]["products"] = prod_list_copy
        cursor.close()
        db.close()
        return jsonify(specific_order), 200
    else:
        return jsonify([]), 404


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, ssl_context=('./static/TLS/webshop.crt', './static/TLS/webshop.key'))

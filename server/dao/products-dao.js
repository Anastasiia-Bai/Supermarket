const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
let connection = require("./connection-wrapper");

async function getAllProducts() {
    const sql = `SELECT * FROM products`;
    try{
        return await connection.execute(sql);
    }catch(e){
        throw new ServerError(ErrorType.GENERAL_ERROR, e);
    }
}

async function getAllCategories() {
    let sql = "SELECT categoryId, categoryName FROM categories";
    try{
        let allCategories = await connection.execute(sql);
        return allCategories;
    } catch(e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, e);
    }
}

async function getProductsByCategory(categoryId) {
    let sql = `SELECT * FROM products WHERE categoryId=?`;
    let parameters = [categoryId];
    try {
        let productsByCategory = await connection.executeWithParameters(sql, parameters);
        return productsByCategory;
    }catch(e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, e);
    }
}

async function getAmountOfProducts() {
    let sql = "SELECT COUNT(productId) AS amountOfProducts FROM products";
    try{
        let amountOfProducts = await connection.execute(sql);
        return amountOfProducts[0];
    } catch(e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, e);
    }
}

async function getAmountOfOrders() {
    let sql = "SELECT COUNT(orderId) AS amountOfOrders FROM orders";
    try{
        let amountOfOrders = await connection.execute(sql);
        return amountOfOrders[0];
    } catch(e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, e);
    }
}

async function addProduct(productData) {
    let sql = `INSERT INTO products (productName, categoryId, price, image) VALUES (?, ?, ?, ?)`;
    let parameters = [productData.productName, productData.categoryId, productData.price, productData.image];
    try {
        await connection.executeWithParameters(sql, parameters);
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(productData), e);
    }
}

async function addCart(userId) {
    let sql = `INSERT INTO carts_of_users (userId) VALUES (?)`;
    let parameters = [userId];
    try {
        await connection.executeWithParameters(sql, parameters);
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userId), e);
    }
}

async function addProductsToCart(productsData) {
    let sql = `INSERT INTO products_of_cart (productId, amount, generalPrice, cartId) VALUES (?,?,?,?)`;
    let parameters = [productsData.productId, productsData.amount, productsData.generalPrice, productsData.cartId];
    try {
        await connection.executeWithParameters(sql, parameters);
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(productsData), e);
    }
}

async function addOrder(orderData) {
    let sql = `INSERT INTO orders (userId, cartId, finalPrice, sendCity, sendStreet, sendDate , payEnd) VALUES (?,?,?,?,?,?,?)`;
    let parameters = [orderData.userId, orderData.cartId, orderData.finalPrice, orderData.sendCity, orderData.sendStreet, orderData.sendDate, orderData.payEnd];
    try {
        await connection.executeWithParameters(sql, parameters);
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(orderData), e);
    }
}

async function deleteCartProduct(cartId, productId) {
    let sql = `DELETE from products_of_cart WHERE cartId =${cartId} AND productId =${productId}`;
    try {
        await connection.execute(sql);
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(cartId, productId), e);
    }
}

async function updateProduct(updatedProductsData, productId) {
    let sql = `UPDATE products SET productName=?, price=?, categoryId=? WHERE productId= ${productId}`;
    let parameters = [
        updatedProductsData.productName,
        updatedProductsData.price,
        updatedProductsData.categoryId
    ];
    try{
        await connection.executeWithParameters(sql, parameters);
    } catch(e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(updatedProductsData), e);
    }
}

async function getTotalPrice(cartId, productId) {
    let sql = `SELECT 
    products_of_cart.amount * products.price as total
    FROM products_of_cart
    INNER JOIN products on products.productId = products_of_cart.productId
    INNER JOIN carts_of_users on carts_of_users.cartId = products_of_cart.cartId
    WHERE carts_of_users.cartId=${cartId} AND products.productId=${productId}`;
    try {
        let totalPrice = await connection.execute(sql);
        return totalPrice;
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(cartId, productId), e);
    }
}

async function getSearchingProduct(searchValue) {
    let sql = `SELECT * FROM products WHERE productName LIKE ${searchValue}`;
    try {
        let searchProduct = await connection.execute(sql);
        return searchProduct;
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(searchValue), e);
    }
}

async function getCartByCartId(cartId) {
    let sql = `SELECT
    carts_of_users.cartId,
    products.productName,
    products.price, 
    products_of_cart.amount,
    products.image,
    products.productId
    FROM products_of_cart
    INNER JOIN products ON products_of_cart.productId = products.productId
    INNER JOIN carts_of_users ON products_of_cart.cartId = carts_of_users.cartId
    WHERE carts_of_users.cartId = ${cartId}`;
    try {
        let cart = await connection.execute(sql);
        return cart;
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(cartId), e);
    }
}

async function getCartIdByUserId(userId) {
    let sql = `SELECT cartId as cartId FROM carts_of_users where userId =${userId}`;
    try {
        let cartId = await connection.execute(sql);
        return cartId[0];
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userId), e);
    }
}

async function getCartDate(userId) {
    let sql = `SELECT DATE_FORMAT(cartDate, "%d-%m-%y") as cartDate FROM carts_of_users WHERE userId=${userId}`;
    try {
        let cartDate = await connection.execute(sql);
        return cartDate[0];
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userId), e);
    }
}

async function getLastOrderDate(userId) {
    let sql = `SELECT DATE_FORMAT(orderDate, "%d-%m-%y") as orderDate FROM orders WHERE userId=${userId} order by orderDate desc`;
    try {
        let lastOrderDate = await connection.execute(sql);
        return lastOrderDate[0];
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userId), e);
    }
}

async function updateCartProduct(cartId, productId, amount) {
    let sql = `UPDATE products_of_cart SET amount=? WHERE productId=${productId} and cartId= ${cartId}`;
    let parameters = [amount];
    try {
        let updatedCartProduct = await connection.executeWithParameters(sql, parameters);
        return updatedCartProduct;
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(parameters), e);
    }
}

async function deleteAllProducts(cartId) {
    let sql = `DELETE from products_of_cart WHERE cartId =${cartId}`
    try {
        let deleteAllProducts = await connection.execute(sql);
        return deleteAllProducts;
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(cartId), e);
    }
}

module.exports = {
    addProduct,
    getAllCategories,
    getProductsByCategory,
    getAllProducts,
    getAmountOfProducts,
    addCart,
    addProductsToCart,
    addOrder,
    deleteCartProduct,
    updateProduct,
    getAmountOfOrders,
    getTotalPrice,
    getSearchingProduct,
    getCartByCartId,
    getCartIdByUserId,
    getCartDate,
    getLastOrderDate,
    updateCartProduct,
    deleteAllProducts
};
const productsDao = require("../dao/products-dao");

async function getAllProducts() {
    return await productsDao.getAllProducts();
}

async function getAllCategories() {
    let allcategories = await productsDao.getAllCategories();
    return allcategories;
}

async function getProductsByCategory(categoryId) {
    let productsByCategory = await productsDao.getProductsByCategory(categoryId);
    return productsByCategory;
}

async function getAmountOfProducts() {
    return await productsDao.getAmountOfProducts();
}

async function getAmountOfOrders() {
    return await productsDao.getAmountOfOrders();
}

async function addProduct(productData) {
    await productsDao.addProduct(productData);
}

async function addCart(userId) {
    await productsDao.addCart(userId);
}

async function addProductsToCart(productsData) {
    await productsDao.addProductsToCart(productsData);
}

async function addOrder(orderData) {
    await productsDao.addOrder(orderData);
}

async function deleteCartProduct(cartId, productId) {
    await productsDao.deleteCartProduct(cartId, productId);
}

async function updateProduct(updatedProductsData, productId) {
    await productsDao.updateProduct(updatedProductsData, productId);
}

async function getTotalPrice(cartId, productId) {
    return await productsDao.getTotalPrice(cartId, productId);
}

async function getSearchingProduct(searchValue) {
    return await productsDao.getSearchingProduct(searchValue);
}

async function getCartByCartId(cartId) {
    return await productsDao.getCartByCartId(cartId);
}

async function getCartIdByUserId(userId) {
    return await productsDao.getCartIdByUserId(userId);
}

async function getCartDate(userId) {
    return await productsDao.getCartDate(userId);
}

async function getLastOrderDate(userId) {
    return await productsDao.getLastOrderDate(userId);
}

async function updateCartProduct(cartId, productId, amount) {
    return await productsDao.updateCartProduct(cartId, productId, amount);
}

async function deleteAllProducts(cartId) {
    return await productsDao.deleteAllProducts(cartId);
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
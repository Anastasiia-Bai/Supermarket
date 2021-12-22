const express = require("express");
const router = express.Router();
const productsLogic = require("../logic/products-logic");
const cacheModule = require("../dao/cache-module");

router.get("/", async (request, response, next) => {
    try {
      let products = await productsLogic.getAllProducts();
      response.json(products);
    } catch (error) {
      return next(error);
    }
});

router.get("/categories", async (request, response, next) => {
    try {
        let categories = await productsLogic.getAllCategories();
        response.json(categories);
    } catch(e) {
        return next(e);
    }
});

router.get("/bycategory/:id", async (request, response, next) => {
    try{
        let categoryId = request.params.id;
        let products = await productsLogic.getProductsByCategory(categoryId);
        response.json(products);
    } catch(e) {
        return next(e);
    }
});

router.get("/amountOfProducts", async (request, response, next) => {
    try {
        let amountOfProducts = await productsLogic.getAmountOfProducts();
        response.json(amountOfProducts);
    } catch(e) {
        return next(e);
    }
});

router.get("/amountOfOrders", async (request, response, next) => {
    try {
        let amountOfOrders = await productsLogic.getAmountOfOrders();
        response.json(amountOfOrders);
    } catch(e) {
        return next(e);
    }
});

router.post("/", async (request, response, next) => {
    let productData = request.body;
    try{
        await productsLogic.addProduct(productData);
        response.json();
    } catch(e) {
        return next(e);
    }
});

router.post("/newcart", async (request, response, next) => {
    let userData = await cacheModule.extractUserDataFromCache(request);
    let userId = userData.userId;
    try {
        await productsLogic.addCart(userId);
        response.json();
    } catch (e) {
        return next(e);
    }
});

router.post("/addCartItem", async  (request, response, next) => {
    let productsData = request.body;
    try {
        await productsLogic.addProductsToCart(productsData);
        response.json();
    } catch (e) {
        return next(e);
    }
});

router.post("/neworder", async (request, response, next) => {
    let orderData = request.body;
    try {
        await productsLogic.addOrder(orderData);
        response.json();
    } catch (e) {
        return next(e);
    }
});

router.delete("/deleteCartProduct/:cartId/:productId", async (request, response, next) => {
    let cartId = request.params.cartId;
    let productId = request.params.productId;
    try {
        await productsLogic.deleteCartProduct(cartId, productId);
        response.json();
    } catch (e) {
        return next(e);
    }
});

router.put("/updateCartProduct", async (request, response, next) => {
    let cartId = request.body.cartId;
    let productId = request.body.productId;
    let amount = request.body.amount;
    try {
        await productsLogic.updateCartProduct(cartId, productId, amount);
        response.json();
    } catch (e) {
        return next(e);
    }
});

router.put("/:productId", async (request, response, next) => {
    try{
        let product = request.body;
        let productId = request.params.productId;
        await productsLogic.updateProduct(product, productId);
        response.json();
    } catch(e) {
        return next(e);
    }
});

router.get("/totalprice/:cartId/:productId", async (request, response, next) => {
    let cartId = request.params.cartId;
    let productId = request.params.productId;
    try {
        let totalPrice =  await productsLogic.getTotalPrice(cartId, productId);
        response.json(totalPrice);
    } catch (e) {
        return next(e);
    }
});

router.get("/search", async (request, response, next) => {
    let searchValue = request.body;
    try {
        await productsLogic.getSearchingProduct(searchValue);
        response.json();
    } catch (e) {
        return next(e);
    }
});

router.get("/showCart/:cartId", async (request, response, next) => {
    let cartId = request.params.cartId;
    try {
        let cart =  await productsLogic.getCartByCartId(cartId);
        response.json(cart);
    } catch (e) {
        return next(e);
    }
});

router.get("/getCartId/:userId", async (request, response, next) => {
    let userId = request.params.userId;
    try {
        let cartId =  await productsLogic.getCartIdByUserId(userId);
        response.json(cartId);
    } catch (e) {
        return next(e);
    }
});

router.get("/cartdate/:userId", async (request, response, next) => {
    let userId = request.params.userId;
    try {
        let cartDate =  await productsLogic.getCartDate(userId);
        response.json(cartDate);
    } catch (e) {
        return next(e);
    }
});

router.get("/lastOrderDate/:userId", async (request, response, next) => {
    let userId = request.params.userId;
    try {
        let lastOrderDate =  await productsLogic.getLastOrderDate(userId);
        response.json(lastOrderDate);
    } catch (e) {
        return next(e);
    }
});

router.delete("/deleteAllProducts/:cartId", async (request, response, next) => {
    let cartId = request.params.cartId;
    try {
        let deleteAllProducts =  await productsLogic.deleteAllProducts(cartId);
        response.json(deleteAllProducts);
    } catch (e) {
        return next(e);
    }
});

module.exports = router;
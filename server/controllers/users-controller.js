const express = require("express");
const router = express.Router();
const usersLogic = require("../logic/users-logic");

router.post("/", async (request, response, next) => {
    let registrationData = request.body;
    try{
        await usersLogic.addUser(registrationData);
        response.json();
    } catch(e) {
        return next(e);
    }
});

router.post("/login", async (request, response, next) => {
    let user = request.body;
    try {
        let successfullLoginData = await usersLogic.login(user);
        response.json(successfullLoginData);
    } catch(e) {
        return next(e);
    }
});

router.get("/hascart/:userId", async (request, response, next) => {
    let userId = request.params.userId;
    try {
        let amountOfCarts = await usersLogic.getAmountOfCarts(userId);
        response.json(amountOfCarts);
    } catch(e) {
        return next(e);
    }
});

router.get("/hadorders/:userId", async (request, response, next) => {
    let userId = request.params.userId;
    try {
        let amountOfOrders = await usersLogic.getAmountOfOrders(userId);
        response.json(amountOfOrders);
    } catch(e) {
        return next(e);
    }
});

router.get("/getcity/:userId", async (request, response, next) => {
    let userId = request.params.userId;
    try {
        let city = await usersLogic.getUserCity(userId);
        response.json(city);
    } catch(e) {
        return next(e);
    }
});

router.get("/getstreet/:userId", async (request, response, next) => {
    let userId = request.params.userId;
    try {
        let street = await usersLogic.getUserStreet(userId);
        response.json(street);
    } catch(e) {
        return next(e);
    }
});

module.exports = router;
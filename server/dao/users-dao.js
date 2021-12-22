let connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");

async function addUser(registrationData) {
    let sql = `INSERT INTO users (userId, firstName, lastName, email, password, city, street)  VALUES(?, ?, ?, ?, ?, ?, ?)`;
    let parameters = [registrationData.userId, registrationData.firstName, registrationData.lastName, registrationData.email, registrationData.password, registrationData.city, registrationData.street];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(registrationData), e);
    }
}

async function isUserExistByEmail(registrationData) {
    let sql = "SELECT email FROM users WHERE email=?";
    let parameters = [registrationData.email];
    try{
        let usersEmail = await connection.executeWithParameters(sql, parameters);

        if(usersEmail == null || usersEmail.length == 0) {
            return false;
        }
        return true;
    } catch(e) {
        throw new ServerError(ErrorType.USER_EMAIL_ALREADY_EXIST, JSON.stringify(registrationData), e);
    }
}

async function login(user) {
    let sql = "SELECT * FROM users where email =? and password =?";
    let parameters = [user.email, user.password];
    let usersLoginResult;

    try {
        usersLoginResult = await connection.executeWithParameters(sql, parameters);
        return usersLoginResult[0];
    }
    catch (e) {
            throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), e);
    }
}

async function getAmountOfCarts(userId) {
    let sql = `SELECT COUNT(cartId) as amountOfCarts FROM carts_of_users WHERE userId =${userId}`;
    try{
        let amountOfCarts = await connection.execute(sql);
        return amountOfCarts[0];
    } catch(e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, e);
    }
}

async function getAmountOfOrders(userId) {
    let sql = `SELECT COUNT(orderId) as amountOfOrders FROM orders WHERE userId =${userId}`;
    try{
        let amountOfOrders = await connection.execute(sql);
        return amountOfOrders[0];
    } catch(e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, e);
    }
}

async function getUserCity(userId) {
    let sql = `SELECT city from users WHERE userId= ${userId}`;
    try{
        let city = await connection.execute(sql);
        return city;
    } catch(e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, e);
    }
}

async function getUserStreet(userId) {
    let sql = `SELECT street from users WHERE userId= ${userId}`;
    try{
        let street = await connection.execute(sql);
        return street;
    } catch(e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, e);
    }
}

module.exports = {
    addUser,
    login,
    isUserExistByEmail,
    getAmountOfCarts,
    getAmountOfOrders,
    getUserCity,
    getUserStreet,
};
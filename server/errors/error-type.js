let ErrorType = {
    
    GENERAL_ERROR : {id: 1, httpCode: 600, message : "A big fuck up which we'll never tell you of had just happend. And now : A big fat lie....'A general error ....'", isShowStackTrace: true},
    USER_EMAIL_ALREADY_EXIST : {id: 2, httpCode: 601, message : "Email already exist", isShowStackTrace: false},
    INVALID_PASSWORD : {id: 3, httpCode: 602, message : "Invalid password", isShowStackTrace: false},
    INVALID_EMAIL : {id: 4, httpCode: 603, message : "Invalid email", isShowStackTrace: false},
    UNAUTHORIZED : {id: 5, httpCode: 401, message : "Login failed, invalid email or password", isShowStackTrace: false},
}

module.exports = ErrorType;
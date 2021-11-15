const accountService = require('../services/AccountsServices')
const accountTokenService = require('../services/AccountsTokenService')
const httpStatus = require('../constants/http-status-codes.json')
const apiResponse = require('../helpers/apiResponse')
const bcrypt = require('bcrypt');
const redis = require('../utility/redis');
// Login.
exports.login = async function (req, res) {
    try {
        var user = await accountService.findByUsername(req.body.name);
        if(user) {
            let passwordValid = await bcrypt.compare(req.body.password, user.password);
                if (passwordValid) {
                    var token = await accountTokenService.createToken(user);
                    let response = {
                        "user": user
                    }
                    response.user.token = token.token;
                    // And store the user in Redis under key 2212
                    redis().sadd(['user'+response.user.id,  response.user.token], function(err){
                        console.log(err)
                    });

                    return apiResponse.responseFormat(res, true, "Login", {'user': response.user}, "", httpStatus.SUCCESS)
                } else {
                    console.log('error')
                    return apiResponse.responseFormat(res, false, "Password do not match", "", "Invalid credentials", httpStatus.UNAUTHORIZED)
                }
        } else {
            return apiResponse.responseFormat(res, false, "User not found", "", "User not found", httpStatus.NOT_FOUND)
        }
    } catch (e) {
        console.log(e)
        return apiResponse.responseFormat(res, false, "Users not found", "", { "errors": JSON.parse(e.message) }, httpStatus.INTERNAL_SERVER_ERROR)
    }
};

// Login.
exports.logout = async function (req, res) {
    try {
        if(req.headers.authorization) {
            let token = req.headers.authorization.split(" ")[1];
            let tokenUser = await accountTokenService.getUserbyToken(token);
            if(tokenUser) {
                redis().exists('user'+tokenUser.user_id, function(err, reply) {
                    if (reply === 1) {
                        redis().srem('user'+tokenUser.user_id, token)
                    } else {
                        console.log('doesn\'t exist');
                    }
                })
                await accountTokenService.updateToken(token);
                return apiResponse.responseFormat(res, true, "Logout Success", "", "", httpStatus.SUCCESS)
            } else {
                 return apiResponse.responseFormat(res, false, "Invalid Token", "", "Invalid Token", httpStatus.NOT_FOUND)  
            }
        } else {
            return apiResponse.responseFormat(res, false, "Token not found", "", "Token not found", httpStatus.NOT_FOUND)  
        }
    } catch (e) {
        console.log(e)
        return apiResponse.responseFormat(res, false, "Users not found", "", { "errors": JSON.parse(e.message) }, httpStatus.INTERNAL_SERVER_ERROR)
    }
};
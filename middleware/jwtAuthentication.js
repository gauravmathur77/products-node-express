const jwt = require('jsonwebtoken'),
  config = require('../configuration'),
  apiResponse = require('../helpers/apiResponse'),
  httpStatus = require('../constants/http-status-codes.json'),
  apiServices = require('../services/AccountsTokenService');

// module.exports.authServer = async (role,req, res, next) => {
//   let authorizationHeader = req.headers.authorization;
//   let result;
//   if (authorizationHeader) {
//     const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
//     try {
//       // verify makes sure that the token hasn't expired and has been issued by us
//       result = jwt.verify(token, config.getConfig().jwtSecret);
//       // Let's pass back the decoded token to the request object
//       req.decoded = result;
//       let tokenUser = await apiServices.getUserbyToken(token);
//       if (tokenUser) {
//         if(tokenUser.account.accounts_role.role_id == role) {
//           next();
//         } else {
//           return apiResponse.responseFormat(res, false, "Functionality Restricted", "", "", httpStatus.FORBIDDEN)
//         }
//       } else {
//         return apiResponse.responseFormat(res, false, "Invalid Token", "", "", httpStatus.UNAUTHORIZED)
//       }
//       // We call next to pass execution to the subsequent middleware
//     } catch (err) {
//       // Throw an error just in case anything goes wrong with verification
//       console.log(err)
//       return apiResponse.responseFormat(res, false, "Invalid Token", "", "", httpStatus.UNAUTHORIZED)
//     }
//   } else {
//     return apiResponse.responseFormat(res, false, "Authentication error. Token required", "", "", httpStatus.UNAUTHORIZED)
//   }
// };

module.exports = function (...authorizedRoles) {
  return async function (req, res, next) {
    let authorizationHeader = req.headers.authorization;
    let result;
    if (authorizationHeader) {
      const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
      try {
        // verify makes sure that the token hasn't expired and has been issued by us
        result = jwt.verify(token, config.getConfig().jwtSecret);
        // Let's pass back the decoded token to the request object
        req.decoded = result;
        let tokenUser = await apiServices.getUserbyToken(token);
        if (tokenUser) {
          if (authorizedRoles.indexOf(tokenUser.account.accounts_role.role_id) > -1) {
            next();
          } else {
            return apiResponse.responseFormat(res, false, "Functionality Restricted", "", "", httpStatus.FORBIDDEN)
          }
        } else {
          return apiResponse.responseFormat(res, false, "Invalid Token", "", "", httpStatus.UNAUTHORIZED)
        }
        // We call next to pass execution to the subsequent middleware
      } catch (err) {
        // Throw an error just in case anything goes wrong with verification
        console.log(err)
        return apiResponse.responseFormat(res, false, "Invalid Token", "", "", httpStatus.UNAUTHORIZED)
      }
    } else {
      return apiResponse.responseFormat(res, false, "Authentication error. Token required", "", "", httpStatus.UNAUTHORIZED)
    }
  }
};
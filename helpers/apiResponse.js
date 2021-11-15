exports.responseFormat = function (res, successValue, messageValue, response, error = null , httpStatus) {
	var response = {
		success: successValue,
		message: messageValue,
        data: response
    };
    if(error) {
        response.error = error;
    }
	return res.status(httpStatus).json(response);
};
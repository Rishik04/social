export const successResponse = (data,message,response,statusCode=200) => {
  response.send({ status: statusCode, data, message });
};

export const errorResponse = (error,response,statusCode= 400) => {
  response.send({status: statusCode,type: error.name,message: error.message});
};

const jwt = require('jsonwebtoken');

export const sign = jwt.sign;
export const verify = jwt.verify;
export const decode = jwt.decode;
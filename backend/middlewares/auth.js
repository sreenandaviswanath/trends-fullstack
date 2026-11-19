const jwt = require("jsonwebtoken");

exports.generateToken = async (userId, userRole) => {

  const options = { userId, userRole };
  const token = await jwt.sign(options, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })

  if (!token) {
    return null;
  }
  console.log("token--->>", token);

  return token;


}

exports.userAuthenticate = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "token not found"
    });

  }
  try {
    const { userId, userRole } = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = userId;
    req.userRole = userRole;
    next();

  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    });

  }

}
exports.authorizeUser = (requiredRole) => {  //requiredRole = ["admin", "seller"]

  // console.log("Inside user authorize------>");
  

    return (req, res, next) => {

        if (!requiredRole?.includes(req.userRole)) {
            return res.status(403).json({
                success: false,
                message: "You don't have permission to access this resource"
            });
        }
        next();



    }


}
const jwt = require("jsonwebtoken");

const EnsureAuthorized = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(300).json({ message: "Unauthorized, Token is required" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(300).json({ message: "Unauthorized, Token is required..." });
  }
};

module.exports = EnsureAuthorized;

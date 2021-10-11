const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json({ success: false, error: "Token is not valid!" });
      req.user = user;
      return true;
    });
  } else {
    // return res.status(401).json("You are not authenticated!");
    return res.status(401).json({ success: false, error: "You are not authenticated!" })
  }
};

const verifyTokenAndAuthorization = (req, res, id, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === id || req.user.isAdmin) {
      return true;
    } else {
      res.status(403).json({ success: false, error: "You are not alowed to do that!" })
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
       res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
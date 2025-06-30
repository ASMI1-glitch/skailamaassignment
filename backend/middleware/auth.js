// backend/middleware/auth.js
const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access Denied! No token provided." });
  }

  // Instead of verifying, just accept the token as is (trust frontend)
  const token = authHeader.split(" ")[1];
  req.user = { token }; // dummy placeholder, you can use this in req.user if needed
  next();
};

export default auth;

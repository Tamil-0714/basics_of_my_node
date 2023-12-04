function isAlreadyLogin(req, res, next) {
  if (req.session && req.session.UserSession) {
    return next();
  } else {
    res.redirect("/login");
  }
}
function isLogin(req, res, next) {
  if (req.session && req.session.UserSession) {
    res.redirect("/home");
  } else {
    return next();
  }
}

module.exports = {
  isAlreadyLogin,
  isLogin,
};

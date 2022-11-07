class LoginError extends Error {
  constructor(msg) {
    super(msg);
  }
}

module.exports = LoginError;

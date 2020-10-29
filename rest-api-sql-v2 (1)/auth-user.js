'use strict';
const auth = require('basic-auth');
const bcypt = require('bcryptjs');
const { User } = require('./models');

// Middleware to authenticate the request using Basic Authentication.
exports.authenticateUser = async (req, res, next) => {
  let message;

  const credentials = auth(req);
  console.log(credentials);

  // if (credentials) {
  //   const user = await User.findOne({ where: {credentials.firstName} });
  //   if (user) {
  //     const authenticated = bcypt
  //       .compareSync(credntials.pass, user.confirmedPassword);
  //   }
  // }
}
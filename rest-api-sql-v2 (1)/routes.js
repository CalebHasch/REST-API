'use strict';

const express = require('express');
//const { authenticateUser } = require('./auth-user');
const { User, Course } = require('./models');

const router = express.Router();

function asyncHandler(cb) {
  return async(req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      console.log(error)
      res.status(500).send(error);
    }
  }
}

//router.use('/api');

// Route that returns the current authenticated user.
// router.get('/users', asyncHandler(async (req, res) => {
//   onst user = req.currentUser;
//   console.log('hi');
//   res.json({
//     name: user.firstName
//   });
// }));

// Route that returns list of courses
router.get('/courses', asyncHandler(async (req, res) => {
  console.log('courses');
}))